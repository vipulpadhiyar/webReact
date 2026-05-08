import {useEffect, useState} from 'react';
import {Linking} from 'react-native';
import {
  checkNotifications,
  NotificationsResponse,
  requestNotifications,
} from 'react-native-permissions';
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';

import {Storage} from '~/helpers';
import {useMyProfileApiAction, useToggleNotification} from '~/store';
import {log, showError} from '~/utils';
import {getFCMToken} from '~/utils/fcmToken';

export const useAppPermissionController = () => {
  const [notificationAllowed, setNotificationAllowed] =
    useState<boolean>(false);

  /** API Definition
   * `useToggleNotification` is a custom hook that toggles the notification permission.
   * It returns a `mutateAsync` function that can be used to toggle the notification permission.
   */
  const {mutateAsync: toggleNotification} = useToggleNotification();

  /** API Definition
   * `useMyProfileApiAction` is a custom hook that fetches the user profile data.
   * It returns an object containing the user data, a boolean indicating if the data is being fetched, and a `refetch` function to refetch the data.
   */
  const {refetch} = useMyProfileApiAction();

  const isFocused = useIsFocused();

  useEffect(() => {
    checkNotificationPermission();
    return () => {};
  }, [isFocused]);
  /**
   * The `checkNotificationPermission` function checks if the notification permission is granted and if the user has enabled notifications in their profile.
   * If both conditions are met, it sets the `notificationAllowed` state to `true`.
   * @returns None
   */

  const checkNotificationPermission = async () => {
    const userData: UserProfileResponse =
      Storage.getUserData() as UserProfileResponse;
    const enable: NotificationsResponse = await checkNotifications();
    if (enable.status === 'granted' && userData?.isNotificationAllowed) {
      setNotificationAllowed(true);
    }
  };

  /* The code snippet you provided is a custom hook called `useUserProfileController` that is used to
handle the userProfile functionality in a TypeScript application. Here is a breakdown of what
each part of the code is doing: */
  const navigation = useNavigation<NavigationProp<ProfileStackParamList>>();

  /**
   * The `onBack` function is used to navigate back in a TypeScript application.
   */

  const onBack = () => {
    navigation.goBack();
  };

  /**
   * Handles the toggling of notifications for the application.
   * If notifications are allowed, opens the device settings.
   * If notifications are not allowed, requests permission and updates state accordingly.
   * @returns None
   */
  const onToggleNotification = async () => {
    if (notificationAllowed) {
      updateNotificationState();
    } else {
      const enable: NotificationsResponse = await requestNotifications([
        'alert',
        'badge',
        'sound',
      ]);
      if (enable.status === 'granted') {
        setNotificationAllowed(true);
        updateNotificationState();
      } else {
        setNotificationAllowed(false);
        Linking.openSettings();
      }
    }
  };

  const updateNotificationState = async () => {
    try {
      const fcmToken = await getFCMToken();
      const res = await toggleNotification({
        fcmToken,
      });
      log('res', res);
      getUpdateProfile();
    } catch (error) {
      showError(error as string);
    }
  };
  const getUpdateProfile = async () => {
    try {
      const res = await refetch();
      if (res.data) {
        setNotificationAllowed(res.data.isNotificationAllowed);
        Storage.setUserData(res.data);
      }
    } catch (error) {
      showError(error as string);
    }
  };
  return {
    notificationAllowed,
    onBack,
    onToggleNotification,
  };
};
