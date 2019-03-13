import React from 'react';
import { View, StyleSheet, TextInput, Button, AsyncStorage } from 'react-native';

export default class LinksScreen extends React.Component {
  constructor() {
    super()

    this.state = {
      song: "Add a song",
      artist: "Add an artist"
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }
  static navigationOptions = {
    title: 'Links',
  };

  componentDidUpdate() {
    console.log(this.state)
  }

  handleSubmit() {
    alert('working')
  }

  // handleSubmit = async () => {
  //   try {
  //     await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
  //   } catch (err) {
  //     console.log(err)
  //   }
  // };

  render() {
    return (
      <View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({song: text})}
          value={this.state.song}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({artist: text})}
          value={this.state.artist}
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
