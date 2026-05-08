import React from 'react';
import {Keyboard, View} from 'react-native';

import {AppButton, AppCheckBox, AppText, AppTextInput} from '~/components';
import {
  AppColors,
  AppFonts,
  AppFontSizes,
  IcEmail,
  IcPassLock,
  IcUser,
  SignUpTestKeys,
} from '~/constants';
import {translate} from '~/localization';

import {useSignUpController} from './signUpcontroller';
import styles from './styles';

export const SignUpScreen = () => {
  /* The code snippet is using object destructuring to extract specific values returned from the
`useSignUpController` hook. Here's what each extracted value represents: */

  const {
    formik,
    emailInputRef,
    firstNameInputRef,
    lastNameInputRef,
    confirmPasswordInputRef,
    passwordInputRef,
    navigateToTAndC,
    navigateToPAndC,
  } = useSignUpController();
  const handleSubmit = () => {
    Keyboard.dismiss();
    formik.handleSubmit();
  };

  const handleFirstNameSubmit = () => lastNameInputRef.current?.focus();
  const handleLastNameSubmit = () => emailInputRef.current?.focus();
  const handleEmailSubmit = () => passwordInputRef.current?.focus();
  const handlePasswordSubmit = () => confirmPasswordInputRef.current?.focus();

  const handelTermsChecks = () =>
    formik.setFieldValue('termsChecked', !formik.values.termsChecked);

  return (
    <View testID={SignUpTestKeys.CREATE_ACCOUNT_SCREEN}>
      {/* FirstName */}
      <AppTextInput
        testID={SignUpTestKeys.FIRST_NAME}
        errorTestId={SignUpTestKeys.FIRST_NAME}
        inputIcon={IcUser}
        inputRef={firstNameInputRef}
        value={formik.values.firstName}
        labelText={translate('FirstName')}
        containerStyle={styles.inputContainerStyle}
        onChangeText={formik.handleChange('firstName')}
        errorText={
          formik.touched.firstName && formik.errors.firstName
            ? formik.errors.firstName
            : ''
        }
        placeholder={translate('EnterFirstName')}
        keyboardType="default"
        returnKeyType="next"
        onSubmitEditing={handleFirstNameSubmit}
      />
      {/* LastName */}
      <AppTextInput
        testID={SignUpTestKeys.LAST_NAME}
        errorTestId={SignUpTestKeys.INPUT_LAST_NAME_ERROR}
        inputIcon={IcUser}
        inputRef={lastNameInputRef}
        value={formik.values.lastName}
        labelText={translate('LastName')}
        onChangeText={formik.handleChange('lastName')}
        errorText={
          formik.touched.lastName && formik.errors.lastName
            ? formik.errors.lastName
            : ''
        }
        containerStyle={styles.inputContainerStyle}
        placeholder={translate('EnterLastName')}
        returnKeyType="next"
        onSubmitEditing={handleLastNameSubmit}
      />
      {/* Email */}
      <AppTextInput
        testID={SignUpTestKeys.EMAIL}
        errorTestId={SignUpTestKeys.INPUT_EMAIL_ERROR}
        inputIcon={IcEmail}
        autoCapitalize="none"
        inputRef={emailInputRef}
        value={formik.values.email.toLowerCase()}
        labelText={translate('Email')}
        onChangeText={formik.handleChange('email')}
        errorText={
          formik.touched.email && formik.errors.email ? formik.errors.email : ''
        }
        containerStyle={styles.inputContainerStyle}
        placeholder={translate('AddEmailAddress')}
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={handleEmailSubmit}
      />
      {/* Password */}
      <AppTextInput
        testID={SignUpTestKeys.PASSWORD}
        errorTestId={SignUpTestKeys.INPUT_PASSWORD_ERROR}
        inputIcon={IcPassLock}
        inputRef={passwordInputRef}
        value={formik.values.password}
        labelText={translate('Password')}
        onChangeText={formik.handleChange('password')}
        errorText={
          formik.touched.password && formik.errors.password
            ? formik.errors.password
            : ''
        }
        containerStyle={styles.inputContainerStyle}
        placeholder={translate('AddPassword')}
        isPassword={true}
        returnKeyType="next"
        onSubmitEditing={handlePasswordSubmit}
      />
      {/* Confirm Password */}
      <AppTextInput
        testID={SignUpTestKeys.CONFIRM_PASSWORD}
        errorTestId={SignUpTestKeys.INPUT_CONFIRM_PASSWORD_ERROR}
        inputIcon={IcPassLock}
        inputRef={confirmPasswordInputRef}
        value={formik.values.confirmPassword}
        labelText={translate('ConfirmPassword')}
        onChangeText={formik.handleChange('confirmPassword')}
        errorText={
          formik.touched.confirmPassword && formik.errors.confirmPassword
            ? formik.errors.confirmPassword
            : ''
        }
        containerStyle={styles.inputContainerStyle}
        placeholder={translate('AddPassword')}
        isPassword={true}
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
      />
      {/* Agree to Terms and Condition */}
      <View style={styles.tAndcContainer}>
        <AppCheckBox
          isSelected={formik.values.termsChecked}
          style={styles.checkBoxStyle}
          onPress={handelTermsChecks}
        />
        <AppText
          text={translate('IHaveAgreeToThe')}
          fontFamily={AppFonts.GentiumBasic_Regular}
          fontColor={AppColors.peanBlue}
          fontSize={AppFontSizes[14]}>
          <AppText
            text={translate('Terms&Conditions')}
            containerStyle={styles.txtDecorationStyle}
            fontColor={AppColors.peanBlue}
            fontFamily={AppFonts.GentiumBasic_Regular}
            fontSize={AppFontSizes[14]}
            onPress={navigateToTAndC}
          />

          <AppText
            text={translate('and')}
            fontColor={AppColors.peanBlue}
            fontFamily={AppFonts.GentiumBasic_Regular}
            fontSize={AppFontSizes[14]}
          />
          <AppText
            text={translate('PrivacyPolicy')}
            containerStyle={styles.txtDecorationStyle}
            fontColor={AppColors.peanBlue}
            fontFamily={AppFonts.GentiumBasic_Regular}
            fontSize={AppFontSizes[14]}
            onPress={navigateToPAndC}
          />
        </AppText>
      </View>

      {/* Display error when user doesn't check the t&c */}
      <>
        {formik.touched.termsChecked && formik.errors.termsChecked && (
          <AppText
            text={String(formik.errors.termsChecked)}
            fontSize={AppFontSizes[14]}
            fontColor={AppColors.errorText}
            containerStyle={styles.tAndcErrorStyle}
          />
        )}
      </>
      <AppButton
        testID={SignUpTestKeys.CREATE_ACCOUNT}
        text={translate('CreateAccount')}
        containerStyle={styles.btnContainer}
        textColor={AppColors.white}
        onPress={handleSubmit}
      />
    </View>
  );
};
