import React from 'react';
import { Image } from 'react-native';


export default class AddIcon extends React.Component {
  render() {
    return (
      <Image
        source={require('../assets/images/add-icon.png')}
        style={{width: 20, height: 20}}
      />
    );
  }
}