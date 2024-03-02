/*

HomePage structure
- TitleBar with string `Hello, ${userName}`
- Scrollable list of DiaryEntry components

*/

import React from 'react';
import {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import TitleBar from '../../components/Common/TitleBar';
import DiaryEntry from '../../components/HomePage/DiaryEntry';
import keyValueStorage from '../../utis/keyValueStorage';

export default function HomePage() {
  const [diaryEntries, setDiaryEntries] = useState<string[]>([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    keyValueStorage.getAllDiaryEntries().then(setDiaryEntries);
    keyValueStorage.getValue('userName').then(setUserName);
  }, []);

  useEffect(() => {
    keyValueStorage.setValue('userName', userName);
  }, [userName]);

  return (
    <View style={styles.container}>
      <TitleBar title={`Hello, ${userName}`} setTitle={setUserName} />
      {diaryEntries.map((entry, index) => (
        <DiaryEntry key={index} entry={JSON.parse(entry)} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
