/*

DiaryEntryPage structure
- TitleBar
- ScrollView containing the items of entryContent

Views

Each views takes base64 encoded data and displays it in a different way
for text, it is a TextInput
for geolocation, it is a MapView
for picture, it is an Image
for video, it is a Video

on click, geolocation opens in map using an URI

Image and Video are placed in a container that has a button to collapse the view

For now, only text, geo and picture are implemented

*/

import React, {useContext} from 'react';
import {View, StyleSheet, ScrollView, TextInput, Image} from 'react-native';
import TitleBar from '../../components/Common/TitleBar';
import ToolBar from '../../components/DiaryEntryPage/ToolBar';
import DiaryEntryContextProvider, {
  DiaryEntryContext,
} from '../../contexts/DiaryEntryContext';
import {FileType} from '../../utis/documentFileSystem';

function EditTextView({children}: {children: string}) {
  return (
    <TextInput
      multiline
      editable={false}
      value={children}
      style={styles.textInput}
    />
  );
}

function GeoView({children}: {children: string}) {
  children = children.replace(' ', '+');
  return (
    <Image
      source={{
        uri: `https://www.google.com/maps/search/?api=1&query=${children}`,
      }}
      style={styles.geoView}
    />
  );
}

// function ImageView({children}: {children: string}) {
//   return (
//     <View>
//       <Image
//         source={{
//           uri: `data:image/png;base64,${children}`,
//         }}
//         style={{width: 100, height: 100}}
//       />
//     </View>
//   );
// }

// function VideoView({children}: {children: string}) {
//   return (
//     <View>
//       <Image
//         source={{
//           uri: `data:image/png;base64,${children}`,
//         }}
//         style={{width: 100, height: 100}}
//       />
//     </View>
//   );
// }

function DiaryEntryPage() {
  const {
    currentEntryID,
    entryTitle,
    setEntryTitle,
    entryDate,
    setEntryDate,
    entryContent,
    setEntryContent,
  } = useContext(DiaryEntryContext);

  return (
    <View key={currentEntryID} style={styles.container}>
      <TitleBar title={entryTitle} setTitle={setEntryTitle} />
      <ScrollView style={styles.scrollView}>
        {entryContent.map((item, index) => {
          return (
            <View key={index}>
              {item.extension === FileType.TEXT && (
                <EditTextView>{item.content}</EditTextView>
              )}
              {item.extension === FileType.GEO && (
                <GeoView>{item.content}</GeoView>
              )}
              {/* {item.extension === FileType.IMAGE && (
                <ImageView>{item.content}</ImageView>
              )}
              {item.extension === FileType.VIDEO && (
                <VideoView>{item.content}</VideoView>
              )} */}
            </View>
          );
        })}
      </ScrollView>
      <ToolBar
        entryDate={entryDate}
        setEntryDate={setEntryDate}
        entryContent={entryContent}
        setEntryContent={setEntryContent}
      />
    </View>
  );
}

export default function DiaryEntryPageWithProvider() {
  return (
    <DiaryEntryContextProvider>
      <DiaryEntryPage />
    </DiaryEntryContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 10,
  },
  scrollView: {
    width: '100%',
    height: '100%',
  },
  textInput: {
    width: '100%',
    margin: 10,
  },
  geoView: {
    width: '100%',
    margin: 10,
  },
  imageView: {
    margin: 10,
    width: '100%',
  },
  videoView: {
    margin: 10,
    width: '100%',
    height: 'auto',
  },
});
