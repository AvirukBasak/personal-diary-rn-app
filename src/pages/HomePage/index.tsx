/*

HomePage structure
- TitleBar with string `Hello, ${userName}`
- Scrollable list of DiaryEntry components

*/

import React from 'react';
import {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import TitleBar from '../../components/Common/TitleBar';
import DiaryEntry, {DiaryEntryType} from '../../components/HomePage/DiaryEntry';
import AddNewEntryButton from '../../components/HomePage/AddNewEntryButton';
import keyValueStorage from '../../utis/keyValueStorage';
import logger from '../../utis/logger';
import colors from '../../styles/colors';

export default function HomePage() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntryType[]>([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    keyValueStorage.getAllDiaryEntries().then(entires => {
      const parsedEntries = entires.map(entry => JSON.parse(entry));
      setDiaryEntries(parsedEntries);
    });

    keyValueStorage
      .getValue('userName')
      .then(value => setUserName(value || 'User'));
  }, []);

  useEffect(() => {
    keyValueStorage.setValue('userName', userName);
  }, [userName]);

  useEffect(() => {
    logger.log('loaded: userName:', userName);
  }, [userName]);

  useEffect(() => {
    logger.log('loaded: diaryEntries:', diaryEntries);
  }, [diaryEntries]);

  return (
    <View style={styles.container}>
      <TitleBar title={`Hello, ${userName}`} setTitle={setUserName} />
      {diaryEntries.length === 0 ? (
        <View style={styles.emptyDiary}>
          <Text style={styles.emptyDiaryText}>
            Start your diary by adding a new entry
          </Text>
        </View>
      ) : (
        diaryEntries.map((entry, index) => (
          <DiaryEntry key={index} entry={entry} />
        ))
      )}
      <AddNewEntryButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBgColor,
  },
  emptyDiary: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyDiaryText: {color: 'gray'},
});
