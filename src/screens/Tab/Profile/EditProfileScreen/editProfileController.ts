import {useEffect, useRef, useState} from 'react';
import {Keyboard} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {useFormik} from 'formik';

import {QueryKeys} from '~/constants';
import Loader from '~/helpers/Loader';
import {translate} from '~/localization';
import {queryClient} from '~/store';
import {useEditProfileAction, useMyProfileApiAction} from '~/store/profile';
import {showError, showSuccess} from '~/utils';
import {EditProfileSchema} from '~/validation/profile';

/**
 * The `useEditProfileController` custom hook is used to handle editing profile functionality in a
 * TypeScript application.
 * @returns The `useEditProfileController` custom hook is returning an object with the following
 * properties:
 */
export const useEditProfileController = () => {
  const navigation = useNavigation<NavigationProp<ProfileStackParamList>>();

  const {mutateAsync: editProfile} = useEditProfileAction();
  const {data: userData, refetch} = useMyProfileApiAction();
  const [isEditable, setIsEditable] = useState<boolean>(false);

  /* The `useFormik` function is being used to create a formik instance for handling form state,
validation, and submission in a TypeScript application. */
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validationSchema: EditProfileSchema,
    onSubmit: (values: EditProfileFormParamsType) => onSubmitHandler(values),
  });

  /**
   * Hook to determine if the screen is currently focused.
   */
  const isFocused = useIsFocused();
  /**
   * Effect to refetch data when the screen gains focus.
   */
  useEffect(() => {
    refetch();
  }, [isFocused]);
  /**
   * Effect to update form fields when user data changes.
   */
  useEffect(() => {
    if (userData) {
      formik.setFieldValue('firstName', userData?.firstName);
      formik.setFieldValue('lastName', userData?.lastName);
      formik.setFieldValue('email', userData?.email);
    }
  }, [userData]);
  /* The code snippet `const firstNameInputRef = useRef<TextInput>();`, `const lastNameInputRef =
 useRef<TextInput>();`, and `const emailInputRef = useRef<TextInput>();` are creating three separate
 references using the `useRef` hook in React. */
  const firstNameInputRef = useRef<TextInput>();
  const lastNameInputRef = useRef<TextInput>();
  const emailInputRef = useRef<TextInput>();

  /**
   * The onSubmitHandler function handles form submission for editing a user's profile, making an API
   * request and displaying relevant messages accordingly.
   * @param {EditProfileFormParamsType} values - The `values` parameter in the `onSubmitHandler`
   * function contains the following properties:
   */
  const onSubmitHandler = async (values: EditProfileFormParamsType) => {
    Keyboard.dismiss();
    let req: EditProfileRequest = {
      firstName: values.firstName,
      lastName: values.lastName,
    };
    Loader.showLoader();
    try {
      let response = await editProfile(req);
      Loader.hideLoader();
      if (response) {
        showSuccess(translate(response.message));
        setTimeout(() => {
          queryClient.invalidateQueries({queryKey: [QueryKeys.getUserProfile]});
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
    firstNameInputRef,
    lastNameInputRef,
    emailInputRef,
    isEditable,
    setIsEditable,
    onBack,
  };
};
