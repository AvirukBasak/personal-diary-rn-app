import keyValueStorage from '../../../utis/keyValueStorage';
import documentFileSystem from '../../../utis/documentFileSystem';
import {EntryContent} from '../../../contexts/DiaryEntryContext';

export function openEntry(entryID: string): Promise<EntryContent[]> {
  const entryContent = [] as EntryContent[];

  const promise: Promise<EntryContent[]> = new Promise(resolve =>
    keyValueStorage.getValue(`diaryEntry.${entryID}`).then(value => {
      if (!value) {
        return;
      }
      const filesNos = JSON.parse(value);
      for (let i = 0; i < filesNos; i++) {
        documentFileSystem
          .readFile(`diaryEntry.${entryID}.${i}`)
          .then(filedata => filedata && entryContent.push(filedata));
      }
      resolve(entryContent);
    }),
  );

  return promise;
}
