import AsyncStorage from '@react-native-async-storage/async-storage';

export const setValue = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log(`saved ${key}`);
  } catch (error) {
    console.error(`failed to save ${key} - ${error}`);
  }
};

export const getValue = async (key: string): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error(`failed to read ${key} - ${error}`);
    return null;
  }
};

export const removeValue = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`failed to remove ${key} - ${error}`);
  }
};

export const clearAll = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error(`failed to clear all - ${error}`);
  }
};

export const getAllKeys = async (prefix?: string): Promise<string[]> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    if (prefix) {
      return keys.filter(key => key.startsWith(prefix));
    }
    return keys.filter(key => key);
  } catch (error) {
    console.error(`failed to get all keys - ${error}`);
    return [];
  }
};

export const getAllDiaryEntries = async (): Promise<string[]> => {
  try {
    const keys = await getAllKeys('diaryEntry.');
    return keys;
  } catch (error) {
    console.error(`failed to get all diary entries - ${error}`);
    return [];
  }
};

export default {
  setValue,
  getValue,
  removeValue,
  clearAll,
  getAllKeys,
  getAllDiaryEntries,
};
