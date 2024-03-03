import uuid from 'react-native-uuid';

export function randomCryptoUUID(): string {
  return uuid.v4().toString();
}
