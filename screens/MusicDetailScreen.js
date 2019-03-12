import React from "react"
import { StyleSheet, Text, Image, View, Button, Linking } from "react-native"
import axios from "axios"
import base64 from "react-native-base64"

export default class MusicDetailScreen extends React.Component {
  constructor(props) {
    super()
  }

  componentDidMount() {
    // const client_id = "bb2b5363495f4f7ca2c7185c66beef95"
    // const client_secret = "bdd6239e795b48218ed5f9be4e5550d5"

    // const encoded = base64.encode(client_id + ":" + client_secret)

    // const url = "https://accounts.spotify.com/api/token"
    // const headers = {
    //   Authorization: "Basic " + encoded,
    // }
    // const body = {
    //   grant_type: "client_credentials",
    //   ContentType: "application/x-www-form-urlencoded"
    // }
    // axios.post(url, body, {headers: headers})
    //     .then(res => {
    //         console.log(res.token)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:
        "Bearer BQAUqomKSo6t0Kn2G3f7R9hBPctrYC-MXHedArL3SJ9avoZMtN-aI4c--iBix2SQ4w7JLzFHrTqLKFeLxlo"
    }

    const otherParam = this.props.navigation.getParam("otherParam", {
      artist: "default",
      track: "default"
    })

    const artistFirst = otherParam.artist.split(" ")[0]
    const trackFirst = otherParam.track.split(" ")[0]

    axios
      .get(
        "https://api.spotify.com/v1/search?q=artist:"+ artistFirst +"%20track:"+ trackFirst +"&type=track&limit=1&api_key=",
        { headers: headers }
      )
      .then(res => {

        console.log(res.data.tracks.items[0].external_urls.spotify)

        this.setState({
          track: otherParam.track,
          artist: otherParam.artist,
          images: res.data.tracks.items[0].album.images,
          link: res.data.tracks.items[0].external_urls.spotify
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  static navigationOptions = {
    title: "Your Rec"
  }

  render() {
    if (this.state == null) {
      return null
    } else {
      return (
        <View style={styles.container}>
          <Image
            style={{
              width: this.state.images[1].width,
              height: this.state.images[1].height
            }}
            source={{ uri: this.state.images[1].url }}
          />
          <Text>{this.state.track}</Text>
          <Text>{this.state.artist}</Text>
          <Button
            title="Open in Spotify"
            onPress={() => Linking.openURL(this.state.link)}
          />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff"
  }
})
