import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import axios from 'axios'
 

export default class MusicDetailScreen extends React.Component {
  constructor(props) {
    super()

    const { navigation } = props
    const otherParam = navigation.getParam('otherParam', {artist: "default", track: "default"})
    this.state = {
        otherParam
    }
  }

  componentDidMount() {
    const url = "https://api.spotify.com/v1/search?"
    axios.get(url + `q=artist:${this.state.otherParam.artist}%20track:${this.state.otherParam.track}&type=track&limit=1`, { headers:
        {"Authorization": "Bearer BQDgnvdEBEgFIAu_oZJh8GweSTJhJgmH8_dhiNDSZVOg5rHNMSrMLm2Tb35rX4ArH-VEK2zSbygBr3fPuosDho1HSdnWKDxLbSjdtELKH1T-oWa10_DkLzrjFR2jXVQhHJLAZH5RVahgl-LaDg"}
    })
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })

  }

  static navigationOptions = {
    title: 'Links',
  };

  render() {

    // const { navigation } = this.props
    // const otherParam = navigation.getParam('otherParam', {artist: "default", track: "default"})

    return (
      <Text>Hello from detail</Text>
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