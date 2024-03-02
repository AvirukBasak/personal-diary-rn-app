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

export interface DiaryEntryType {
  id: string;
  date: string;
  title: string;
}

export interface DiaryEntryProps {
  entry: DiaryEntryType;
}

export default function DiaryEntry({entry}: DiaryEntryProps) {
  const navigation = useNavigation();
  const {deleteDiaryEntry} = useContext(DiaryEntryContext);

  return (
    <View style={styles.container}>
      <View style={styles.dateBox}>
        <Text>{entry.date}</Text>
        <Text
          style={styles.deleteButton}
          onPress={() => {
            deleteDiaryEntry(entry.date);
          }}>
          Delete
        </Text>
      </View>
      <Text
        style={styles.title}
        onPress={() => {
          navigation.navigate('DiaryEntryPage', {entry, isEdit: true});
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
