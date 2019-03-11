import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

let songs = [
  {
    recID: 1,
    track: "Brick",
    artist: "(Sandy) Alex G"
  },
  {
    recID: 2,
    track: "Taste",
    artist: "Forth Wanderers"
  },
  {
    recID: 3,
    track: "Pristine",
    artist: "Snail Mail"
  }
]

export default class LinksScreen extends React.Component {
  constructor() {
    super()

    this.state = {
      songs: songs
    }

  }

  static navigationOptions = {
    title: 'Links',
  };

  render() {

    let songs = this.state.songs.map(song => {
      return <Text key={song.recID}> {song.track} </Text>
    })
    return (
      <ScrollView style={styles.container}>
        {songs}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});