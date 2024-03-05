import React from 'react';
import {AppRegistry, Platform, StatusBar, View} from 'react-native';
import DialogBoxProvider from './src/contexts/DialogBoxContext';
import EditDialogProvider from './src/contexts/EditDialogContext';
import StackNavigationProvider from './src/contexts/StackNavigation';
import DiaryEntryContextProvider from './src/contexts/DiaryEntryContext';

AppRegistry.registerComponent('ReactNativeTest2App', () => AppWithProviders);

if (Platform.OS === 'web') {
  const rootTag =
    document.getElementById('root') || document.getElementById('X');
  AppRegistry.runApplication('ReactNativeTest2App', {rootTag});
}

function App(): React.JSX.Element {
  return (
    <View>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
    </View>
  );
}

export default function AppWithProviders() {
  return (
    <StackNavigationProvider>
      <DialogBoxProvider>
        <EditDialogProvider>
          <DiaryEntryContextProvider>
            <App />
          </DiaryEntryContextProvider>
        </EditDialogProvider>
      </DialogBoxProvider>
    </StackNavigationProvider>
  );
}
