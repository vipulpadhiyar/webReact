/**
 * The `useSignInController` custom hook manages sign-in functionality in a TypeScript application,
 * handling form submission, user responses, and navigation.
 * @returns The `useSignInController` custom hook returns an object with the following properties and
 * functions:
 */
import {MutableRefObject, useEffect, useRef, useState} from 'react';
import {Keyboard} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {TextInput} from 'react-native-gesture-handler';
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {FormikProps, useFormik} from 'formik';

import {AppScreens} from '~/constants';
import {PlatformType, Role} from '~/enums';
import {Storage} from '~/helpers';
import Loader from '~/helpers/Loader';
import {translate} from '~/localization';
import {useSignInAction} from '~/store';
import {showError, showSuccess} from '~/utils';
import {getFCMToken} from '~/utils/fcmToken';
import {SignInSchema} from '~/validation';

interface ISignInController {
  formik: FormikProps<SignInFormParamsType>;
  emailInputRef: MutableRefObject<TextInput | undefined>;
  passwordInputRef: MutableRefObject<TextInput | undefined>;
  rememberMe: boolean;
  navigateToForgotPassword: () => void;
  setRememberMe: (value: boolean) => void;
}

export const useSignInController = (): ISignInController => {
  /* The code snippet you provided is a custom hook named `useSignInController` that is used to manage
the sign-in functionality in a TypeScript application. Let's break down the key parts of the code: */
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [rememberMe, setRememberMe] = useState(false);

  const {mutateAsync: signIn} = useSignInAction();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignInSchema,
    onSubmit: (values: SignInFormParamsType) => onSubmitHandler(values),
  });

  const emailInputRef = useRef<TextInput>();
  const passwordInputRef = useRef<TextInput>();

  /* The `useEffect` hook in the code snippet is responsible for setting the initial form values for
 email and password fields when the component mounts or when there is a change in the `error` state
 variable. */
  useEffect(() => {
    let loginData = Storage.getLoginData();
    if (loginData) {
      formik.setFieldValue('email', loginData.email);
      formik.setFieldValue('password', loginData.password);
      setRememberMe(true);
      setTimeout(() => {
        //Logic for setting touched fields
        formik.setTouched({
          email: true,
          password: true,
        });
      }, 1000);
    }
  }, []);

  /**
   * The onSubmitHandler function handles form submission for signing in a user, including sending a
   * request to sign in, displaying a loader, and showing a success message or error.
   * @param {SignInFormParamsType} values - The `onSubmitHandler` function takes in a parameter `values`
   * of type `SignInFormParamsType`. This parameter likely contains the user input values for email and
   * password during a sign-in process. The function then extracts the email and password from the
   * `values` object, along with the device ID
   */
  const onSubmitHandler = async (values: SignInFormParamsType) => {
    Keyboard.dismiss();
    if (formik.isValid) {
      let deviceId = DeviceInfo.getDeviceId();
      const fcmToken = await getFCMToken();

      let req: SignInRequestType = {
        email: values.email,
        password: values.password,
        deviceId: deviceId,
        fcmToken: fcmToken ?? '',
        role: Role.HO,
        rememberMe: rememberMe,
        type: PlatformType.MOBILE,
      };
      Loader.showLoader();
      try {
        let response = await signIn(req);
        Loader.hideLoader();
        if (response) {
          showSuccess(translate('SignInSuccessfully'));
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
   * @param {SignInResponseType} response - The `response` parameter in the `handleUserResponse`
   * function is of type `SignInResponseType`. It is used to store the access token and user data
   * received after a user signs in.
   */
  const handleUserResponse = (response: SignInResponseType) => {
    Storage.setAccessToken(response.accessToken);
    Storage.setUserData(response);

    if (rememberMe) {
      Storage.setLoginData({
        email: formik.values.email,
        password: formik.values.password,
      });
    }
    navigateToAppTab();
  };

  const navigateToAppTab = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: AppScreens.AppTab, params: {}}],
      }),
    );
  };
  /**
   * The function `navigateToForgotPassword` is used to navigate to the Forgot Password screen in a
   * TypeScript application.
   */
  const navigateToForgotPassword = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: AppScreens.ForgotPasswordScreen,
        params: {},
      }),
    );
  };

  return {
    formik,
    emailInputRef,
    passwordInputRef,
    rememberMe,
    setRememberMe,
    navigateToForgotPassword,
  };
};
