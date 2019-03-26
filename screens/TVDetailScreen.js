import React from "react"
import { StyleSheet, Text, Image, View, Button, Linking } from "react-native"
import axios from "axios"

export default class TVDetailScreen extends React.Component {
  constructor(props) {
    super()
  }

  componentDidMount() {

    const tvProp = this.props.navigation.getParam("tvProp", {
      title: "default",
      type: "default"
    })

    var title = tvProp.tv.title
    var type = tvProp.tv.type
    this.setState({
      title: title,
      type: type
    })
    title = title.replace(/ /g, "%20")

    axios.get(`http://api-public.guidebox.com/v2/search?api_key=210874e682f5c3fe74c2320dbe2e1dc646677676&type=${type}&field=title&query=${title}`)
      .then(res => {
        console.log(res.data.results[0].poster_240x342)
        this.setState({
          image: res.data.results[0].poster_240x342,
          link: `https://www.imdb.com/title/${res.data.results[0].imdb}`
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
                height: 300,
                borderRadius: 8
              }}
              source={{ uri: this.state.image }}
            />
          </View>
          <View style={styles.textArea}>
            <Text style={styles.title}>{this.state.title}</Text>
            <Button
              title="Open on IMDB"
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