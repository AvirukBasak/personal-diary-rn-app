/*

DialogBox structure
- Takes children to display the content of the dialog
- Is centered on the screen
- Clicking outside the dialog closes it

The DialogBox component should be a child of the App component.

*/

import React from 'react';
import {useContext} from 'react';
import {View, StyleSheet, Modal, TouchableWithoutFeedback} from 'react-native';
import {DialogBoxContext} from '../../../contexts/DialogBoxContext';

export default function DialogBox() {
  const {visible, setVisible, content} = useContext(DialogBoxContext);

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>{content}</View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
