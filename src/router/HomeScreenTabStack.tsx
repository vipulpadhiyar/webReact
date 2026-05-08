import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AppScreens} from '~/constants';
import {AddHorseScreen, HomeScreen, ReviewHorseDetailsScreen} from '~/screens';
import {NotificationScreen} from '~/screens';

const Stack = createNativeStackNavigator<HomeScreenStackParamList>();
/**
 *  Home Stack
 *  This stack contains all the screens related to home stack
 *  @returns {React.JSX.Element} - Home Stack
 */
export const HomeScreenTabStack = (): React.JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName={AppScreens.HomeScreen} // Initial route name
      screenOptions={{
        headerShown: false,
        animation: 'ios',
        gestureEnabled: true,
      }}>
      <Stack.Screen name={AppScreens.HomeScreen} component={HomeScreen} />
      <Stack.Screen
        name={AppScreens.NotificationScreen}
        component={NotificationScreen}
      />
      <Stack.Screen
        name={AppScreens.AddHorseProfileScreen}
        component={AddHorseScreen}
      />
      <Stack.Screen
        name={AppScreens.ReviewHorseDetailsScreen}
        component={ReviewHorseDetailsScreen}
      />
    </Stack.Navigator>
  );
};
