/*

Launches a dialog using DialogBoxContext with an text input to edit the title and a button to save the changes.

*/

import React from 'react';
import {useContext} from 'react';
import {View, Button, TextInput} from 'react-native';
import {DialogBoxContext} from '../../../contexts/DialogBoxContext';
import {EditDialogContext} from '../../../contexts/EditDialogContext';

export default function EditDialog() {
  const {setVisible, setContent} = useContext(DialogBoxContext);
  const {title, setDialogTitle, onEditCallback} = useContext(EditDialogContext);

  return (
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
    </View>
  );
}
