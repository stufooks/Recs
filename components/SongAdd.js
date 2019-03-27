import React from "react"
import { View, TextInput, Button, Dimensions, StyleSheet } from "react-native"
import axios from "axios"

export default class SongAdd extends React.Component {
  constructor() {
    super()

    this.state = {
      type: "",
      song: "",
      artist: "",
      title: "",
      author: ""
    }

    this.songSubmit = this.songSubmit.bind(this)
  }
  static navigationOptions = {
    title: "Add Recs"
  }

  songSubmit() {
    axios
      .post("https://evening-reef-23065.herokuapp.com/songs/new", {
        track: this.state.song,
        artist: this.state.artist
      })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
        <View style={styles.input}>
          <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={text => this.setState({ song: text })}
            placeholder="Add a song"
          />
          <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={text => this.setState({ artist: text })}
            placeholder="Add the artist"
          />
          <Button title="Submit" onPress={this.songSubmit} />
        </View>
    )
  }
}

var {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
  input: {
    flex: 2,
    width: width - 10,
  }
})