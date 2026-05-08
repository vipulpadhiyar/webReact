import React from 'react';
import {RefreshControl, View} from 'react-native';

import {AppButton, AppModal, AppScreen, AppScrollView} from '~/components';
import {AppColors, AppFonts, AppFontSizes} from '~/constants';
import {translate} from '~/localization';

import Avatar from './components/Avatar';
import {LogOutModal} from './components/LogOutModal';
import {styles} from './styles';
import {useUserProfileController} from './userProfileContoller';

export const ProfileScreen = () => {
  /* The code snippet `const { ... } = useUserProfileController();` is using object destructuring to
  extract specific functions and data from the `useUserProfileController` hook. Here's a breakdown
  of what each extracted item represents: */

  const {
    changePasswordHandler,
    termsAndConditionHandler,
    myProfileHandler,
    faqHandler,
    appPermissionHandler,
    privacyPolicyHandler,
    logOut,
    userData,
    getInitials,
    modalRef,
    isFetching,
    onConfirm,
    onCancel,
    onRefresh,
  } = useUserProfileController();

  return (
    <AppScreen header={translate('MyProfile')} headerStyle={styles.header}>
      <>
        {/* Logout popup */}
        <AppModal ref={modalRef}>
          <LogOutModal
            message={translate('AreyousureyouwanttoLogout')}
            header={translate('LogOut')}
            onCancel={onCancel}
            onConfirm={onConfirm}
          />
        </AppModal>

        <AppScrollView
          style={styles.subContainer}
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
          }>
          <View style={styles.content}>
            {/* Avatar */}
            <Avatar
              name={`${userData?.firstName} ${userData?.lastName}`}
              getInitials={getInitials}
            />

            <AppButton
              containerStyle={styles.buttonStyle}
              text={translate('MyProfile')}
              textColor={AppColors.peanBlue}
              textFontFamily={AppFonts.GentiumBasic_Regular}
              textSize={AppFontSizes[20]}
              onPress={myProfileHandler}
            />
            <AppButton
              containerStyle={styles.buttonStyle}
              text={translate('ChangePassword')}
              textColor={AppColors.peanBlue}
              textFontFamily={AppFonts.GentiumBasic_Regular}
              textSize={AppFontSizes[20]}
              onPress={changePasswordHandler}
            />
            <AppButton
              containerStyle={styles.buttonStyle}
              text={translate('FAQ')}
              textColor={AppColors.peanBlue}
              textFontFamily={AppFonts.GentiumBasic_Regular}
              textSize={AppFontSizes[20]}
              onPress={faqHandler}
            />
            <AppButton
              containerStyle={styles.buttonStyle}
              text={translate('AppPermissions')}
              textColor={AppColors.peanBlue}
              textFontFamily={AppFonts.GentiumBasic_Regular}
              textSize={AppFontSizes[20]}
              onPress={appPermissionHandler}
            />
            <AppButton
              containerStyle={styles.buttonStyle}
              text={translate('Terms&Conditions')}
              textColor={AppColors.peanBlue}
              textFontFamily={AppFonts.GentiumBasic_Regular}
              textSize={AppFontSizes[20]}
              onPress={termsAndConditionHandler}
            />
            <AppButton
              containerStyle={styles.buttonStyle}
              text={translate('PrivacyPolicy')}
              textColor={AppColors.peanBlue}
              textFontFamily={AppFonts.GentiumBasic_Regular}
              textSize={AppFontSizes[20]}
              onPress={privacyPolicyHandler}
            />
            <AppButton
              containerStyle={styles.buttonStyle}
              text={translate('LogOut')}
              textColor={AppColors.peanBlue}
              textFontFamily={AppFonts.GentiumBasic_Regular}
              textSize={AppFontSizes[20]}
              onPress={logOut}
            />
          </View>
        </AppScrollView>
      </>
    </AppScreen>
  );
};
