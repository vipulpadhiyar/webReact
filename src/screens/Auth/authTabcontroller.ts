import {useEffect, useRef, useState} from 'react';
import {Linking} from 'react-native';
import {
  NotificationsResponse,
  requestNotifications,
} from 'react-native-permissions';
import {RouteProp, useIsFocused, useRoute} from '@react-navigation/native';

import {RefAppModalProps} from '~/components/AppModal';
import {AppScreens} from '~/constants';
import {InitialAuthTab} from '~/enums';
import {log} from '~/utils';
import {getFCMToken} from '~/utils/fcmToken';

// Define the props type for the returned object
type TabController = {
  isTab?: InitialAuthTab;
  modalPermissionRef: React.RefObject<RefAppModalProps>;
  onContinue: () => void;
  closeModalPermission: () => void;
  setIsTab: (isTab: InitialAuthTab) => void;
};

/**
 * `useTabController` is a custom hook that is used to manage the state of
  the current tab in the `AuthScreen` component.
 * @exports useTabController - Hook for manage the state of
  the current tab in the `AuthScreen` component.
 */
export const useTabController = (): TabController => {
  const {params} =
    useRoute<RouteProp<AuthStackParamList, AppScreens.AuthScreen>>();
  const initialParams = params?.initialTab ?? InitialAuthTab.CREATE_ACCOUNT;
  const [isTab, setIsTab] = useState<InitialAuthTab>(initialParams);
  const [notificationAllowed, setNotificationAllowed] = useState(false);

  /* The `useEffect` hook in the code snippet is responsible for setting the initial form values for
 email and password fields when the component mounts or when there is a change in the `error` state
 variable. */
  useEffect(() => {
    if (!notificationAllowed) {
      requestNotificationPermission(true);
    }
  }, []);

  /**
   * focus event
   */
  const isFocused = useIsFocused();
  useEffect(() => {
    if (!notificationAllowed) {
      requestNotificationPermission(false);
    }
  }, [isFocused]);
  /**
   * request notification permission to get fcm token
   * @returns The `requestNotificationPermission` function is an asynchronous function that requests
   * notification permissions using the `requestNotifications` function from the
   * `react-native-permissions` library. If the permissions are granted, it sets the `notificationAllowed` state to `true` and retrieves the FCM token using the `getFCMToken` function. Otherwise, it sets the `notificationAllowed` state to `false`.
   */
  const requestNotificationPermission = async (showAlert: boolean) => {
    const enable: NotificationsResponse = await requestNotifications([
      'alert',
      'badge',
      'sound',
    ]);
    if (enable.status === 'granted') {
      setNotificationAllowed(true);
      const fcmToken = await getFCMToken();
      log('fcmToken', fcmToken);
    } else if (showAlert) {
      openModalPermission();
    }
  };

  /** Notification Permission Alert Model Reference & Methods */
  const modalPermissionRef = useRef<RefAppModalProps>(null);
  /* Open Modal*/
  const openModalPermission = () => {
    modalPermissionRef.current?.open();
  };
  /* Close Modal*/
  const closeModalPermission = () => {
    modalPermissionRef.current?.close();
  };

  /**  onContinue will open app settings */
  const onContinue = () => {
    closeModalPermission();
    Linking.openSettings();
  };
  return {
    isTab,
    modalPermissionRef,
    setIsTab,
    closeModalPermission,
    onContinue,
  };
};
