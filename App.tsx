import React from 'react';
import {StatusBar, View} from 'react-native';
import DialogBoxProvider from './src/contexts/DialogBoxContext';
import EditDialogProvider from './src/contexts/EditDialogContext';
import StackNavigationProvider from './src/contexts/StackNavigation';

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
          <App />
        </EditDialogProvider>
      </DialogBoxProvider>
    </StackNavigationProvider>
  );
}
