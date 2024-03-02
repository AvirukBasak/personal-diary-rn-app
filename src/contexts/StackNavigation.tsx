import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomePage from '../pages/HomePage';
import DiaryEntryPage from '../pages/DiaryEntryPage';

// Initialize the Stack navigator
const Stack = createNativeStackNavigator();

export default function StackNavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="DiaryEntryPage" component={DiaryEntryPage} />
      </Stack.Navigator>
      {children}
    </NavigationContainer>
  );
}
