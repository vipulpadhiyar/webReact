import {useEffect, useMemo, useRef} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {RefAppModalProps} from '~/components/AppModal';
import {AppScreens, QueryKeys} from '~/constants';
import {logoutNavigation, Storage} from '~/helpers';
import Loader from '~/helpers/Loader';
import {translate} from '~/localization';
import {queryClient} from '~/store';
import {useLogOutAction, useMyProfileApiAction} from '~/store/profile';
import {showError, showSuccess} from '~/utils';

export const useUserProfileController = () => {
  /* The code snippet you provided is a custom hook called `useUserProfileController` that is used to
handle the userProfile functionality in a TypeScript application. Here is a breakdown of what
each part of the code is doing: */
  const navigation = useNavigation<NavigationProp<ProfileStackParamList>>();

  const {data: userData, isFetching, refetch} = useMyProfileApiAction();
  const {mutateAsync: logoutUser} = useLogOutAction();

  useEffect(() => {
    refetch();
  }, []);

  // used to define the user initial names
  const getInitials = useMemo(() => {
    if (userData) {
      Storage.setUserData(userData);
    }
    const firstInitial = userData?.firstName
      ? userData.firstName[0].toUpperCase()
      : '';
    const lastInitial = userData?.lastName
      ? userData.lastName[0].toUpperCase()
      : '';
    return firstInitial + lastInitial;
  }, [userData]);

  /* The code snippet you provided is managing a modal component within the `useUserProfileController`
custom hook. Here's a breakdown of what each part of the code is doing: */
  const modalRef = useRef<RefAppModalProps>(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.open({someData: 'example data'});
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };
  /**
   * The `onConfirm` function handles the logout process, showing loaders, handling responses, and
   * displaying messages accordingly.
   */
  const onConfirm = async () => {
    Loader.showLoader();
    try {
      let response = await logoutUser();
      Loader.hideLoader();
      if (response) {
        showSuccess(translate(response.message));
        closeModal();
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
   * The `onCancel` function closes a modal.
   */
  const onCancel = () => {
    closeModal();
  };

  /**
   * The `changePasswordHandler` function navigates to the ChangePasswordScreen in the app.
   */
  const changePasswordHandler = () => {
    navigation.navigate(AppScreens.ChangePasswordScreen, {});
  };

  /**
   * The `myProfileHandler` function navigates to the Edit Profile screen with the user's data.
   */
  const myProfileHandler = () => {
    navigation.navigate(AppScreens.EditProfileScreen, {
      userData: userData,
    });
  };

  /**
   * The `faqHandler` function navigates to the FAQ screen in the app.
   */
  const faqHandler = () => {
    navigation.navigate(AppScreens.FAQScreen, {});
  };

  /**
   * The function `appPermissionHandler` navigates to the AppPermissionScreen in the app.
   */
  const appPermissionHandler = () => {
    navigation.navigate(AppScreens.AppPermissionScreen, {});
  };

  /**
   * The function `termsAndConditionHandler` navigates to the Terms and Conditions screen in the app.
   */
  const termsAndConditionHandler = () => {
    navigation.navigate(AppScreens.TermsAndConditionScreen, {});
  };

  /**
   * The `privacyPolicyHandler` function navigates to the Privacy Policy screen in the app.
   */
  const privacyPolicyHandler = () => {
    navigation.navigate(AppScreens.PrivacyPolicyScreen, {});
  };

  /**
   * The `logOut` function asynchronously opens a modal.
   */
  const logOut = async () => {
    openModal();
  };

  const onRefresh = () => {
    queryClient.invalidateQueries({queryKey: [QueryKeys.getUserProfile]});
  };
  return {
    userData,
    getInitials,
    modalRef,
    isFetching,
    myProfileHandler,
    changePasswordHandler,
    faqHandler,
    appPermissionHandler,
    termsAndConditionHandler,
    privacyPolicyHandler,
    logOut,
    onConfirm,
    onCancel,
    onRefresh,
  };
};
