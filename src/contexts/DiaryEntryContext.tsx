import React, {createContext, useState, useEffect} from 'react';
import documentFileSystem from '../utis/documentFileSystem';
import keyValueStorage from '../utis/keyValueStorage';
import {FileType} from '../utis/documentFileSystem';

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
  }

  useEffect(() => {
    function saveDiaryEntry() {
      for (let i = 0; i < entryContent.length; i++) {
        const fileName = `diaryEntry.${currentEntryID}.${i}`;
        documentFileSystem.saveFile(
          fileName,
          entryContent[i].content,
          entryContent[i].extension,
        );
      }

      keyValueStorage.setValue(
        `diaryEntry.${currentEntryID}`,
        JSON.stringify(entryContent.length),
      );
    }

    saveDiaryEntry();
  }, [currentEntryID, entryTitle, entryDate, entryContent]);

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
        deleteDiaryEntry,
      }}>
      {children}
    </DiaryEntryContext.Provider>
  );
}
