import React from "react"
import { StyleSheet, Text, Image, View, Button, Linking, Dimensions } from "react-native"
import axios from "axios"

const win = Dimensions.get('window');

export default class BookDetailScreen extends React.Component {

  componentDidMount() {

    const bookProp = this.props.navigation.getParam("bookProp", {
      title: "default",
      author: "default"
    })

    var title = bookProp.book.title
    this.setState({
      title: title
    })
    title = title.replace(/ /g, "+")

    axios.get(`http://openlibrary.org/search.json?title=${title}`)
      .then(res => {
        this.setState({
          author: res.data.docs[0].author_name[0],
          firstSent: res.data.docs[0].first_sentence[0],
          image: `http://covers.openlibrary.org/b/isbn/${res.data.docs[0].isbn[0]}-M.jpg`,
          link: `https://openlibrary.org/isbn/${res.data.docs[0].isbn[0]}`
        })
        })
  }

  static navigationOptions = {
    title: "Rec"
  }

  render() {
    if (this.state == null) {
      return null
    } else {
      return (
        <View style={styles.container}>
          <View>
            <Image
              style={{
                width: 200,
                height: 280,
                borderRadius: 8
              }}
              source={{ uri: this.state.image }}
            />
          </View>
          <View style={styles.textArea}>
            <Text style={styles.title}>{this.state.title}</Text>
            <Text style={styles.author}>By {this.state.author}</Text>
            <Text style={styles.firstSent}>"{this.state.firstSent}"</Text>
            <Button
              title="Open on Open Library"
              onPress={() => Linking.openURL(this.state.link)}
            />
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 15,
    textAlign: "center"
  },
  textArea: {
    paddingTop: 15,
    width: 280,
    alignItems: "center"
  },
  author: {
    fontSize: 20,
    textAlign: "center"
  },
  firstSent: {
    paddingTop: 15,
    width: 250,
    textAlign: "center"
  }
})