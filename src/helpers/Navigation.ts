import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

import {AppScreens} from '~/constants';
import {queryClient} from '~/store';

import {Storage} from './Storage';

// helper ref variable to navigate without navigation prop.

interface IRoutes {
  name: string;
  params?: any;
}

interface INavigateResetParams {
  index: number;
  routes: IRoutes[];
}

/**
 * Helper class for navigation in a React Native application using React Navigation.
 *
 * @exports navigationRef - Reference for navigation
 * @exports logoutNavigation - Function to handle logout navigation
 */

// Navigation ref.
export const navigationRef = createNavigationContainerRef();

/**
 * Logs out the user and navigates to the authentication stack.
 *
 * This function resets the navigation stack to the authentication stack,
 * typically used for logging out a user.
 */
export const logoutNavigation = () => {
  if (navigationRef.isReady()) {
    let loginData = Storage.getLoginData();
    Storage.clearStorage();
    Storage.setLoginData(loginData);
    queryClient.clear();
    if (
      navigationRef.current?.getCurrentRoute()?.name !==
      AppScreens.OnboardingScreen
    ) {
      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: AppScreens.AuthStack}],
        }),
      );
    }
  }
};

/**
 * This function resets the navigation stack to with provided routes,
 * typically used for reset previous stack and launch specific route with reset current stack.
 */
export const ResetNavigationWithRoutes = (data: INavigateResetParams) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: data.index,
        routes: data.routes,
      }),
    );
  }
};
