import {useEffect} from 'react';
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';

import {AppConstants, AppScreens} from '~/constants';
import {InitialAuthTab} from '~/enums';
import {Storage} from '~/helpers';

export const useOnboardingController = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  useEffect(() => {
    checkUserLogin();
  }, []);

  const checkUserLogin = () => {
    const accessToken = Storage.getAccessToken();
    if (accessToken) {
      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: AppScreens.AppTab, params: {}}],
          }),
        );
      }, AppConstants.MODEL_DELAY);
    }
  };

  const onCreateAccount = () => {
    navigation.navigate(AppScreens.AuthScreen, {
      initialTab: InitialAuthTab.CREATE_ACCOUNT,
    });
  };

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
