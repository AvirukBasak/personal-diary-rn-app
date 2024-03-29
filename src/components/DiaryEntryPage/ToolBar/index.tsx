/*

ToolBar structure
- TextInputButton. GeolocationButton, PictureButton, VideoButton, SaveButton, DeleteButton
- TextInputButton creates an editable text input box at the end of the ScrollView
- GeolocationButton gets the current location and adds it to the end of the ScrollView
- PictureButton opens the camera and adds the picture to the end of the ScrollView
- VideoButton opens the camera and adds the video to the end of the ScrollView
- SaveButton saves the entry to the database
- DeleteButton asks for confirmation and deletes the entry from the database

Each button is an Icon from react-native-elements

geolocation on click opens in map using an URI
picture and video on click does not open anything

*/

import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {FileType} from '../../../utis/documentFileSystem';
import type {GeoLocationType} from './types.d.ts';
import {getGeoLocation} from './util.ts';
import colors from '../../../styles/colors.ts';
import {DiaryEntryContext} from '../../../contexts/DiaryEntryContext.tsx';
import {randomCryptoUUID} from '../../HomePage/AddNewEntryButton/util.ts';
import logger from '../../../utis/logger.ts';

// create the buttons
function TextInputButton({onPress}: {onPress: () => void}) {
  return (
    <Icon
      name="text"
      type="entypo"
      onPress={onPress}
      size={30}
      color={colors.accentColor}
    />
  );
}

function GeolocationButton({
  onPress,
}: {
  onPress: (location: GeoLocationType) => void;
}) {
  return (
    <Icon
      name="location-on"
      type="material"
      onPress={() => {
        getGeoLocation()
          .then(location => onPress(location))
          .catch(logger.error);
      }}
      size={30}
      color={colors.accentColor}
    />
  );
}

// function PictureButton({onPress}: {onPress: () => void}) {
//   return (
//     <Icon
//       name="camera"
//       type="material"
//       onPress={onPress}
//       size={50}
//       color="black"
//     />
//   );
// }

// function VideoButton({onPress}: {onPress: () => void}) {
//   return (
//     <Icon
//       name="videocam"
//       type="material"
//       onPress={onPress}
//       size={50}
//       color="black"
//     />
//   );
// }

function SaveButton({onPress}: {onPress: () => void}) {
  return (
    <Icon
      name="save"
      type="material"
      onPress={onPress}
      size={30}
      color={colors.accentColor}
    />
  );
}

function DeleteButton({onPress}: {onPress: () => void}) {
  return (
    <Icon
      name="delete"
      type="material"
      onPress={onPress}
      size={30}
      color={colors.accentColor}
    />
  );
}

// create the toolbar
export default function ToolBar() {
  const {
    currentEntryID,
    setCurrentEntryID,

    entryContent,
    setEntryContent,

    setEntryDate,

    saveDiaryEntry,
    deleteDiaryEntry,
  } = useContext(DiaryEntryContext);

  return (
    <View style={styles.container}>
      <TextInputButton
        onPress={() => {
          setEntryContent([
            ...entryContent,
            {extension: FileType.TEXT, content: ''},
          ]);
          setEntryDate(new Date().toLocaleDateString());
        }}
      />

      <GeolocationButton
        onPress={location => {
          setEntryContent([
            ...entryContent,
            {extension: FileType.GEO, content: JSON.stringify(location)},
          ]);
          setEntryDate(new Date().toLocaleDateString());
        }}
      />

      {/* <PictureButton
        onPress={() => {
          setEntryContent([
            ...entryContent,
            {extension: FileType.IMAGE, content: picture},
          ]);
          setEntryDate(new Date().toLocaleDateString());
        }}
      />

      <VideoButton
        onPress={() => {
          setEntryContent([
            ...entryContent,
            {extension: FileType.VIDEO, content: video},
          ]);
          setEntryDate(new Date().toLocaleDateString());
        }}
      /> */}

      <SaveButton
        onPress={() => {
          setEntryDate(new Date().toLocaleDateString());
          if (currentEntryID === '') {
            setCurrentEntryID(randomCryptoUUID());
          }
          saveDiaryEntry();
        }}
      />

      <DeleteButton
        onPress={() => {
          setEntryDate(new Date().toLocaleDateString());
          deleteDiaryEntry();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: 15,
    margin: 'auto',
  },
});
