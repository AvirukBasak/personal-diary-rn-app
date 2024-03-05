/*

DiaryEntry structure
- tiny box with date and delete button
- Entry title under the above
- on clicking the box, the user should be taken to the DiaryEntryPage

*/

import React from 'react';
import {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DiaryEntryContext} from '../../../contexts/DiaryEntryContext';
import {openEntry} from './util';
import {FileType} from '../../../utis/documentFileSystem';

export interface DiaryEntryType {
  id: string;
  date: string;
  title: string;
  fileCount: number;
  extensions: FileType[];
}

export interface DiaryEntryProps {
  entry: DiaryEntryType;
}

export default function DiaryEntry({entry}: DiaryEntryProps) {
  const navigation = useNavigation();
  const {setCurrentEntryID, setEntryContent, setEntryDate, setEntryTitle} =
    useContext(DiaryEntryContext);

  return (
    <View style={styles.container}>
      <View style={styles.dateBox}>
        <Text>{entry.date}</Text>
      </View>
      <Text
        style={styles.title}
        onPress={() => {
          openEntry(entry.id).then(entryContents => {
            // set up the context
            setCurrentEntryID(entry.id);
            setEntryTitle(entry.title);
            setEntryDate(entry.date);
            setEntryContent(entryContents);

            const navigationArgs = ['DiaryEntryPage', {isEdit: true}];
            navigation.navigate(...(navigationArgs as never));
          });
        }}>
        {entry.title}
      </Text>
    </View>
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
    borderRadius: 10,
    backgroundColor: 'lightgrey',
  },
  dateBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  deleteButton: {
    color: 'red',
  },
});
