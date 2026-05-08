import {MutableRefObject, useRef} from 'react';
import {TextInput} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {FormikProps, useFormik} from 'formik';

import {Role} from '~/enums';
import Loader from '~/helpers/Loader';
import {translate} from '~/localization';
import {useForgotPasswordAction} from '~/store';
import {showError, showSuccess} from '~/utils';
import {ForgotPasswordSchema} from '~/validation';
/**
 * The `useForgotPasswordController` function returns an object with formik, emailInputRef, and onBack
 * properties for handling forgot password functionality in a TypeScript application.
 * @returns The `useForgotPasswordController` hook returns an object with three properties:
 * 1. `formik`: FormikProps<ForgotPasswordFormParamsType> - Formik form props for handling form state
 * and validation.
 * 2. `emailInputRef`: MutableRefObject<TextInput | undefined> - Mutable reference to an email input
 * field.
 * 3. `onBack`: () => void - Function to navigate back
 */

interface IForgotPasswordController {
  formik: FormikProps<ForgotPasswordFormParamsType>;
  emailInputRef: MutableRefObject<TextInput | undefined>;
  onBack: () => void;
}

export const useForgotPasswordController = (): IForgotPasswordController => {
  /* The code snippet you provided is a custom hook called `useForgotPasswordController` that is used to
handle the forgot password functionality in a TypeScript application. Here is a breakdown of what
each part of the code is doing: */
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const {mutateAsync: forgotPassword} = useForgotPasswordAction();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values: ForgotPasswordFormParamsType) => onSubmitHandler(values),
  });

  const emailInputRef = useRef<TextInput>();

  /**
   * The onSubmitHandler function handles a forgot password request, displaying a loader while
   * processing and showing a snackbar message upon completion.
   * @param {ForgotPasswordFormParamsType} values - The `values` parameter in the `onSubmitHandler`
   * function is of type `ForgotPasswordFormParamsType`. This parameter likely contains the necessary
   * information for a user to reset their password, such as their email address.
   */
  const onSubmitHandler = async (values: ForgotPasswordFormParamsType) => {
    let req: ForgotPasswordRequestType = {
      email: values.email,
      role: Role.HO,
    };
    Loader.showLoader();
    try {
      let response = await forgotPassword(req);
      Loader.hideLoader();
      if (response) {
        showSuccess(translate(response.message)); //TODO Change to Alert
        setTimeout(() => {
          navigation.goBack();
        }, 1000);
      }
    } catch (error: any) {
      Loader.hideLoader();
      showError(error);
    }
  };
  /**
   * The `onBack` function is used to navigate back in a TypeScript application.
   */

  const onBack = () => {
    navigation.goBack();
  };
  return {
    formik,
    emailInputRef,
    onBack,
  };
};
