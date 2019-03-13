// import Utils from "./Utils"
import Realm from "realm"

const SongSchema = {
  name: "Song",
  properties: {
    track: "string",
    artist: "string"
  }
}

Realm.open({ schema: [SongSchema] })
  .then(realm => {
    realm.write(() => {
      realm.create("Song", {
        track: "Brick",
        artist: "(Sandy) Alex G"
      })
    })

    realm.write(() => {
      realm.create("Song", {
        track: "Pristine",
        artist: "Snail Mail"
      })
    })
  })
  .catch(error => {
    console.log(error)
  })
