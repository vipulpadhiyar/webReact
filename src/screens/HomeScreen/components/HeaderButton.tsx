import React, {memo} from 'react';
import {Platform, StyleSheet, View} from 'react-native';

import {AppHOButton} from '~/components';
import {
  AppColors,
  AppFonts,
  AppSpacing,
  IcNotification,
  IcNotificationUnread,
} from '~/constants';
import {translate as t} from '~/localization';

interface HeaderButtonProps {
  isSelectedOneWayTrip: boolean;
  onPress: (isSelectOneWayTrip: boolean) => void;
  firstButtonTestID: string;
  secondButtonTestID: string;
  onPressNotification?: () => void;
  notificationCount?: number;
}

/*
 * HeaderButton component for selecting one-way or round trip options.
 * @param {HeaderButtonProps} props - Properties for the HeaderButton component.
 * @returns {React.JSX.Element} - HeaderButton component.
 */
export const HeaderButton = memo(
  (props: HeaderButtonProps): React.JSX.Element => {
    const {
      isSelectedOneWayTrip,
      onPress,
      firstButtonTestID,
      secondButtonTestID,
      notificationCount,
      onPressNotification,
    } = props;

    /**
     * Handles the press event for the bell icon.
     *
     * This function checks if the `onPressNotification` callback function is provided.
     * If it is, the function will call `onPressNotification`. This is typically used
     * to handle user interactions with a bell icon or notification button, triggering
     * any associated action, such as opening a notification menu or navigating to a
     * notifications screen.
     */
    const onPressBell = () => {
      if (onPressNotification) {
        onPressNotification();
      }
    };

    return (
      <View style={styles.buttonContainer}>
        <AppHOButton
          testID={firstButtonTestID}
          onPress={() => {
            onPress(true);
          }}
          text={t('ONE_WAY_TRIP')}
          textSize={AppSpacing[16]}
          textColor={
            isSelectedOneWayTrip ? AppColors.peanBlue37 : AppColors.white
          }
          textFontFamily={
            isSelectedOneWayTrip
              ? AppFonts.GentiumBasic_Bold
              : AppFonts.GentiumBasic_Regular
          }
          containerStyle={
            isSelectedOneWayTrip
              ? styles.selectedContainer
              : styles.unSelectedContainer
          }
        />
        <AppHOButton
          testID={secondButtonTestID}
          onPress={() => {
            onPress(false);
          }}
          text={t('ROUND_TRIP')}
          textSize={AppSpacing[16]}
          textColor={
            !isSelectedOneWayTrip ? AppColors.peanBlue37 : AppColors.white
          }
          textFontFamily={
            !isSelectedOneWayTrip
              ? AppFonts.GentiumBasic_Bold
              : AppFonts.GentiumBasic_Regular
          }
          containerStyle={
            !isSelectedOneWayTrip
              ? styles.selectedContainer
              : styles.unSelectedContainer
          }
        />
        <View style={styles.flexContainer} />
        {notificationCount && notificationCount > 0 ? (
          <IcNotificationUnread
            onPress={onPressBell}
            height={AppSpacing[22]}
            width={AppSpacing[22]}
          />
        ) : (
          <IcNotification
            onPress={onPressBell}
            height={AppSpacing[22]}
            width={AppSpacing[22]}
          />
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: AppSpacing[16],
    columnGap: AppSpacing[10],
    backgroundColor: AppColors.peanBlue,
    marginTop: Platform.OS === 'ios' ? AppSpacing[20] : AppSpacing[30],
  },
  selectedContainer: {
    backgroundColor: AppColors.white,
    paddingHorizontal: AppSpacing[16],
    paddingVertical: AppSpacing[10],
  },
  unSelectedContainer: {
    backgroundColor: AppColors.peanBlue37,
    borderColor: AppColors.white,
    paddingHorizontal: AppSpacing[16],
    paddingVertical: AppSpacing[10],
  },
  flexContainer: {flex: 1},
});
