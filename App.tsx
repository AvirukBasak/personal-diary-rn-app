import React from 'react';
import {StatusBar, View, Button} from 'react-native';
import DialogBoxProvider, {
  DialogBoxContext,
} from './src/contexts/DialogBoxContext';
import DialogBox from './src/components/Common/DialogBox';

function App(): React.JSX.Element {
  const {visible, setVisible, setContent} = React.useContext(DialogBoxContext);
  return (
    <View>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      <Button
        title="Open Dialog"
        onPress={() => {
          setVisible(true);
          setContent(
            <Button title="Close Dialog" onPress={() => setVisible(false)} />,
          );
        }}
      />

      {visible && <DialogBox />}
    </View>
  );
}

export default function AppWithProviders() {
  return (
    <DialogBoxProvider>
      <App />
    </DialogBoxProvider>
  );
}
