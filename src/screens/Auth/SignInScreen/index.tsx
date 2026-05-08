/* This code snippet is a TypeScript React component for a sign-in screen. It imports various
components and constants needed for the sign-in screen, such as buttons, text inputs, checkboxes,
colors, fonts, and images. */
import React from 'react';
import {Keyboard, View} from 'react-native';

import {AppButton, AppText, AppTextInput} from '~/components';
import {AppCheckBox} from '~/components/AppCheckBox';
import {
  AppColors,
  AppFonts,
  AppFontSizes,
  IcEmail,
  IcPassLock,
  SignInTestKeys,
} from '~/constants';
import {translate} from '~/localization';

import {useSignInController} from './signIncontroller';
import styles from './styles';

export const SignInScreen = () => {
  /* The line `const {emailInputRef, passwordInputRef, formik, rememberMe, setRememberMe} =
useSignInController();` is using object destructuring to extract specific values from the return
object of the `useSignInController` hook. */
  const {
    emailInputRef,
    passwordInputRef,
    formik,
    rememberMe,
    setRememberMe,
    navigateToForgotPassword,
  } = useSignInController();

  /**
   * The `handleSubmit` function dismisses the keyboard and triggers the submission of a form using
   * Formik in a TypeScript React application.
   */
  const handleSubmit = () => {
    Keyboard.dismiss();
    formik.handleSubmit();
  };
  /**
   *  The `handleRememberMe` function toggles the `rememberMe` state variable, which is used to control
   */
  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };
  /**
   *   The `onSubmitEmail` function focuses on the password input field when the user submits the email
   * address.
   */
  const onSubmitEmail = () => passwordInputRef.current?.focus();
  return (
    <View testID={SignInTestKeys.SIGN_IN_SCREEN}>
      {/* Email */}
      <AppTextInput
        inputIcon={IcEmail}
        testID={SignInTestKeys.EMAIL}
        inputRef={emailInputRef}
        value={formik.values.email.toLowerCase()}
        labelText={translate('Email')}
        onChangeText={formik.handleChange('email')}
        errorText={
          formik.touched.email && formik.errors.email ? formik.errors.email : ''
        }
        autoCapitalize="none"
        containerStyle={styles.inputContainerStyle}
        placeholder={translate('AddEmailAddress')}
        keyboardType="email-address"
        returnKeyType="next"
        errorTestId={SignInTestKeys.INPUT_EMAIL_ERROR}
        onSubmitEditing={onSubmitEmail}
      />
      {/* Password */}
      <AppTextInput
        inputIcon={IcPassLock}
        testID={SignInTestKeys.PASSWORD}
        inputRef={passwordInputRef}
        value={formik.values.password}
        labelText={translate('Password')}
        onChangeText={formik.handleChange('password')}
        containerStyle={styles.inputContainerStyle}
        errorText={
          formik.touched.password && formik.errors.password
            ? formik.errors.password
            : ''
        }
        placeholder={translate('AddPassword')}
        returnKeyType="done"
        isPassword
        onSubmitEditing={handleSubmit}
        errorTestId={SignInTestKeys.INPUT_PASSWORD_ERROR}
      />

      <AppText
        text={translate('ForgotPassword') + ' ?'}
        fontFamily={AppFonts.GentiumBasic_Regular}
        fontSize={AppFontSizes[16]}
        fontColor={AppColors.peanBlue}
        containerStyle={styles.forgotPassword}
        onPress={navigateToForgotPassword}
      />

      <AppCheckBox
        isSelected={rememberMe}
        onPress={handleRememberMe}
        labelText={translate('RememberMe')}
        style={styles.rememberMe}
      />
      <AppButton
        text={translate('SignIn')}
        onPress={handleSubmit}
        testID={SignInTestKeys.SIGN_IN}
        containerStyle={styles.signInBtn}
      />
    </View>
  );
};
