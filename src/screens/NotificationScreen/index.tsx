import React from 'react';
import {View} from 'react-native';

import {
  AppFlatList,
  AppHOButton,
  AppModal,
  AppNoData,
  AppScreen,
} from '~/components';
import {
  AppConstants,
  AppFonts,
  AppFontSizes,
  NotificationScreenTestKeys,
} from '~/constants';
import {translate} from '~/localization';

import {LogOutModal} from '../Tab/Profile/components/LogOutModal';

import {NotificationListItem} from './component/NotificationItem';
import {useNotificationController} from './controller';
import styles from './styles';

/**
 * The NotificationScreen component displays a list of notifications
 * and allows users to delete notifications individually or all at once.
 *
 * @returns {React.JSX.Element} - The rendered notification screen.
 */
export const NotificationScreen = (): JSX.Element => {
  const {
    isFetching,
    isRefetching,
    notificationList,
    modalRef,
    refetch,
    onPressGoBack,
    onEndReachedHandler,
    onPressDeleteAllNotification,
    closeModal,
    openModal,
    onPressDeleteNotification,
  } = useNotificationController();

  /**
   * Renders a single notification item in the list.
   *
   * @param {INotification} item - The notification item to render.
   * @returns {React.JSX.Element} - The rendered NotificationListItem component.
   */
  const renderNotificationList = (item: INotification): React.JSX.Element => {
    /**
     *on press function for delete notification
     */
    const onPress = () => {
      onPressDeleteNotification(item);
    };
    return (
      <NotificationListItem testID={item?._id} data={item} onPress={onPress} />
    );
  };

  /**
   * Returns the UI for the empty state when no notifications are available.
   *
   * @returns {React.JSX.Element} - The rendered empty container.
   */
  const returnEmptyContainer = (): React.JSX.Element => {
    return (
      <View style={styles.emptyContainer}>
        <AppNoData
          fontSize={AppFontSizes[24]}
          text={translate('no_notification_available')}
        />
      </View>
    );
  };

  return (
    <AppScreen
      testID={NotificationScreenTestKeys.NOTIFICATION_SCREEN}
      header={translate('notifications')}
      onBack={onPressGoBack}>
      <View style={styles.subContainer}>
        {notificationList.length > 0 && (
          <View style={styles.viewButtonContainer}>
            <AppHOButton
              testID={NotificationScreenTestKeys.DELETE_ALL_BUTTON}
              text={translate('delete_all')}
              containerStyle={styles.viewButton}
              textFontFamily={AppFonts.GentiumBasic_Bold}
              textSize={AppFontSizes[14]}
              onPress={openModal}
            />
          </View>
        )}
        {notificationList && notificationList.length > 0 ? (
          <AppFlatList
            data={notificationList}
            renderItem={({item}) =>
              renderNotificationList(item as INotification)
            }
            onEndReachedThreshold={AppConstants.ON_END_REACHED_THRESHOLD}
            onEndReached={onEndReachedHandler}
            refreshing={isFetching || isRefetching}
            onRefresh={refetch}
          />
        ) : (
          returnEmptyContainer()
        )}
      </View>
      <AppModal ref={modalRef}>
        <LogOutModal
          confirmTestID={NotificationScreenTestKeys.DELETE_ALL_BUTTON_CONFIRM}
          header={translate('delete_all_notifications')}
          message={translate(
            'are_you_sure_you_want_to_delete_all_notifications_this_action_can_not_be_undone',
          )}
          onCancel={closeModal}
          onConfirm={onPressDeleteAllNotification}
        />
      </AppModal>
    </AppScreen>
  );
};
