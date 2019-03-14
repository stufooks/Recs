import React from 'react';
import { Image } from 'react-native';


export default class LibraryIcon extends React.Component {
  render() {
    return (
      <Image
        source={require('../assets/images/library-icon.png')}
        style={{width: 20, height: 20}}
      />
    );
  }
}