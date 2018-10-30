const path = require('path')
const Sequelize = require('sequelize')
const Boom = require('boom')

Sequelize.Model.prototype.save = async function(...args) {
  try {
    return await this.save(...args)
  } catch (e) {
    throw Boom.badRequest()
  }
}

const sequelize = new Sequelize(null, null, null, {
  dialect: 'sqlite',
  storage: path.join('db', 'db.sqlite') // SQLite persists its data directly to file
})

const Song = sequelize.define('song', {
  title: Sequelize.STRING,
  path: Sequelize.STRING
})

const Playlist = sequelize.define('playlist', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
})

Playlist.hasMany(Song)

Song.sync()
Playlist.sync()

module.exports = {
  Song,
  Playlist,
  sequelize
}
