import Geolocation from '@react-native-community/geolocation';
import logger from '../../../utis/logger';

import type {GeoLocationType} from './types.d.ts';

export function getGeoLocation(): Promise<GeoLocationType> {
  Geolocation.requestAuthorization(
    'whenInUse',
    (status: 'granted' | 'denied' | 'restricted' | 'undetermined') => {
      logger.log('getGeoLocation', status);
    },
  );

  const promise: Promise<GeoLocationType> = new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position: {coords: {longitude: any; latitude: any}}) => {
        const currentLongitude: string = JSON.stringify(
          position.coords.longitude,
        );
        const currentLatitude: string = JSON.stringify(
          position.coords.latitude,
        );
        resolve({currentLongitude, currentLatitude});
        logger.log('GeolocationButton', {currentLongitude, currentLatitude});
      },
      (error: {message: any}) => reject(error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  });
  return promise;
}
