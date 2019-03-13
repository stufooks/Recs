import Utils from './Utils';

class SongModel {
  constructor(track, artist) {
    this.id = Utils.genId()
    this.track = track
    this.artist = artist
    this.createdAt = Date.now
  }
}

module.exports = SongModel;