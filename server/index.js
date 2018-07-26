const Hapi = require('hapi');
const HAPIWebSocket = require('hapi-plugin-websocket');
const inert = require('inert');
const fs = require('fs-extra');
const p = require('path');
const defaultPlaylist = './songs/default/'

const songs = [];
let currentSongIndex = 0;

fs.readdirSync(defaultPlaylist).forEach(file => {
  if (file !== '.gitignore') {
    songs.push(file);
  }
})

// create the server
const server = new Hapi.Server(
  {
    host: '0.0.0.0',
    port: 9010,
    routes: {
      cors: false,
      files: {
          relativeTo: p.join(__dirname, 'songs')
      }
  }
});

const init = async () => {

  await server.register([HAPIWebSocket, inert]);

  const cache = server.cache({ segment: 'sessions', expiresIn: 60 * 60 * 1000 });
  const players = [];

  server.app.cache = cache;

  server.route({
    method: 'POST',
    path: '/api/playlist/{action}',
    config: {
      handler: ({params}) => {
        currentSongIndex = params.action === 'next' ? currentSongIndex + 1 : currentSongIndex - 1;
        currentSongIndex = currentSongIndex <  0 ? songs.length - 1 : currentSongIndex;
        currentSongIndex = currentSongIndex >  songs.length - 1 ? 0 : currentSongIndex;
        const next = songs[currentSongIndex];
        players.forEach(ctx => {
          if (ctx && ctx.ws) {
            ctx.ws.send(JSON.stringify({mutation: 'SET_CURRENT_SONG', namespace: 'ws', data: next}));
          }
        });
        return '';
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/jukebox',
    config: {
      plugins: {
        response: { emptyStatusCode: 204 },
        payload: { output: "data", parse: true, allow: "application/json" },
        websocket: {
          only: true,
          initially: false,
          connect: ({ ctx, ws }) => {
            ctx.ws = ws;
            ctx.to = setInterval(() => {
              ws.send(JSON.stringify({ cmd: 'keep-alive' }));
            }, 5000);
            players.push(ctx);
            const next = songs[currentSongIndex];
            ws.send(JSON.stringify({mutation: 'SET_CURRENT_SONG', namespace: 'ws', data: next}));
          },
          disconnect: ({ ctx }) => {
            if (ctx.to !== null) {
              clearTimeout(ctx.to);
              ctx.to = null;
              ctx.ws = null;
            }
          }
        }
      }
    },
    handler: () => {
      return '';
    }
  });

  server.route({
    method: 'GET',
    path: '/songs/{param*}',
    handler: {
        directory: {
            path: 'default/',
            listing: true
        }
    }
  });

  await server.start()
  console.log('Running on 9010');
}

init();