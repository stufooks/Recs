import React from 'react';
import { View, ListView, Image, StyleSheet, Button, Text, TouchableHighlight, Separator } from 'react-native';
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
        <View style={styles.row}>
          <Swipeout 
          style={styles.swipe}
          right={swipeoutBtns}
          autoClose={true}
          >
            <Text 
              style={styles.button}
              onPress={() => this.props.navigation.navigate("MusicDetail", {songProp: {song: rowData}})}
            >
            {rowData.track}
            </Text>
          </Swipeout>
          <Image
              style={{ width: 25, height: 25 }}
              source={require("../assets/images/right-arrow.png")}
            />
        </View>
    )
  }

  static navigationOptions = {
    title: 'Music Recs',
  };

  render() {
    return (
      <ListView style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 20,
    paddingBottom: 15,
  },
  swipe: {
    borderColor: "grey",
    backgroundColor: "white",
    width: 310
  },
  button: {
    fontSize: 20,
    paddingLeft: 20,
    fontWeight: "bold",
  }
});