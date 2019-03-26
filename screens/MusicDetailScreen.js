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
    const client_id = "bb2b5363495f4f7ca2c7185c76beef953"
    const client_secret = "bdd6239e795b46218ed5f988e4e5550d5"

    const encoded = base64.encode(client_id + ":" + client_secret)

    const url = "https://accounts.spotify.com/api/token"
    const headers = {
      'X-Authorization': "Basic " + encoded,
      "Content-Type": "application/x-www-form-urlencoded"
    }
    const data = {
      "grant_type": "client_credentials"
    }

    // axios.post('https://accounts.spotify.com/api/token', data)
    //   .then(res => {
    //     console.log("HERE EEEEEE HERE EEEEE", res)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  

    const headers1 = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer BQBb-AoB7oQmFWEg39tT5HNGMzVQ_OK8JlI0Mwm51alGV8ENk96YTqOo1KSK3wq6QEX38KQTnC9icCMoyIA"
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
      {headers: headers1}
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