import React from 'react';
import {Keyboard, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {AppButton, AppScreen, AppTextInput} from '~/components';
import {AppColors, IcEmail, IcUser} from '~/constants';
import {translate} from '~/localization';

import {useEditProfileController} from './editProfileController';
import styles from './styles';

export const EditProfileScreen = () => {
  /* The code snippet is using object destructuring to extract specific values from the return object of
 the `useEditProfileController` hook. Here's what each extracted value represents: */

  const {
    formik,
    emailInputRef,
    firstNameInputRef,
    lastNameInputRef,
    onBack,
    setIsEditable,
    isEditable,
  } = useEditProfileController();
  /**
   * The `handleSubmit` function dismisses the keyboard and triggers the submission of a form using
   * Formik in a TypeScript React application.
   */
  const handleSubmit = () => {
    Keyboard.dismiss();
    formik.handleSubmit();
  };

  const setEdit = () => setIsEditable(true);

  return (
    <AppScreen header={translate('MyProfile')} onBack={onBack}>
      <View style={styles.subContainer}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.keyboardScrollView}>
          <View style={styles.CardView}>
            <AppTextInput
              autoCapitalize="none"
              editable={isEditable}
              inputIcon={IcUser}
              inputRef={firstNameInputRef}
              value={formik.values.firstName}
              subContainerStyle={{
                backgroundColor: isEditable
                  ? AppColors.inputBackground
                  : AppColors.inputDisable,
              }}
              labelText={translate('FirstName')}
              onChangeText={formik.handleChange('firstName')}
              errorText={
                formik.touched.firstName && formik.errors.firstName
                  ? formik.errors.firstName
                  : ''
              }
              placeholder={translate('EnterFirstName')}
              keyboardType="default"
              returnKeyType="next"
            />
            <AppTextInput
              autoCapitalize="none"
              inputIcon={IcUser}
              editable={isEditable}
              inputRef={lastNameInputRef}
              containerStyle={styles.inputContainerStyle}
              subContainerStyle={{
                backgroundColor: isEditable
                  ? AppColors.inputBackground
                  : AppColors.inputDisable,
              }}
              value={formik.values.lastName}
              labelText={translate('LastName')}
              onChangeText={formik.handleChange('lastName')}
              errorText={
                formik.touched.lastName && formik.errors.lastName
                  ? formik.errors.lastName
                  : ''
              }
              placeholder={translate('EnterLastName')}
              keyboardType="default"
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />
            <AppTextInput
              autoCapitalize="none"
              editable={false}
              inputIcon={IcEmail}
              inputRef={emailInputRef}
              value={formik.values.email?.toLowerCase()}
              labelText={translate('Email')}
              containerStyle={styles.inputContainerStyle}
              subContainerStyle={{
                backgroundColor: AppColors.inputDisable,
              }}
              onChangeText={formik.handleChange('email')}
              errorText={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ''
              }
              placeholder={translate('AddEmailAddress')}
              keyboardType="default"
            />
          </View>
          {isEditable ? (
            <AppButton
              text={translate('SaveProfile')}
              onPress={handleSubmit}
              containerStyle={styles.submit}
            />
          ) : (
            <AppButton
              text={translate('EditProfile')}
              onPress={setEdit}
              containerStyle={styles.submit}
            />
          )}
        </KeyboardAwareScrollView>
      </View>
    </AppScreen>
  );
};
