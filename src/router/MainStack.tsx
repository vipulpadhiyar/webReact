import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AppScreens} from '~/constants';
import {MainScreen} from '~/screens';

// Create a native stack navigator for the main stack
const Stack = createNativeStackNavigator<MainStackParamList>();

/**
 * Represents the main stack of the application.
 * @returns {JSX.Element} - React element.
 *
 * @exports MainStack - Main stack component.
 */
export const MainStack = (): React.JSX.Element => {
  return (
    // Navigator for the main stack
    <Stack.Navigator
      initialRouteName={AppScreens.MainScreen} // Initial route name
      screenOptions={{headerShown: false, animation: 'ios'}}>
      {/* Screen for the main screen */}
      <Stack.Screen name={AppScreens.MainScreen} component={MainScreen} />
    </Stack.Navigator>
  );
};
