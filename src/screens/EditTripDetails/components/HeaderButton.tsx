import React, {memo} from 'react';
import {Platform, StyleSheet, View} from 'react-native';

import {AppHOButton, AppTouchable} from '~/components';
import {AppColors, AppFonts, AppSpacing, IcBackArrow} from '~/constants';
import {translate as t} from '~/localization';

/*
 * Common interface for defining props related to header buttons.
 */
interface HeaderButtonProps {
  isSelectedOneWayTrip: boolean;
  onPress: (isSelectOneWayTrip: boolean) => void;
  firstButtonTestID?: string;
  secondButtonTestID?: string;
  onPressBack?: () => void;
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
      onPressBack,
    } = props;

    /**
     * Function to handle pressing the one-way trip option.
     */
    const onPressOneWayTrip = () => {
      onPress(true);
    };
    /**
     *  Function to handle pressing the round trip option.
     */
    const onPressRoundTrip = () => {
      onPress(false);
    };

    return (
      <View style={styles.buttonContainer}>
        <AppTouchable onPress={onPressBack}>
          <IcBackArrow
            stroke={AppColors.white}
            height={AppSpacing[22]}
            width={AppSpacing[22]}
          />
        </AppTouchable>
        <AppHOButton
          disabled={!isSelectedOneWayTrip}
          testID={firstButtonTestID}
          onPress={onPressOneWayTrip}
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
          disabled={isSelectedOneWayTrip}
          testID={secondButtonTestID}
          onPress={onPressRoundTrip}
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
