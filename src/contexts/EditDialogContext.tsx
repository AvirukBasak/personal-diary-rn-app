import React, {createContext, useState, useContext, useEffect} from 'react';
import {DialogBoxContext} from './DialogBoxContext';
import {View, TextInput, Button} from 'react-native';

const EditDialogContext = createContext({
  title: '',
  setDialogTitle: (title: string) => {
    title;
  },

  onEditCallback: (data: any) => {
    data;
  },
  setOnEditCallback: (callback: any) => {
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
  const [title, setDialogTitle] = useState('');
  const [onEditCallback, setOnEditCallback] = useState<any>(() => {});
  const {visible, setVisible, setContent} = useContext(DialogBoxContext);

  useEffect(() => {
    setContent(
      <View>
        <TextInput
          value={title}
          onChangeText={setDialogTitle}
          placeholder="Enter a new title"
        />
        <Button
          title="Save"
          onPress={() => {
            setVisible(false);
            onEditCallback && onEditCallback(title);
            setContent(<></>);
          }}
        />
      </View>,
    );
  }, [onEditCallback, setContent, title, setDialogTitle, visible, setVisible]);

  return (
    <EditDialogContext.Provider
      value={{
        title,
        setDialogTitle,
        onEditCallback,
        setOnEditCallback,
        visible,
        setShowEditDialog: setVisible,
      }}>
      {children}
    </EditDialogContext.Provider>
  );
}

export {EditDialogContext};
