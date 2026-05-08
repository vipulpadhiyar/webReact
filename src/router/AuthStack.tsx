import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AppScreens} from '~/constants';
import {
  AuthScreen,
  ForgotPasswordScreen,
  OnboardingScreen,
  PrivacyPolicyScreen,
  TermsAndConditionScreen,
} from '~/screens';

// Create a native stack navigator for the auth stack
const Stack = createNativeStackNavigator<AuthStackParamList>();

/**
 * Represents the auth stack of the application.
 * @returns {JSX.Element} - React element.
 *
 * @exports AuthStack - Auth stack component.
 */
export const AuthStack = (): React.JSX.Element => {
  return (
    // Navigator for the auth stack
    <Stack.Navigator
      initialRouteName={AppScreens.OnboardingScreen} // Initial route name
      screenOptions={{headerShown: false, animation: 'ios'}}>
      {/* Screen for the Auth screen */}
      <Stack.Screen name={AppScreens.AuthScreen} component={AuthScreen} />
      <Stack.Screen
        name={AppScreens.OnboardingScreen}
        component={OnboardingScreen}
      />
      <Stack.Screen
        name={AppScreens.ForgotPasswordScreen}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name={AppScreens.TermsAndConditionScreen}
        component={TermsAndConditionScreen}
      />
      <Stack.Screen
        name={AppScreens.PrivacyPolicyScreen}
        component={PrivacyPolicyScreen}
      />
    </Stack.Navigator>
  );
};
