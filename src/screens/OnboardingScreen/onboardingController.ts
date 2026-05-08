import {useEffect} from 'react';
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';

import {AppScreens} from '~/constants';
import {InitialAuthTab} from '~/enums';
import {Storage} from '~/helpers';

/**
 * The `useOnBoardingController` function returns an object with  onBack
 * properties for handling Onboarding functionality in a TypeScript application.
 */
interface IUseOnBoardingController {
  onCreateAccount: () => void;
  onSignInPress: () => void;
}

export const useOnBoardingController = (): IUseOnBoardingController => {
  /* The code snippet you provided is a custom hook called `useOnBoardingController` that is used to
handle the Onboarding functionality in a TypeScript application. Here is a breakdown of what
each part of the code is doing: */
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  useEffect(() => {
    setTimeout(() => {
      redirectSignInHandler();
    }, 200);
  }, []);

  const redirectSignInHandler = () => {
    const userToken = Storage.getAccessToken();
    if (userToken) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: AppScreens.AppTab}],
        }),
      );
    }
  };

  /**
   * The `onCreateAccount` function navigates to the authentication screen with the initial tab set to
   * create account.
   */

  const onCreateAccount = () => {
    navigation.navigate(AppScreens.AuthScreen, {
      initialTab: InitialAuthTab.CREATE_ACCOUNT,
    });
  };

  /**
   * The `onSignInPress` function navigates to the authentication screen with the initial tab set to sign
   * in.
   */
  const onSignInPress = () => {
    navigation.navigate(AppScreens.AuthScreen, {
      initialTab: InitialAuthTab.SIGN_IN,
    });
  };

  return {
    onCreateAccount,
    onSignInPress,
  };
};
