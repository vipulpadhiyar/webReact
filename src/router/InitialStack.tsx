import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AppScreens} from '~/constants';
import OnboardingScreen from '~/screens/OnboardingScreen';

// Create a native stack navigator for the initial stack
const Stack = createNativeStackNavigator<InitialStackParamList>();

/**
 * Represents the initial stack of the application.
 * @returns {JSX.Element} - React element.
 *
 * @exports InitialStack - Initial stack component.
 */
export const InitialStack = (): React.JSX.Element => {
  return (
    // Navigator for the initial stack
    <Stack.Navigator
      initialRouteName={AppScreens.OnboardingScreen} // Initial route name
      screenOptions={{headerShown: false, animation: 'ios'}}>
      {/* Screen for the onboarding screen */}
      <Stack.Screen
        name={AppScreens.OnboardingScreen}
        component={OnboardingScreen}
      />
    </Stack.Navigator>
  );
};
