import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AppScreens} from '~/constants';
import {
  AddHorseScreen,
  EditTripDetails,
  QuetosDetailsScreen,
  QuotesScreen,
  ReviewHorseDetailsScreen,
} from '~/screens';

const Stack = createNativeStackNavigator<QuotesStackParamList>();

export const QuotesStack = (): React.JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName={AppScreens.QuotesScreen} // Initial route name
      screenOptions={{headerShown: false, animation: 'ios'}}>
      <Stack.Screen name={AppScreens.QuotesScreen} component={QuotesScreen} />
      <Stack.Screen
        name={AppScreens.QuetosDetailsScreen}
        component={QuetosDetailsScreen}
      />
      <Stack.Screen
        name={AppScreens.EditTripDetails}
        component={EditTripDetails}
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
