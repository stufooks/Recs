import React from 'react';
import { View, ListView, StyleSheet, Button, Dimensions } from 'react-native';
import axios from 'axios'
import Swipeout from 'react-native-swipeout'

export default class BooksScreen extends React.Component {
  constructor() {
    super()

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows([])
    }
  }

  componentDidMount() {
    axios.get('https://evening-reef-23065.herokuapp.com/books')
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
    axios.delete('https://evening-reef-23065.herokuapp.com/books/delete', {data: {rowData}})
      .then(() => {
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
        <View style={styles.row}>
          <Swipeout 
          style={styles.swipe}
          right={swipeoutBtns}
          autoClose={true}
          >
            <Button 
              color="white"
              title={rowData.title}
              onPress={() => this.props.navigation.navigate("BookDetail", {bookProp: {book: rowData}})}
            />
          </Swipeout>
        </View>
    )
  }

  static navigationOptions = {
    title: 'Book Recs',
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
    backgroundColor: "#CDB49B",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    width: width - 20
  }
})