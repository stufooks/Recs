import {AsyncStorage} from 'react-native';

let Utils = {
    genId: function() {
        try {
            const value = await AsyncStorage.getItem('id');
            if (value !== null) {
              AsyncStorage.setItem('id', JSON.stringify(value + 1))
              return value + 1
            }
          } catch (error) {
            console.log(error)
          }
    }
}

module.exports = Utils