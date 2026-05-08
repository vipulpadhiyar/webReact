import {useEffect} from 'react';
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';

import {AppConstants, AppScreens} from '~/constants';
import {Storage} from '~/helpers';

/**
 *  Splash Controller
 *  It will check for access token of user signed in or not
 *  Depending on access token it will redirect to respective screen
 *  @returns ISplashController
 */
interface ISplashController {}

export const useSplashController = (): ISplashController => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  useEffect(() => {
    checkUserLogin();
  }, []);

  /**
   *  checkUserLogin to check for access token of user signed in or not
   *  Depending on access token it will redirect to respective screen
   */
  const checkUserLogin = () => {
    const accessToken = Storage.getAccessToken();
    if (accessToken) {
      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: AppScreens.AppTab, params: {}}],
          }),
        );
      }, AppConstants.MODEL_DELAY);
    } else {
      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: AppScreens.AuthStack, params: {}}],
          }),
        );
      }, AppConstants.MODEL_DELAY);
    }
  };

  return {};
};
