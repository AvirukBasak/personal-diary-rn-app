import {Pressable, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {randomCryptoUUID} from './util';
import {
  DiaryEntryContext,
  EntryContent,
} from '../../../contexts/DiaryEntryContext';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import colors from '../../../styles/colors';

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
      <Icon name="add" color="#fff" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    position: 'absolute',
    bottom: 50,
    right: 40,
    backgroundColor: colors.accentBgColor,
    padding: 20,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
