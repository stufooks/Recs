import React from "react"
import { View, StyleSheet, TextInput, Button, Picker } from "react-native"
import axios from "axios"

export default class LinksScreen extends React.Component {
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
    this.bookSubmit = this.bookSubmit.bind(this)
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

  bookSubmit() {
    axios
      .post("https://evening-reef-23065.herokuapp.com/books/new", {
        title: this.state.title,
        author: this.state.author
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
      <View>
        <View style={styles.container}>
          <Picker
            // selectedValue={this.state.language}
            style={{ height: 50, width: 100 }}
            onValueChange={itemValue => this.setState({ type: itemValue })}
          >
            <Picker.Item label="Song" value="song" />
            <Picker.Item label="Book" value="book" />
          </Picker>
        </View>
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  },
  input: {
    flex: 2
  }
})
