import React from "react"
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  Button,
  View
} from "react-native"
import { WebBrowser } from "expo"
import { MonoText } from "../components/StyledText"
import axios from "axios"

export default class LibraryScreen extends React.Component {
  static navigationOptions = {
    title: "Library"
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.row}>
            <View style={styles.category}>
              <Image
                style={{ width: 25, height: 25 }}
                source={require("../assets/images/music-icon.png")}
              />
              <Button
                // style={styles.button}
                color="black"
                title="Music"
                onPress={() => this.props.navigation.navigate("Music")}
              />
            </View>
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../assets/images/right-arrow.png")}
            />
          </View>
          <View style={styles.row}>
            <View style={styles.category}>
              <Image
                style={{ width: 25, height: 25 }}
                source={require("../assets/images/book-icon.png")}
              />
              <Button
                // style={styles.button}
                color="black"
                title="Books"
                onPress={() => this.props.navigation.navigate("Music")}
              />
            </View>
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../assets/images/right-arrow.png")}
            />
          </View>
          <View style={styles.row}>
            <View style={styles.category}>
              <Image
                style={{ width: 25, height: 25 }}
                source={require("../assets/images/tv-icon.png")}
              />
              <Button
                // style={styles.button}
                color="black"
                title="Movies and TV"
                onPress={() => this.props.navigation.navigate("Music")}
              />
            </View>
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../assets/images/right-arrow.png")}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 7,
    backgroundColor: "#fff"
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
    paddingTop: 8
  },
  category: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 20
  }
})
