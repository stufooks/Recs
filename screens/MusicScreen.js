import React from 'react';
import { View, ListView, ScrollView, StyleSheet, Button, Text, TouchableHighlight, Separator } from 'react-native';
import axios from 'axios'
import Swipeout from 'react-native-swipeout'
import MusicDetailScreen from './MusicDetailScreen';

export default class MusicScreen extends React.Component {
  constructor(props) {
    super()
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows([])
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/songs')
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
    axios.delete('http://localhost:8000/songs/delete', {data: {rowData}})
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
        <View>
          <Swipeout 
          right={swipeoutBtns}
          autoClose={true}
          >
            <Button 
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
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});