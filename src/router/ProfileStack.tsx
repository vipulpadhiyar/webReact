import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AppScreens} from '~/constants';
import {
  AppPermissionScreen,
  ChangePasswordScreen,
  EditProfileScreen,
  FAQScreen,
  PrivacyPolicyScreen,
  ProfileScreen,
  TermsAndConditionScreen,
} from '~/screens';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileStack = (): React.JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName={AppScreens.ProfileScreen} // Initial route name
      screenOptions={{headerShown: false, animation: 'ios'}}>
      <Stack.Screen name={AppScreens.ProfileScreen} component={ProfileScreen} />
      <Stack.Screen
        name={AppScreens.ChangePasswordScreen}
        component={ChangePasswordScreen}
      />
      <Stack.Screen
        name={AppScreens.TermsAndConditionScreen}
        component={TermsAndConditionScreen}
      />
      <Stack.Screen
        name={AppScreens.PrivacyPolicyScreen}
        component={PrivacyPolicyScreen}
      />
      <Stack.Screen name={AppScreens.FAQScreen} component={FAQScreen} />
      <Stack.Screen
        name={AppScreens.EditProfileScreen}
        component={EditProfileScreen}
      />
      <Stack.Screen
        name={AppScreens.AppPermissionScreen}
        component={AppPermissionScreen}
      />
    </Stack.Navigator>
  );
};
