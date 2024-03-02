/*

DiaryEntryPage structure
- TitleBar
- ScrollView containing the items of entryContent

*/

import React, {useContext} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import TitleBar from '../../components/Common/TitleBar';
import DiaryEntryContextProvider, {
  DiaryEntryContext,
} from '../../contexts/DiaryEntryContext';

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
      <ScrollView>
        {entryContent.map((item, index) => {
          return (
            <View key={index}>
              <Text>{item.content}</Text>
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
});
