const Hapi = require('hapi')
const consola = require('consola')
const HapiNuxt = require('hapi-nuxt')
const HAPIWebSocket = require('hapi-plugin-websocket')
const inert = require('inert')
const fs = require('fs-extra')
const p = require('path')
const defaultPlaylist = './songs/default/'
const models = require('./models.js')

let songs = []
let currentSongIndex = 0

fs.readdirSync(defaultPlaylist).forEach(file => {
  if (file !== '.gitignore') {
    songs.push(file)
  }
})

const server = new Hapi.Server({
  host: process.env.HOST || '127.0.0.1',
  port: process.env.PORT || 3000
})

const init = async () => {
  await server.register([HapiNuxt, HAPIWebSocket, inert])

  const cache = server.cache({ segment: 'sessions', expiresIn: 60 * 60 * 1000 })
  const players = []

  server.app.cache = cache

  server.route({
    method: 'POST',
    path: '/api/playlist/{action}',
    config: {
      handler: ({ params }) => {
        if (isNaN(params.action)) {
          currentSongIndex =
            params.action === 'next'
              ? currentSongIndex + 1
              : currentSongIndex - 1
          currentSongIndex =
            currentSongIndex < 0 ? songs.length - 1 : currentSongIndex
          currentSongIndex =
            currentSongIndex > songs.length - 1 ? 0 : currentSongIndex
        } else {
          currentSongIndex = params.action
        }
        const next = songs[currentSongIndex]
        players.forEach(ctx => {
          if (ctx && ctx.ws) {
            ctx.ws.send(
              JSON.stringify({
                mutation: 'SET_CURRENT_SONG',
                namespace: 'songs',
                data: next
              })
            )
          }
        })
        return ''
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/api/playlist/',
    config: {
      handler: () => {
        return models.Playlist.findAll()
        // return songs.map((song, id) => ({ song, id }))
      }
    }
  })
  server.route({
    method: 'POST',
    path: '/api/playlist/',
    config: {
      handler: req => {
        const playlist = models.Playlist.build(req.payload)
        return playlist.save()
      }
    }
  })

  server.route({
    method: 'POST',
    path: '/api/refresh',
    config: {
      handler: () => {
        songs = []
        fs.readdirSync(defaultPlaylist).forEach(file => {
          if (file !== '.gitignore') {
            songs.push(file)
          }
        })
        return ''
      }
    }
  })

  server.route({
    method: 'POST',
    path: '/jukebox',
    config: {
      plugins: {
        response: { emptyStatusCode: 204 },
        payload: { output: 'data', parse: true, allow: 'application/json' },
        websocket: {
          only: true,
          initially: false,
          connect: ({ ctx, ws }) => {
            ctx.ws = ws
            ctx.to = setInterval(() => {
              ws.send(JSON.stringify({ cmd: 'keep-alive' }))
            }, 5000)
            players.push(ctx)
            const next = songs[currentSongIndex]
            ws.send(
              JSON.stringify({
                mutation: 'SET_CURRENT_SONG',
                namespace: 'songs',
                data: next
              })
            )
          },
          disconnect: ({ ctx }) => {
            if (ctx.to !== null) {
              clearTimeout(ctx.to)
              ctx.to = null
              ctx.ws = null
            }
          }
        }
      }
    },
    handler: () => {
      return ''
    }
  })

  server.route({
    method: 'GET',
    path: '/songs/{param*}',
    handler: {
      directory: {
        path: 'songs/default',
        listing: true
      }
    }
  })

  await server.start()
  consola.ready({
    message: `Server running at: ${server.info.uri}`,
    badge: true
  })
}

try {
  init()
} catch (err) {
  consola.error(err)
  throw err
}
