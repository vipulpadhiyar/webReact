import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';

// import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {AppConstants} from '~/constants';

import {log} from './common';

/**
 * The function creates a notification channel with high importance in a TypeScript file.
 */
const createNotificationChannel = async () => {
  try {
    await notifee.createChannel({
      id: AppConstants.NOTIFICATION_CHANNEL_ID,
      name: AppConstants.NOTIFICATION_CHANNEL_ID,
      importance: AndroidImportance.HIGH,
    });
  } catch (err) {
    log('Channel not created :- ', err);
  }
};

// display notification Handler for foreground and background app state.
const displayNotification = async (
  // remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  remoteMessage: any,
): Promise<void> => {
  try {
    await notifee.displayNotification({
      title: remoteMessage?.notification?.title ?? '',
      body: remoteMessage?.notification?.body ?? '',
      android: {
        channelId:
          remoteMessage?.notification?.android?.channelId ??
          AppConstants.NOTIFICATION_CHANNEL_ID,
        visibility: AndroidVisibility.PUBLIC,
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
        },
      },
      data: remoteMessage?.data ?? {},
    });
  } catch (error) {
    log('Error in displayNotification :- ', error);
  }
};

export const NotificationUtils = {
  displayNotification,
  createNotificationChannel,
};
