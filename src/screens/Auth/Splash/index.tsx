import React from 'react';
import {StatusBar, View} from 'react-native';

import {AppColors, ImgMSRLogo} from '~/constants';

import styles from './styles';
import {useSplashController} from './useSplashController';
/**
 *  @description This is the splash screen component
 *  @returns React component
 */
export const SplashScreen = () => {
  const {} = useSplashController();

  return (
    <View style={styles.screen}>
      <StatusBar
        backgroundColor={AppColors.peanBlue}
        barStyle={'light-content'}
      />
      <View style={styles.logoContainer}>
        <ImgMSRLogo />
      </View>
    </View>
  );
};
