/* This code snippet is a TypeScript React component for a sign-in screen. It imports various
components and constants needed for the sign-in screen, such as buttons, text inputs, checkboxes,
colors, fonts, and images. */
import React from 'react';
import {Keyboard, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {AppButton, AppScreen, AppTextInput} from '~/components';
import {IcPassLock} from '~/constants';
import {translate} from '~/localization';

import {useChangePasswordController} from './changePasswordConroller';
import styles from './styles';

export const ChangePasswordScreen = () => {
  /* The code snippet `const { oldPasswordInputRef, newPasswordInputRef, confrimPasswordInputRef,
  formik, onBack } = useChangePasswordController();` is using object destructuring to extract
  specific values returned from the `useChangePasswordController` hook. */
  const {
    oldPasswordInputRef,
    newPasswordInputRef,
    confirmPasswordInputRef,
    formik,
    onBack,
  } = useChangePasswordController();
  /**
   * The `handleSubmit` function dismisses the keyboard and triggers the submission of a form using
   * Formik in a TypeScript React application.
   */
  const handleSubmit = () => {
    Keyboard.dismiss();
    formik.handleSubmit();
  };

  const handlePasswordSubmit = () => newPasswordInputRef.current?.focus();
  const handleNewPasswordSubmit = () =>
    confirmPasswordInputRef.current?.focus();

  return (
    <AppScreen header={translate('ChangePassword')} onBack={onBack}>
      <View style={styles.subContainer}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardView}>
            <AppTextInput
              autoCapitalize="none"
              inputIcon={IcPassLock}
              inputRef={oldPasswordInputRef}
              value={formik.values.oldPassword}
              labelText={translate('OldPassword')}
              onChangeText={formik.handleChange('oldPassword')}
              errorText={
                formik.touched.oldPassword && formik.errors.oldPassword
                  ? formik.errors.oldPassword
                  : ''
              }
              placeholder={translate('AddOldPassword')}
              keyboardType="default"
              isPassword
              returnKeyType="next"
              onSubmitEditing={handlePasswordSubmit}
            />
            <AppTextInput
              autoCapitalize="none"
              inputIcon={IcPassLock}
              inputRef={newPasswordInputRef}
              containerStyle={styles.inputContainerStyle}
              value={formik.values.newPassword}
              labelText={translate('NewPassword')}
              onChangeText={formik.handleChange('newPassword')}
              isPassword
              errorText={
                formik.touched.newPassword && formik.errors.newPassword
                  ? formik.errors.newPassword
                  : ''
              }
              placeholder={translate('AddNewPassword')}
              keyboardType="default"
              returnKeyType="next"
              onSubmitEditing={handleNewPasswordSubmit}
            />
            <AppTextInput
              autoCapitalize="none"
              inputIcon={IcPassLock}
              inputRef={confirmPasswordInputRef}
              value={formik.values.confirmPassword}
              labelText={translate('ConfirmPassword')}
              containerStyle={styles.inputContainerStyle}
              onChangeText={formik.handleChange('confirmPassword')}
              isPassword
              errorText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? formik.errors.confirmPassword
                  : ''
              }
              placeholder={translate('ConfirmNewPassword')}
              keyboardType="default"
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />
          </View>
        </KeyboardAwareScrollView>
        <AppButton
          disabled={!formik.isValid}
          text={translate('Submit')}
          onPress={handleSubmit}
          containerStyle={styles.submit}
        />
      </View>
    </AppScreen>
  );
};
