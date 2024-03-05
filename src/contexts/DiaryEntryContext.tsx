import React, {createContext, useState} from 'react';
import documentFileSystem from '../utis/documentFileSystem';
import keyValueStorage from '../utis/keyValueStorage';
import {FileType} from '../utis/documentFileSystem';
import logger from '../utis/logger';
import {showToast} from '../utis/uiHelpers';
import {saveEntry} from '../components/HomePage/DiaryEntry/util';

export interface EntryContent {
  content: string;
  extension: FileType;
}

export const DiaryEntryContext = createContext({
  currentEntryID: '',
  setCurrentEntryID: (id: string) => {
    id;
  },

  entryTitle: '',
  setEntryTitle: (title: string) => {
    title;
  },

  entryDate: '',
  setEntryDate: (date: string) => {
    date;
  },

  entryContent: [] as EntryContent[],
  setEntryContent: (content: EntryContent[]) => {
    content;
  },

  saveDiaryEntry: () => {},
  deleteDiaryEntry: () => {},
});

export default function DiaryEntryContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentEntryID, setCurrentEntryID] = useState('');
  const [entryTitle, setEntryTitle] = useState('');
  const [entryDate, setEntryDate] = useState(new Date().toLocaleDateString());
  const [entryContent, setEntryContent] = useState([] as EntryContent[]);

  function saveDiaryEntry() {
    if (currentEntryID === '') {
      logger.error('diary entry context: currentEntryID is empty');
      return;
    }

    logger.log(`diary entry context: id: ${currentEntryID}`);

    saveEntry(currentEntryID, entryTitle, entryDate, entryContent);
    showToast(`Saved ${entryTitle}`);
  }

  function deleteDiaryEntry() {
    keyValueStorage.getValue(`diaryEntry.${currentEntryID}`).then(value => {
      if (!value) {
        return;
      }
      const filesNos = JSON.parse(value);
      for (let i = 0; i < filesNos; i++) {
        documentFileSystem.deleteFile(`diaryEntry.${currentEntryID}.${i}`);
      }
    });

    showToast(`Deleted ${entryTitle}`);
  }

  return (
    <DiaryEntryContext.Provider
      value={{
        currentEntryID,
        setCurrentEntryID,

        entryTitle,
        setEntryTitle,

        entryDate,
        setEntryDate,

        entryContent,
        setEntryContent,

        saveDiaryEntry,
        deleteDiaryEntry,
      }}>
      {children}
    </DiaryEntryContext.Provider>
  );
}
