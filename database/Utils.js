import {AsyncStorage} from 'react-native';

let Utils = {
    genId: function() {
        try {
            const value = await AsyncStorage.getItem('id');
            if (value !== null) {
              let id = parseInt(value)
              AsyncStorage.setItem('id', JSON.stringify(id + 1))
              return id + 1
            }
          } catch (error) {
            console.log(error)
          }
    }
}

module.exports = Utils