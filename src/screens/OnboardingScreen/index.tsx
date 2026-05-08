import React from 'react';
import {Image, StatusBar, View} from 'react-native';

import {AppButton} from '~/components';
import {AppColors, AppPngImages} from '~/constants';
import {translate as t} from '~/localization';

import {useOnBoardingController} from './onboardingController';
import styles from './styles';

export const OnboardingScreen = () => {
  /* The line `const {onCreateAccount, onSignInPress} = useOnBoardingController();` is using object
  destructuring to extract the `onCreateAccount` and `onSignInPress` functions from the return value
  of the `useOnBoardingController` hook. */

  const {onCreateAccount, onSignInPress} = useOnBoardingController();

  return (
    <View style={styles.screen}>
      <StatusBar
        backgroundColor={AppColors.peanBlue}
        barStyle={'light-content'}
      />
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Image
            source={AppPngImages.ImgLogo}
            style={styles.imgLogo}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles.bottomContainer}>
          <AppButton
            text={t('CreateAccount')}
            containerStyle={styles.btnOneContainer}
            textColor={AppColors.white}
            onPress={onCreateAccount}
          />
          <AppButton
            text={t('SignIn')}
            containerStyle={styles.btnTwoContainer}
            onPress={onSignInPress}
            textColor={AppColors.peanBlue}
          />
        </View>
      </View>
    </View>
  );
};
