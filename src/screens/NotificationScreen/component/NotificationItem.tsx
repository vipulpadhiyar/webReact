import React, {memo, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';

import {AppText} from '~/components';
import {
  AppColors,
  AppFonts,
  AppFontSizes,
  AppSpacing,
  IcMessage,
  IcRedDelete,
} from '~/constants';
import {DateUtils} from '~/utils';

/**
 * Interface defining the props for the NotificationListItem component.
 *
 * @property {INotification} data - The notification data to display.
 * @property {(item: INotification) => void} onPress - Callback function to handle the press action on a notification.
 */
interface NotificationListItemProps {
  data: INotification;
  onPress: (item: INotification) => void;
  testID: string;
}

/**
 * A memoized functional component that displays a notification item.
 * Utilizes Swipeable for swipe-to-delete functionality.
 *
 * @param {NotificationListItemProps} props - The props for the component.
 * @returns {React.JSX.Element} - The rendered notification item.
 */
export const NotificationListItem = memo(
  (props: NotificationListItemProps): React.JSX.Element => {
    const {data, testID, onPress} = props;
    const swipeRef = useRef<Swipeable>(null);

    // Format the creation date of the notification
    const date = DateUtils.formatDateToStandardFormate(data?.createdAt);

    /**
     * Handles the press action to delete the notification.
     * Closes the swipeable component before invoking the onPress callback.
     */
    const onPressDelete = () => {
      swipeRef?.current?.close(); // Close the swipe component
      onPress(data);
    };

    /**
     * Renders the right actions for the Swipeable component.
     * Includes a delete button.
     *
     * @returns {JSX.Element} - The right actions view for swipeable.
     */
    const renderRightActions = (): JSX.Element => (
      <View style={styles.rightActionContainer}>
        <IcRedDelete onPress={onPressDelete} />
      </View>
    );

    return (
      <Swipeable
        testID={testID}
        ref={swipeRef} // Attach the ref to Swipeable
        containerStyle={styles.swipeContainer}
        renderRightActions={renderRightActions}>
        <View style={styles.listViewContainer}>
          <IcMessage />
          <View style={styles.separator} />
          <View style={styles.textContainer}>
            <AppText
              text={data?.title}
              fontColor={AppColors.peanBlue}
              fontFamily={AppFonts.GentiumBasic_Bold}
              fontSize={AppFontSizes[14]}
            />
            <AppText
              text={data?.body.replaceAll('\n', '')}
              fontColor={AppColors.peanBlue}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontSize={AppFontSizes[12]}
            />
            <AppText
              text={date}
              fontColor={AppColors.greyLight8}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontSize={AppFontSizes[12]}
            />
          </View>
        </View>
      </Swipeable>
    );
  },
);

/**
 * Styles for the NotificationListItem component.
 * Defines the layout and appearance of various elements within the notification item.
 */
const styles = StyleSheet.create({
  swipeContainer: {
    backgroundColor: AppColors.redBg,
    marginVertical: AppSpacing[8],
    borderRadius: AppSpacing[12],
  },

  rightActionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.redBg,
    padding: AppSpacing[30],
    borderEndEndRadius: AppSpacing[12],
    borderTopEndRadius: AppSpacing[12],
  },

  listViewContainer: {
    shadowColor: AppColors.modalOverlay000,
    shadowRadius: AppSpacing[3],
    backgroundColor: AppColors.white,
    borderRadius: AppSpacing[12],
    padding: AppSpacing[16],
    flexDirection: 'row',
    alignItems: 'center', // Center items vertically
  },

  separator: {
    width: 1, // Width of the vertical line
    backgroundColor: AppColors.greyLight, // Color of the vertical line
    height: '100%', // Fill the height of the container
    marginHorizontal: AppSpacing[14], // Space between items and separator
  },

  textContainer: {
    flex: 1, // Takes up the remaining space
    rowGap: AppSpacing[8],
  },
});
