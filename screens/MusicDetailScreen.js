import React from "react"
import { StyleSheet, Text, Image, View, Button, Linking } from "react-native"
import axios from "axios"
import base64 from "react-native-base64"

export default class MusicDetailScreen extends React.Component {
  constructor(props) {
    super()
  }

  componentDidMount() {
  //   const client_id = "bb2b5363495f4f7ca2c7185c66beef95"
  //   const client_secret = "bdd6239e795b48218ed5f9be4e5550d5"

  //   const encoded = base64.encode(client_id + ":" + client_secret)

  //   const url = "https://accounts.spotify.com/api/token"
  //   const headers = {
  //     "Authorization": "Basic " + encoded,
  //     "Content-Type": "application/x-www-form-urlencoded"
  //   }
  //   const data = {
  //     grant_type: "client_credentials"
  //   }

  //   axios.post('https://accounts.spotify.com/api/token', data, {headers: headers})
  //     .then(res => {
  //       console.log(res.token)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })

  //   axios.request ({
  //     url: 'https://accounts.spotify.com/api/token',
  //     method: 'post',
  //     data: {
  //       grant_type: "client_credentials"
  //     },
  //     headers: {
  //       Authorization: "Basic " + encoded,
  //       "Content-Type": "application/x-www-form-urlencoded"
  //     }
  // })
  // .catch(err => {
  //   console.log(err)
  // })

    const headers1 = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer BQArKX-S25MHDzuEEV2nZEhqb4aEVQmrmLSHXuBqvL_7FtNymVctM_za-5dOLMff3H9Vmf8g__tQJs--I5Y"
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
            <Text>{this.state.artist}</Text>
            <Button
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
  textArea: {
    width: 280,
    alignItems: "flex-start"
  }
})
