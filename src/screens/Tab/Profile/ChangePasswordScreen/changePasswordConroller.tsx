import {MutableRefObject, useRef} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {FormikProps, useFormik} from 'formik';

import {logoutNavigation} from '~/helpers';
import Loader from '~/helpers/Loader';
import {translate} from '~/localization';
import {useChangePasswordAction} from '~/store/profile';
import {showError, showSuccess} from '~/utils';
import {ChangePasswordSchema} from '~/validation/changepassword';

interface IChangePasswordController {
  formik: FormikProps<ChangePasswordFormParamsType>;
  oldPasswordInputRef: MutableRefObject<TextInput | undefined>;
  newPasswordInputRef: MutableRefObject<TextInput | undefined>;
  confirmPasswordInputRef: MutableRefObject<TextInput | undefined>;
  onBack: () => void;
}
/* The code snippet you provided is a custom hook called `useChangePasswordController` that is used to
handle the ChangePassword functionality in a TypeScript application. Here is a breakdown of what
each part of the code is doing: */
export const useChangePasswordController = (): IChangePasswordController => {
  const navigation = useNavigation<NavigationProp<ProfileStackParamList>>();

  // useChangePasswordAction used to handle the changepassword api call
  const {mutateAsync: changePassword} = useChangePasswordAction();

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: (values: ChangePasswordFormParamsType) => onSubmitHandler(values),
  });

  const oldPasswordInputRef = useRef<TextInput>();
  const newPasswordInputRef = useRef<TextInput>();
  const confirmPasswordInputRef = useRef<TextInput>();

  /**
   * The onSubmitHandler function handles the submission of a change password form, making an
   * asynchronous request to change the password and displaying relevant messages to the user.
   * @param {ChangePasswordFormParamsType} values - The `values` parameter in the `onSubmitHandler`
   * function is of type `ChangePasswordFormParamsType`. This parameter likely contains the user input
   * values for changing the password, such as the old password and the new password.
   */
  const onSubmitHandler = async (values: ChangePasswordFormParamsType) => {
    let req: ChangePasswordRequestType = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };
    Loader.showLoader();
    try {
      let response = await changePassword(req);
      Loader.hideLoader();
      if (response) {
        showSuccess(translate(response.message));
        setTimeout(() => {
          logoutNavigation();
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
    oldPasswordInputRef,
    newPasswordInputRef,
    confirmPasswordInputRef,
    onBack,
  };
};
