import React from 'react';
import { ScrollView, StyleSheet, Text, Button } from 'react-native';

let songs = [
  {
    recID: 1,
    track: "Snot",
    artist: "(Sandy) Alex G"
  },
  {
    recID: 2,
    track: "Painting of Blue",
    artist: "Forth Wanderers"
  },
  {
    recID: 3,
    track: "Pristine",
    artist: "Snail"
  }
]

export default class MusicScreen extends React.Component {
  constructor() {
    super()

    this.state = {
      songs: songs
    }

  }

  static navigationOptions = {
    title: 'Music Recs',
  };

  render() {

    let songs = this.state.songs.map(song => {
      return <Button key={song.recID} title={song.track} onPress={() => this.props.navigation.navigate("MusicDetail", {
        otherParam: {artist: song.artist, track: song.track}
      })}/>
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