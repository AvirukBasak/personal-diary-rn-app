import {Pressable, StyleSheet, Text} from 'react-native';
import React, {useContext} from 'react';
import {randomCryptoUUID} from './util';
import {
  DiaryEntryContext,
  EntryContent,
} from '../../../contexts/DiaryEntryContext';
import {useNavigation} from '@react-navigation/native';

export default function AddNewEntryButton() {
  const {setCurrentEntryID, setEntryContent, setEntryDate, setEntryTitle} =
    useContext(DiaryEntryContext);
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        const entryID = randomCryptoUUID();
        const entryDate = new Date().toLocaleDateString();
        const entryTitle = 'Untitled';
        const entryContents: EntryContent[] = [];

        // set up the context
        setCurrentEntryID(entryID);
        setEntryTitle(entryTitle);
        setEntryDate(entryDate);
        setEntryContent(entryContents);

        // navigate to the new entry page
        const navigationArgs = ['DiaryEntryPage', {isEdit: true}];
        navigation.navigate(...(navigationArgs as never));
      }}>
      <Text style={styles.title}>Add New</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    bottom: 70,
    right: 40,
    backgroundColor: '#26653A',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
