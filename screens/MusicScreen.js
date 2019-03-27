import React from 'react';
import { View, ListView, Image, StyleSheet, Dimensions, Button } from 'react-native';
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
            <Button 
              color="white"
              title={rowData.track}
              onPress={() => this.props.navigation.navigate("MusicDetail", {songProp: {song: rowData}})}
            />
          </Swipeout>
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

var { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: '#fff',
  },
  row : {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 8,
  },
  swipe: {
    flex: 1,
    backgroundColor: "#97C38D",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    width: width - 20
  }
})