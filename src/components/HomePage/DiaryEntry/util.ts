import keyValueStorage from '../../../utis/keyValueStorage';
import documentFileSystem from '../../../utis/documentFileSystem';
import {EntryContent} from '../../../contexts/DiaryEntryContext';
import {DiaryEntryType} from './index';
import logger from '../../../utis/logger';

export function saveEntry(
  entryID: string,
  entryTitle: string,
  entryDate: string,
  entryContent: EntryContent[],
): void {
  const entry: DiaryEntryType = {
    id: entryID,
    date: entryDate,
    title: entryTitle,
    fileCount: entryContent.length,
    extensions: entryContent.map(content => content.extension),
  };

  for (let i = 0; i < entryContent.length; i++) {
    documentFileSystem
      .saveFile(
        `diaryEntry.${entryID}.${i}`,
        entryContent[i].content,
        entryContent[i].extension,
      )
      .catch(error => {
        logger.error('saveEntry: ', error);
      });
  }

  keyValueStorage.setValue(`diaryEntry.${entryID}`, JSON.stringify(entry));
}

export function openEntry(entryID: string): Promise<EntryContent[]> {
  const entryContent = [] as EntryContent[];

  const promise: Promise<EntryContent[]> = new Promise(resolve =>
    keyValueStorage.getValue(`diaryEntry.${entryID}`).then(value => {
      if (!value) {
        return;
      }

      const entryJSON = JSON.parse(value);
      const filesNos = entryJSON.fileCount;
      const extensions = entryJSON.extensions;
      for (let i = 0; i < filesNos; i++) {
        documentFileSystem
          .readFile(`diaryEntry.${entryID}.${i}.${extensions[i]}`)
          .then(filedata => filedata && entryContent.push(filedata));
      }
      resolve(entryContent);
    }),
  );

  return promise;
}
