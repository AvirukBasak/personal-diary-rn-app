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

import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {View} from 'react-native';
import {Icon} from 'react-native-elements';
import {EntryContent} from '../../../contexts/DiaryEntryContext';
import {FileType} from '../../../utis/documentFileSystem';

// create the buttons
function TextInputButton({onPress}: {onPress: () => void}) {
  return (
    <Icon
      name="text"
      type="material"
      onPress={onPress}
      size={50}
      color="black"
    />
  );
}

function GeolocationButton({onPress}: {onPress: () => void}) {
  return (
    <Icon
      name="location-on"
      type="material"
      onPress={onPress}
      size={50}
      color="black"
    />
  );
}

function PictureButton({onPress}: {onPress: () => void}) {
  return (
    <Icon
      name="camera"
      type="material"
      onPress={onPress}
      size={50}
      color="black"
    />
  );
}

function VideoButton({onPress}: {onPress: () => void}) {
  return (
    <Icon
      name="videocam"
      type="material"
      onPress={onPress}
      size={50}
      color="black"
    />
  );
}

function SaveButton({onPress}: {onPress: () => void}) {
  return (
    <Icon
      name="save"
      type="material"
      onPress={onPress}
      size={50}
      color="black"
    />
  );
}

function DeleteButton({onPress}: {onPress: () => void}) {
  return (
    <Icon
      name="delete"
      type="material"
      onPress={onPress}
      size={50}
      color="black"
    />
  );
}

interface ToolBarProps {
  entryDate: string;
  setEntryDate: (date: string) => void;
  entryContent: Array<EntryContent>;
  setEntryContent: (content: Array<EntryContent>) => void;
}

// create the toolbar
export default function ToolBar({
  setEntryDate,
  entryContent,
  setEntryContent,
}: ToolBarProps) {
  const [location, setLocation] = useState('');
  const [picture, setPicture] = useState('');
  const [video, setVideo] = useState('');

  useEffect(() => {
    Geolocation.requestAuthorization(null, null);
    Geolocation.getCurrentPosition(
      (info: {coords: {latitud: any; longitude: any}}) => {
        setLocation(`${info.coords.latitud} ${info.coords.longitude}`);
      },
      null,
      null,
    );
  }, []);

  return (
    <View>
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
        onPress={() => {
          setEntryContent([
            ...entryContent,
            {extension: FileType.GEO, content: location},
          ]);
          setEntryDate(new Date().toLocaleDateString());
        }}
      />
      <PictureButton
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
      />
      <SaveButton
        onPress={() => {
          setEntryDate(new Date().toLocaleDateString());
        }}
      />
      <DeleteButton
        onPress={() => {
          setEntryDate(new Date().toLocaleDateString());
        }}
      />
    </View>
  );
}
