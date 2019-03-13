import React from 'react';
import { ScrollView, StyleSheet, Text, Button } from 'react-native';
import axios from 'axios'

export default class MusicScreen extends React.Component {
  constructor() {
    super()

    this.state = {
      songs: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/')
      .then(res => {
        this.setState({
          songs: res.data
        })
        .catch(err => {
          console.log(err)
        })
      })
  }

  static navigationOptions = {
    title: 'Music Recs',
  };

  render() {

    let songs = this.state.songs.map(song => {
      return <Button key={song.id} title={song.track} onPress={() => this.props.navigation.navigate("MusicDetail", {
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