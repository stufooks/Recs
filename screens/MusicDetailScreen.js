import React from "react"
import { StyleSheet, Text, Image, View, Button, Linking } from "react-native"
import axios from "axios"
import base64 from "react-native-base64"
// import request from 'request'

export default class MusicDetailScreen extends React.Component {
  constructor(props) {
    super()
  }

  componentDidMount() {

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer BQDGw7Sb2r62_1A-gyGszamrjURniURrx-sMBNd_cFaNgq5XCG3fjP8mmRftgRBO4LNe28FHlQUGEDnFpJQ"
    }

    const songProp = this.props.navigation.getParam("songProp", {
      artist: "default",
      track: "default"
    })

    const artistFirst = songProp.song.artist.split(" ")[0]
    const trackFirst = songProp.song.track.split(" ")[0]

    axios.get(
      "https://api.spotify.com/v1/search?q=artist:" +
        artistFirst +
        "%20track:" +
        trackFirst +
        "&type=track&limit=1&api_key=",
      {headers: headers}
    )
      .then(res => {
        this.setState({
          track: songProp.song.track,
          artist: songProp.song.artist,
          images: res.data.tracks.items[0].album.images,
          link: res.data.tracks.items[0].external_urls.spotify
        })
      })
      .catch(err => {
        console.log(err)
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
                width: this.state.images[1].width,
                height: this.state.images[1].height,
                borderRadius: 8
              }}
              source={{ uri: this.state.images[1].url }}
            />
          </View>
          <View style={styles.textArea}>
            <Text style={styles.title}>{this.state.track}</Text>
            <Text style={styles.artist}>By {this.state.artist}</Text>
            <Button
              style={styles.link}
              title="Open in Spotify"
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
    paddingTop: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 30,
    fontWeight: "bold"
  },
  artist: {
    fontSize: 20,
    paddingBottom: 50,
  },
  textArea: {
    width: 280,
    paddingTop: 20,
  },
  link: {
    textAlign: "center",
  }
})