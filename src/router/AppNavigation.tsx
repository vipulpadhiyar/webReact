import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AppScreens} from '~/constants';
import {SplashScreen} from '~/screens';

import {AppTabStack} from './AppTab';
import {AuthStack} from './AuthStack';
import {HorseAddStack} from './HorseProfileStack';

/**
 * Represents the main navigator of the application.
 * @returns {JSX.Element} - React element.
 *
 * @exports AppNavigator - Main navigator component.
 */
export const AppNavigator = (): React.JSX.Element => {
  // Create a native stack navigator
  const Stack = createNativeStackNavigator();

  return (
    // Navigator for the main app screens
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'ios'}}>
      <Stack.Screen name={AppScreens.SplashScreen} component={SplashScreen} />

      <Stack.Screen name={AppScreens.AuthStack} component={AuthStack} />

      <Stack.Screen name={AppScreens.HorseAddStack} component={HorseAddStack} />

      <Stack.Screen name={AppScreens.AppTab} component={AppTabStack} />
    </Stack.Navigator>
  );
};
