import React, {createContext, useContext, useEffect} from 'react';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {AppConstants} from '~/constants';
import {log, NotificationUtils} from '~/utils';

/*
 * Define the type for notification data (currently empty)
 * TO DO manage navigation from body and description from notification
 */
interface Data {}

/*
 * Define the type for NotificationContext
 */
interface NotificationContextType {}

/*
 * Create a context for notifications with an empty default value
 */
const NotificationContext = createContext<NotificationContextType>({});

/*
 * Custom hook to use the NotificationContext
 */
export const useNotification = () => useContext(NotificationContext);

/*
 * Define props for the NotificationProvider component
 */
interface NotificationProviderProps {
  children: React.JSX.Element | React.JSX.Element[];
}

/**
 * Component to provide the notification context to its children.
 * Handles Firebase notifications and provides context for them.
 */
export const NotificationProvider = (props: NotificationProviderProps) => {
  const {children} = props;
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  useEffect(() => {
    /**
     * TO DO IOS configuration not setup yet thats why displaying conditionally right now
     */
    if (AppConstants.PLATFORM_OS === 'android') {
      /*
       * Handle the initial notification when the app is launched
       */
      messaging()
        .getInitialNotification()
        .then(
          async (
            remoteMessage: FirebaseMessagingTypes.RemoteMessage | null,
          ) => {
            log('getInitialNotification : ', remoteMessage);
            if (remoteMessage && remoteMessage.data) {
              const notificationData: Data = remoteMessage.data;
              log('notificationData', notificationData);
              // Handle the notification data as needed
            }
          },
        );

      /*
       * Handle foreground messages
       */
      const unsubscribeFirebaseOnMessage = messaging().onMessage(
        (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
          // Handle the foreground notification
          if (remoteMessage?.notification) {
            NotificationUtils.displayNotification(remoteMessage);
          }
        },
      );

      /*
       * Cleanup function to unsubscribe from message listener
       */
      return () => {
        unsubscribeFirebaseOnMessage();
      };
    }
  }, [navigation]);

  return (
    <NotificationContext.Provider value={{}}>
      {children}
    </NotificationContext.Provider>
  );
};
