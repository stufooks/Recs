import React from 'react';
import { View, ListView, ScrollView, StyleSheet, Button, Text, TouchableHighlight, Separator } from 'react-native';
import axios from 'axios'
import Swipeout from 'react-native-swipeout'

export default class MusicScreen extends React.Component {
  constructor(props) {
    super()
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows([])
    }
  }

  componentDidMount() {
    axios.get('https://evening-reef-23065.herokuapp.com/songs')
      .then(res => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(res.data)
        })
      .catch(err => {
        console.log(err)
      })
      })
  }

  deleteNote(rowData) {
    axios.delete('https://evening-reef-23065.herokuapp.com/songs/delete', {data: {rowData}})
      .then(res => {
        this.componentDidMount()
      })
      .catch(err => {
        console.log(err)
      })
  }

  renderRow(rowData) {
    let swipeoutBtns = [{
      text: 'Delete',
      backgroundColor: 'red',
      onPress: () => { this.deleteNote(rowData) }
    }];
    return (
        <View style={styles.container}>
          <Swipeout 
          style={styles.swipe}
          right={swipeoutBtns}
          autoClose={true}
          >
            <Button 
              style={styles.button}
              color="white"
              title={rowData.track} 
              onPress={() => this.props.navigation.navigate("MusicDetail", {songProp: {song: rowData}})}
            />
          </Swipeout>
        </View>
    )
  }

  viewNote(rowData) {
   
  }

  static navigationOptions = {
    title: 'Music Recs',
  };

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  swipe: {
    flex: 1,
    backgroundColor: "#D97373",
    width: 220,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5
  },
  button: {
    marginBottom: 100
  }
});