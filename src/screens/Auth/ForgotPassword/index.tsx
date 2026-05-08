/* This code snippet is a TypeScript React component for a sign-in screen. It imports various
components and constants needed for the sign-in screen, such as buttons, text inputs, checkboxes,
colors, fonts, and images. */
import React from 'react';
import {Keyboard, View} from 'react-native';

import {AppButton, AppSvgButton, AppText, AppTextInput} from '~/components';
import {
  AppFonts,
  AppFontSizes,
  ForgotPasswordTestKeys,
  IcBackArrow,
  IcEmail,
} from '~/constants';
import {translate} from '~/localization';

import {useForgotPasswordController} from './forgotPasswordController';
import styles from './styles';

export const ForgotPasswordScreen = () => {
  const {emailInputRef, formik, onBack} = useForgotPasswordController();

  /**
   *  The `handleSubmit` function dismisses the keyboard and triggers the submission of a form using
   * Formik in a TypeScript React application.
   */
  const handleSubmit = () => {
    Keyboard.dismiss();
    formik.handleSubmit();
  };
  return (
    <View
      style={styles.screen}
      testID={ForgotPasswordTestKeys.FORGOT_PASSWORD_SCREEN}>
      <View style={styles.header}>
        <AppSvgButton
          icon={IcBackArrow}
          containerStyle={styles.back}
          onPress={onBack}
        />
        <AppText
          text={translate('ForgotPassword')}
          fontFamily={AppFonts.GentiumBasic_Bold}
          fontSize={AppFontSizes[24]}
          containerStyle={styles.headerText}
        />
      </View>
      <View style={styles.subContainer}>
        <View style={styles.emailView}>
          <AppTextInput
            testID={ForgotPasswordTestKeys.EMAIL}
            inputIcon={IcEmail}
            autoCapitalize="none"
            inputRef={emailInputRef}
            value={formik.values.email.toLowerCase()}
            labelText={translate('Email')}
            onChangeText={formik.handleChange('email')}
            errorText={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ''
            }
            placeholder={translate('AddEmailAddress')}
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={handleSubmit}
          />
        </View>
        <AppButton
          disabled={!formik.isValid}
          testID={ForgotPasswordTestKeys.CONTINUE}
          text={translate('Continue')}
          onPress={handleSubmit}
          containerStyle={styles.continue}
        />
      </View>
    </View>
  );
};
