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
    findAll: function(sortBy) {
        if (!sortBy) sortBy = ['createdAt', true];
        return repository.objects('Todo').sorted(sortBy);
    },
  
    save: function(song) {
      if (repository.objects('song').filtered("track = '" + song.track + "'").length) return;
  
      repository.write(() => {
        // song.updatedAt = new Date();
        repository.create('song', song);
      })
    },
  
    // update: function(song, callback) {
    //   if (!callback) return;
    //   repository.write(() => {
    //     callback();
    //     song.updatedAt = new Date();
    //   });
    // }
  };

SongService.save(new SongModel('Brick', '(Sandy) Alex G'));
SongService.save(new SongModel('Pristine', 'Snail Mail'));
SongService.save(new SongModel('Space Cowboy', 'Kacey Musgraves'));

module.exports = SongService;