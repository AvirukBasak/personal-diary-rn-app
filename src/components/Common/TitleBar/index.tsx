/*

TitleBar structure
- Title on the left
- Edit icon on right extreme
- Takes a context to handle the value of the title

Context structure
- title: string
- openEditDialog: opens a dialog to edit the title
- setTitle: sets the title to the new value

*/

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

interface TitleBarProps {
  title: string;
  context: any;
}

export default function TitleBar({title, context}: TitleBarProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Icon
        name="edit"
        type="material"
        color="#517fa4"
        onPress={() => {
          context.openEditDialog();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
