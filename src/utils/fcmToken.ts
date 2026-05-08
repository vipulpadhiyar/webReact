import DeviceInfo from 'react-native-device-info';
import {PERMISSIONS} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';

import {AppConstants} from '~/constants';

import {log} from './common';
import {DeviceUtils} from './device';
import {NotificationUtils} from './notification';
import {PermissionUtils} from './permissions';

/**
 * The function `getFCMTokenAndroid` retrieves the FCM token for Android devices, handling different
 * Android versions and requesting the necessary permissions.
 * @returns The function `getFCMTokenAndroid` returns a Promise that resolves to a string value, which
 * is the FCM token obtained from the device.
 */
const getFCMTokenAndroid = async (): Promise<string> => {
  let fcmToken = 'not found';
  try {
    const isNotificationPermissionNeeded =
      DeviceUtils.getAndroidApiLevel() >= 33;
    if (isNotificationPermissionNeeded) {
      const result = await PermissionUtils.requestSinglePermissionHandler(
        PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
      );
      if (result === true) {
        await NotificationUtils.createNotificationChannel();
      }
    } else {
      await NotificationUtils.createNotificationChannel();
    }
    fcmToken = await messaging().getToken();
  } catch (error) {
    log('Error getting FCM Token in android : ', error);
  }
  return fcmToken;
};

/**
 * The function `getFCMTokenIOS` is an asynchronous function that requests permission from the user to
 * send notifications on iOS and retrieves the FCM token if permission is granted.
 * @returns The function `getFCMTokenIOS` returns a Promise that resolves to a string.
 */
const getFCMTokenIOS = async (): Promise<string> => {
  let fcmToken = 'not found';
  const isEmulator = await DeviceInfo.isEmulator();
  if (isEmulator) {
    fcmToken = 'iOS Simulator';
    return fcmToken;
  }
  try {
    await messaging().requestPermission();
    fcmToken = await messaging().getToken();
  } catch (error) {
    log('Error getting FCM Token in iOS : ', error);
  }
  return fcmToken;
};

/**
 * The function `getFCMToken` returns the FCM token for either Android or iOS devices.
 * @returns The function `getFCMToken` returns a promise that resolves to a string.
 */
export const getFCMToken = async (): Promise<string> => {
  let fcmToken = 'not found';

  if (AppConstants.PLATFORM_OS === 'android') {
    fcmToken = await getFCMTokenAndroid();
  } else {
    fcmToken = await getFCMTokenIOS();
  }
  return fcmToken;
};
