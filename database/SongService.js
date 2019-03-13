import Realm from 'realm';
import SongModel from './SongModel';

let repository = new Realm({
    schema: [{
	name: 'Song',
	primaryKey: 'id',
	properties: {
	    id: {type: 'number', indexed: true},
        track: 'string',
        artist: 'string',
	    createdAt: 'date',
	}
    }]
});

let SongService = {
  addNew: function(song) {
    
  }
};

SongService.save(new SongModel('Brick', '(Sandy) Alex G'));
SongService.save(new SongModel('Pristine', 'Snail Mail'));
SongService.save(new SongModel('Space Cowboy', 'Kacey Musgraves'));

module.exports = SongService;