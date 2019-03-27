import React from "react"
import { View, StyleSheet, TextInput, Button, Picker, Dimensions, Text } from "react-native"
import axios from "axios"

export default class LinksScreen extends React.Component {
  constructor() {
    super()

    this.state = {
      type: "movie",
    }

    this.recSubmit = this.recSubmit.bind(this)
  }
  static navigationOptions = {
    title: "Add Recs"
  }

  recSubmit() {
    let type = this.state.type
    if (type == "song") {
      var data = {
        track: this.state.title,
        artist: this.state.by
      }
      var endpoint = "songs"
    } else if (type == "book") {
      var data = {
        title: this.state.title,
        author: this.state.by
      }
      var endpoint = "books"
    } else if (type ==  "movie" || type == "show") {
      var data = {
        title: this.state.title,
        type: type
      }
      var endpoint = "tv"
    }
    axios
      .post(`https://evening-reef-23065.herokuapp.com/${endpoint}/new`, data)
      .then(res => {
        console.log(res.data)
        this.setState({
          type: "movie",
        })
      })
      .catch(err => {
        console.log(err)
        alert('Please check your entry.')
      })
  }

  render() {
    if (this.state.type == 'song') {
      var placeholderBottom = "Artist"
    } else if (this.state.type == 'book') {
      var placeholderBottom = "Author"
    }
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.text}>
            Type:
          </Text>
          <Picker
            selectedValue={this.state.type}
            style={styles.picker}
            onValueChange={(itemValue) =>
              this.setState({type: itemValue})
            }>
            <Picker.Item label="Movie" value="movie" />
            <Picker.Item label="Show" value="show" />
            <Picker.Item label="Song" value="song" />
            <Picker.Item label="Book" value="book" />
          </Picker>
        </View>
        <View style={styles.input}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.setState({ title: text })}
            placeholder="Title"
          />
          {this.state.type == "song" || this.state.type == "book" ? <TextInput
            style={styles.textInput}
            onChangeText={text => this.setState({ by: text })}
            placeholder={placeholderBottom}
          /> : null}
          <Button title="Submit" onPress={this.recSubmit} />
        </View>
      </View>
    )
  }
}

var { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    height: 700
  },
  top: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 15,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
  },
  picker: {
    height: 40,
    width: width,
    marginTop: -20,
    marginBottom: -15
  },
  input: {
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    width: width
  },
  textInput: {
    borderColor: "grey",
    borderWidth: 1,
    width: width - 40,
    height: 40,
    marginTop: 5
  }
})
