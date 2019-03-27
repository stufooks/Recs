import React from "react"
import { Platform, Text } from "react-native"
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation"

import AddIcon from "../components/AddIcon"
import LibraryIcon from "../components/LibraryIcon"
import LibraryScreen from "../screens/LibraryScreen"
import AddScreen from "../screens/AddScreen"
import MusicScreen from "../screens/MusicScreen"
import MusicDetailScreen from "../screens/MusicDetailScreen"
import BooksScreen from "../screens/BooksScreen"
import BookDetailScreen from "../screens/BookDetailScreen"
import TVScreen from "../screens/TVScreen"
import TVDetailScreen from "../screens/TVDetailScreen"

const LibraryStack = createStackNavigator({
  Home: LibraryScreen,
  Music: MusicScreen,
  MusicDetail: MusicDetailScreen,
  Books: BooksScreen,
  BookDetail: BookDetailScreen,
  TV: TVScreen,
  TVDetail: TVDetailScreen,
})

LibraryStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <Text style={focused ? {color: "black", marginBottom: 1} : {color: "grey", marginBottom: 1}}>Library</Text>
  ),
  tabBarIcon: ({ focused }) => (
    <LibraryIcon
      focused={focused}
    />
  )
}

const AddStack = createStackNavigator({
  Links: AddScreen,
})

AddStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <Text style={focused ? {color: "black", marginBottom: 1} : {color: "grey", marginBottom: 1}}>Add</Text>
  ),
  tabBarIcon: ({ focused }) => (
    <AddIcon
      focused={focused}
    />
  )
}

export default createBottomTabNavigator({
  LibraryStack,
  AddStack
})
