import React from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';

import {toastConfig} from './components/AppToast';
import {AppColors} from './constants/app.colors';
import {useRootController} from './controllers/useRootController';
import Loader from './helpers/Loader';
import store, {persistor} from './store/store.index';
import {AppLoader} from './components';
import {
  AppStateProvider,
  NetworkProvider,
  NotificationProvider,
  SocketProvider,
} from './context';
import {navigationRef} from './helpers';
import {AppNavigator} from './router';

/**
 * Represents the root component of the application.
 * @returns {JSX.Element} - React element.
 */
const Root = (): React.JSX.Element => {
  const {providerTheme} = useRootController();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer theme={providerTheme} ref={navigationRef}>
          <SafeAreaProvider>
            <NetworkProvider>
              <AppStateProvider>
                <NotificationProvider>
                  <SocketProvider>
                    <StatusBar
                      backgroundColor={AppColors.white}
                      barStyle={'dark-content'}
                    />
                    <AppLoader
                      ref={(e: HTMLInputElement) => Loader.setLoader(e)}
                    />
                    <GestureHandlerRootView>
                      <AppNavigator />
                    </GestureHandlerRootView>
                    <Toast config={toastConfig} />
                  </SocketProvider>
                </NotificationProvider>
              </AppStateProvider>
            </NetworkProvider>
          </SafeAreaProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default Root;
