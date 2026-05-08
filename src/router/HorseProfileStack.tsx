import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AppScreens} from '~/constants';
import {
  AddHorseScreen,
  EditHorseScreen,
  HorseDetailsScreen,
  HorseProfileScreen,
  ReviewHorseDetailsScreen,
} from '~/screens';

const Stack = createNativeStackNavigator<HorseProfileStackParamList>();

export const HorseProfileStack = (): React.JSX.Element => {
  return (
    <Stack.Navigator
      // initialRouteName={AppScreens.HorseProfileScreen} // Initial route name
      screenOptions={{headerShown: false, animation: 'ios'}}>
      <Stack.Screen
        name={AppScreens.HorseProfileScreen}
        component={HorseProfileScreen}
      />
      <Stack.Screen
        name={AppScreens.AddHorseProfileScreen}
        component={AddHorseScreen}
      />
      <Stack.Screen
        name={AppScreens.ReviewHorseDetailsScreen}
        component={ReviewHorseDetailsScreen}
      />
      <Stack.Screen
        name={AppScreens.HorseProfileDetailsScreen}
        component={HorseDetailsScreen}
      />
      <Stack.Screen
        name={AppScreens.EditHorseProfileScreen}
        component={EditHorseScreen}
      />
    </Stack.Navigator>
  );
};

export const HorseAddStack = (): React.JSX.Element => {
  return (
    <Stack.Navigator
      // initialRouteName={AppScreens.HorseProfileScreen} // Initial route name
      screenOptions={{headerShown: false, animation: 'ios'}}>
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
