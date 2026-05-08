import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  AppColors,
  AppScreens,
  AppSpacing,
  IcTabHomeActive,
  IcTabHomeInActive,
  IcTabHPActive,
  IcTabHPInactive,
  IcTabProfileActive,
  IcTabProfileInActive,
  IcTabQuoteActive,
  IcTabQuoteInactive,
  IcTabTripActive,
  IcTabTripInactive,
} from '~/constants';

import {HomeScreenTabStack} from './HomeScreenTabStack';
import {HorseProfileStack} from './HorseProfileStack';
import {MyTripsStack} from './MyTripsStack';
import {ProfileStack} from './ProfileStack';
import {QuotesStack} from './QuotesStack';

const Tab = createBottomTabNavigator<BottomTabStackParamList>();

/* This code snippet is defining a functional component named `BottomTabStack` that creates a bottom
tab navigation using `createBottomTabNavigator` from `@react-navigation/bottom-tabs`. */
export const AppTabStack = (): React.JSX.Element => {
  const {bottom} = useSafeAreaInsets();

  const renderHomeProfileIcon = ({focused}: {focused: boolean}) => {
    return focused ? <IcTabHomeActive /> : <IcTabHomeInActive />;
  };
  const renderHorseProfileIcon = ({focused}: {focused: boolean}) => {
    return focused ? <IcTabHPActive /> : <IcTabHPInactive />;
  };
  const renderMyTrip = ({focused}: {focused: boolean}) => {
    return focused ? <IcTabTripActive /> : <IcTabTripInactive />;
  };
  const renderQuote = ({focused}: {focused: boolean}) => {
    return focused ? <IcTabQuoteActive /> : <IcTabQuoteInactive />;
  };
  const renderProfileIcon = ({focused}: {focused: boolean}) => {
    return focused ? <IcTabProfileActive /> : <IcTabProfileInActive />;
  };

  return (
    <Tab.Navigator
      initialRouteName={AppScreens.HomeStack}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: AppColors.white,
        tabBarInactiveTintColor: AppColors.peanBlue,
        tabBarItemStyle: styles.tabItemStyle,
        tabBarStyle: [
          styles.tabStyle,
          {
            height:
              Platform.OS === 'ios'
                ? AppSpacing[48] + bottom
                : AppSpacing[60] + bottom,
          },
        ],
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name={AppScreens.HomeStack}
        component={HomeScreenTabStack}
        options={{
          tabBarIcon: renderHomeProfileIcon,
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name={AppScreens.MyTrips}
        component={MyTripsStack}
        options={{
          tabBarIcon: renderMyTrip,
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name={AppScreens.Quotes}
        component={QuotesStack}
        options={{
          tabBarIcon: renderQuote,
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name={AppScreens.HorseProfile}
        component={HorseProfileStack}
        options={{
          tabBarIcon: renderHorseProfileIcon,
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name={AppScreens.Profile}
        component={ProfileStack}
        options={{
          tabBarIcon: renderProfileIcon,
          tabBarLabel: '',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabStyle: {
    backgroundColor: AppColors.peanBlue,
    borderTopLeftRadius: AppSpacing[20],
    borderTopRightRadius: AppSpacing[20],
  },
  tabItemStyle: {
    marginTop: Platform.OS === 'ios' ? AppSpacing[30] : AppSpacing[10],
  },
});
