import React from "react"
import { StyleSheet, Text, Image, View, Button, Linking } from "react-native"
import axios from "axios"

export default class TVDetailScreen extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {

    const tvProp = this.props.navigation.getParam("tvProp", {
      title: "default",
      type: "default"
    })

    this.setState({
      title: tvProp.tv.title,
      type: tvProp.tv.type
    })

    title = title.replace(/ /g, "%20")

    axios.get(`http://api-public.guidebox.com/v2/search?api_key=210874e682f5c3fe74c2320dbe2e1dc646677676&type=${type}&field=title&query=${title}`)
      .then(res => {
        if (type == "movie") {
          var image = res.data.results[0].poster_240x342
          var link = res.data.results[0].imdb
        } else {
          var image = res.data.results[0].artwork_304x171
          var link = res.data.results[0].imdb_id
        }
        this.setState({
          image: image,
          link: `https://www.imdb.com/title/${link}`
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
      if (this.state.type == "movie") {
        var width = 200
        var height = 300
      } else {
        var width = 300
        var height = 200
      }
      return (
        <View style={styles.container}>
          <View>
            <Image
              style={{
                width: width,
                height: height,
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
  }
})