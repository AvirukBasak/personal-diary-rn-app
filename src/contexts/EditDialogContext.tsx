import React, {createContext, useState, useContext} from 'react';
import {DialogBoxContext} from './DialogBoxContext';
import {View, TextInput, Button} from 'react-native';
import logger from '../utis/logger';

const EditDialogContext = createContext({
  title: '',
  setEditDialogTitle: (title: string) => {
    title;
  },

  onEditCallback: (data: any) => {
    data;
  },
  setOnEditCallback: (callback: (data: any) => void) => {
    callback;
  },

  visible: false,
  setShowEditDialog: (visible: boolean) => {
    visible;
  },
});

/**
 * @example
 * ```
 * <EditDialogProvider>
 *  <App />
 * </EditDialogProvider>
 * ```
 */
export default function EditDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [title, setEditDialogTitle] = useState('');

  const [onEditCallback, setOnEditCallback] = useState<(data: any) => void>(
    (data: any) => {
      data;
    },
  );

  const {visible, setVisible, setContent} = useContext(DialogBoxContext);

  function setShowEditDialog(vis: boolean) {
    logger.log('edit dialog context: setShowEditDialog', vis);
    setContent(
      <View>
        <TextInput
          value={title}
          onChangeText={setEditDialogTitle}
          placeholder="Enter a new title"
        />
        <Button
          title="Save"
          onPress={() => {
            onEditCallback && onEditCallback(title);
            setContent(<></>);
            setVisible(false);
          }}
        />
      </View>,
    );
    setVisible(vis);
  }

  return (
    <EditDialogContext.Provider
      value={{
        title,
        setEditDialogTitle,

        onEditCallback,
        setOnEditCallback,

        visible,
        setShowEditDialog,
      }}>
      {children}
    </EditDialogContext.Provider>
  );
}

export {EditDialogContext};
