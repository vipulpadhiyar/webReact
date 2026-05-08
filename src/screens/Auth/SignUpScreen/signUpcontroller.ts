import {MutableRefObject, useEffect, useRef} from 'react';
import {TextInput} from 'react-native';
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {FormikProps, useFormik} from 'formik';

import {AppScreens} from '~/constants';
import {PlatformType} from '~/enums';
import {Storage} from '~/helpers';
import Loader from '~/helpers/Loader';
import {translate} from '~/localization';
import {useSignUpApiAction} from '~/store';
import {showError, showSuccess} from '~/utils';
import {getFCMToken} from '~/utils/fcmToken';
import {SignUpSchema} from '~/validation';

// Define the props type for the returned object
type SignUpController = {
  formik: FormikProps<SignUpFormParamsType>;
  emailInputRef: MutableRefObject<TextInput | undefined>;
  firstNameInputRef: MutableRefObject<TextInput | undefined>;
  lastNameInputRef: MutableRefObject<TextInput | undefined>;
  passwordInputRef: MutableRefObject<TextInput | undefined>;
  confirmPasswordInputRef: MutableRefObject<TextInput | undefined>;
  navigateToTAndC: () => void;
  navigateToPAndC: () => void;
};

/**
 * Custom hook for managing navigation and other functionalities related to signup.
 * @returns {void} - Object containing functions for navigation and other functionalities.
 * @exports useSignUpController - Hook for managing signup functionalities.
 */
export const useSignUpController = (): SignUpController => {
  /* Navigation Hook */
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const {mutateAsync: signUp, error} = useSignUpApiAction();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsChecked: false,
    },
    validationSchema: SignUpSchema,
    onSubmit: (values: SignUpFormParamsType) => onSubmitHandler(values),
  });

  const firstNameInputRef = useRef<TextInput>();
  const lastNameInputRef = useRef<TextInput>();
  const emailInputRef = useRef<TextInput>();
  const passwordInputRef = useRef<TextInput>();
  const confirmPasswordInputRef = useRef<TextInput>();

  useEffect(() => {}, [error]);

  /**
   * The onSubmitHandler function in TypeScript handles form submission, sends a signup request to an
   * API, and displays appropriate messages based on the response.
   * @param {SignUpFormParamsType} values - The `values` parameter in the `onSubmitHandler` function
   * contains the form data submitted by the user when signing up. It includes the following fields:
   */
  const onSubmitHandler = async (values: SignUpFormParamsType) => {
    if (formik.isValid) {
      formik.resetForm();
      const fcmToken = await getFCMToken();
      const payload: SignUpRequestType = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        fcmToken: fcmToken ?? '',
        deviceId: 'android',
        rememberMe: false,
        type: PlatformType.MOBILE,
      };

      // Call the API to authenticate the user and save
      Loader.showLoader();
      try {
        let response = await signUp(payload);
        if (response) {
          Loader.hideLoader();
          showSuccess(translate('SignUpSuccessfully'));
          setTimeout(() => {
            handleUserResponse(response);
          }, 1000);
        }
      } catch (err: any) {
        Loader.hideLoader();
        showError(err);
      }
    }
  };

  /**
   * The function `handleUserResponse` stores user data and access token in the storage, and optionally
   * saves login data if the user chooses to remember.
   * @param {SignUpController} response - The `response` parameter in the `handleUserResponse`
   * function is of type `SignInResponseType`. It is used to store the access token and user data
   * received after a user signs in.
   */
  const handleUserResponse = (response: SignUpResponseType) => {
    Storage.setAccessToken(response.accessToken);
    Storage.setUserData(response);
    navigateToAppTab();
  };

  const navigateToAppTab = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: AppScreens.HorseAddStack,
            state: {
              routes: [
                {
                  name: AppScreens.AddHorseProfileScreen,
                  params: {from: 'login'},
                },
              ],
            },
          },
        ],
      }),
    );
  };

  /**
   * The function `navigateToTAndC` navigates to the Terms and Conditions screen if the `navigation`
   * object is available.
   */
  const navigateToTAndC = () => {
    if (navigation) {
      navigation.navigate(AppScreens.TermsAndConditionScreen, {});
    }
  };

  /**
   * The function `navigateToPAndC` navigates to the Privacy Policy screen if the `navigation` object is
   * truthy.
   */

  const navigateToPAndC = () => {
    if (navigation) {
      navigation.navigate(AppScreens.PrivacyPolicyScreen, {});
    }
  };

  return {
    formik,
    firstNameInputRef,
    lastNameInputRef,
    emailInputRef,
    passwordInputRef,
    confirmPasswordInputRef,
    navigateToTAndC,
    navigateToPAndC,
  };
};
