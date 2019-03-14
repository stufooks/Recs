import React from 'react';
import { View, StyleSheet, TextInput, Button, AsyncStorage } from 'react-native';
import axios from 'axios';

export default class LinksScreen extends React.Component {
  constructor() {
    super()

    this.state = {
      song: "",
      artist: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }
  static navigationOptions = {
    title: 'Add Recs',
  };

  handleSubmit() {
    axios.post('http://localhost:8000/songs/new',
    {track: this.state.song,
    artist: this.state.artist})
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({song: text})}
          placeholder="Add a song"
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({artist: text})}
          placeholder="Add an artist"
        />
        <Button title="Submit" onPress={this.handleSubmit}>

        </Button>
      </View>
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
