import React from 'react';
import { View, ListView, ScrollView, StyleSheet, Button, Text, TouchableHighlight, Separator } from 'react-native';
import axios from 'axios'
import Swipeout from 'react-native-swipeout'

export default class BooksScreen extends React.Component {
  constructor(props) {
    super()
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows([])
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/books')
      .then(res => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(res.data)
        })
      .catch(err => {
        console.log(err)
      })
      })
  }

  deleteBook(rowData) {
    axios.delete('http://localhost:8000/books/delete', {data: {rowData}})
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
      onPress: () => { this.deleteBook(rowData) }
    }];
    return (
        <View>
          <Swipeout 
          right={swipeoutBtns}
          autoClose={true}
          >
            <Button 
              title={rowData.title}
              onPress={() => this.props.navigation.navigate("BookDetail", {bookProp: {book: rowData}})}
            />
          </Swipeout>
        </View>
    )
  }

  viewBook(rowData) {
   
  }

  static navigationOptions = {
    title: 'Book Recs',
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