import RNFS from 'react-native-fs';
import logger from './logger';

// Define file types enum
export enum FileType {
  TEXT = 'txt',
  IMAGE = 'png',
  VIDEO = 'mp4',
  GEO = 'geo',
}

interface FileData {
  extension: FileType;
  content: string;
}

export const saveFile = async (
  filename: string,
  content: string,
  extension: FileType,
): Promise<void> => {
  const filePath = `${RNFS.DocumentDirectoryPath}/${filename}.${extension}`;
  try {
    await RNFS.writeFile(filePath, content, 'utf8');
    logger.log(`saved file: ${filename}`);
  } catch (error) {
    logger.error(`cannot save file: ${filename} - ${error}`);
  }
};

export const readFile = async (filename: string): Promise<FileData | null> => {
  try {
    const filePath = `${RNFS.DocumentDirectoryPath}/${filename}`;
    const fileContent = await RNFS.readFile(filePath, 'utf8');
    const extension = filename.split('.').pop() as FileType;
    return {extension, content: fileContent};
  } catch (error) {
    logger.error(`cannot read file: ${filename} - ${error}`);
    return null;
  }
};

export default {
  FileType,
  saveFile,
  readFile,
};
