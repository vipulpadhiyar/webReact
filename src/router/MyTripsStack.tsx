import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AppScreens} from '~/constants';
import {MyTripDetail, MyTripsScreen, TripStatus} from '~/screens';
import {ReviewScreen} from '~/screens/ReviewScreen';

const Stack = createNativeStackNavigator<MyTripsStackParamList>();
/**
 *  MyTrips Stack
 *  This stack contains all the screens related to MyTrips
 *  @returns {React.JSX.Element} - MyTrips Stack
 */
export const MyTripsStack = (): React.JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName={AppScreens.MyTripsScreen} // Initial route name
      screenOptions={{headerShown: false, animation: 'ios'}}>
      <Stack.Screen name={AppScreens.MyTripsScreen} component={MyTripsScreen} />
      <Stack.Screen
        name={AppScreens.MyTripDetailScreen}
        component={MyTripDetail}
      />
      <Stack.Screen name={AppScreens.TripStatusScreen} component={TripStatus} />
      <Stack.Screen name={AppScreens.ReviewScreen} component={ReviewScreen} />
    </Stack.Navigator>
  );
};
