import React from 'react';
import {Image, StatusBar, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {AppConfirmAlert, AppModal} from '~/components';
import {AppColors, AppPngImages} from '~/constants';
import {InitialAuthTab} from '~/enums';
import {translate} from '~/localization';

import {ToggleTabBar} from './components/ToggleTabBar';
import {useTabController} from './authTabcontroller';
import {SignInScreen} from './SignInScreen';
import {SignUpScreen} from './SignUpScreen';
import {styles} from './styles';

export const AuthScreen = () => {
  /* `useTabController` is a custom hook that is used to manage the state of
  the current tab in the `AuthScreen` component.  */
  const {
    isTab,
    modalPermissionRef,
    setIsTab,
    onContinue,
    closeModalPermission,
  } = useTabController();

  return (
    <>
      <StatusBar
        backgroundColor={AppColors.peanBlue}
        barStyle={'light-content'}
      />
      <View style={styles.container}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          {/* <SafeAreaView> */}
          <View style={styles.subContainer}>
            <Image
              source={AppPngImages.ImgLogo}
              style={styles.imgLogo}
              resizeMode={'contain'}
            />
          </View>
          <View style={styles.bottomContainer}>
            {/* toggle the Tab bar */}
            <ToggleTabBar isTab={isTab} setIsTab={setIsTab} />

            {/* Render the signin and signup Form screen */}
            {isTab === InitialAuthTab.CREATE_ACCOUNT ? (
              <SignUpScreen />
            ) : (
              <SignInScreen />
            )}
          </View>
          {/* </SafeAreaView> */}
        </KeyboardAwareScrollView>
        <AppModal ref={modalPermissionRef}>
          <AppConfirmAlert
            title={translate('AllowPermission')}
            message={translate('RequireNotification')}
            leftBtnText={translate('Continue')}
            rightBtnText={translate('Cancel')}
            onRightPress={closeModalPermission}
            onLeftPress={onContinue}
          />
        </AppModal>
      </View>
    </>
  );
};
