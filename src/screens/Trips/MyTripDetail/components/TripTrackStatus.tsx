/***/
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

import {AppText} from '~/components';
import {
  AppColors,
  AppFonts,
  AppSpacing,
  IcBlueTick,
  ICEmptyCircle,
} from '~/constants';
import {DateFormat, DateUtils} from '~/utils';

interface TripTrackStatusItemProps {
  /** The text for the pickup location. */
  pickupText: string;
  /** The status of the trip. */
  statusText: string;
  /** The address of the pickup location. */
  addressText: string;
  /** The date and time of the pickup. */
  dateText: string;
  /** Indicates whether the status is valid. */
  isValid: boolean;
  /** Indicates whether the trip is completed. */
  isCompletedStatus: boolean;
}

/***/
/**
 * TripTrackStatus is a memoized functional component that displays the trip tracking status.
 *
 * @param {TripTrackStatusItemProps} props - The props for the component.
 * @returns {React.JSX.Element} The rendered component.
 */
export const TripTrackStatus = memo(
  (props: TripTrackStatusItemProps): React.JSX.Element => {
    const {
      pickupText,
      statusText,
      addressText,
      isValid,
      dateText,
      isCompletedStatus,
    } = props;

    /***/
    /**
     * Format the date text using DateUtils.
     */
    const date = DateUtils.formateLocalDate(
      dateText,
      DateFormat.MM_DD_YYYY_HH_MM_A,
    );

    return (
      <View style={styles.statusContainer}>
        <View
          style={
            isValid
              ? styles.statusInnerContainer
              : styles.statusDisableContainer
          }>
          {isCompletedStatus ? <IcBlueTick /> : <ICEmptyCircle />}
          {isValid && <View style={styles.dashedLineStyle} />}
        </View>
        <View style={[styles.textView, isValid && styles.pickUpDateText]}>
          <AppText
            text={pickupText}
            fontFamily={AppFonts.GentiumBasic_Bold}
            fontSize={AppSpacing[16]}
            fontColor={AppColors.peanBlue}
            containerStyle={styles.pickUpDate}
          />
          <AppText
            text={statusText}
            fontFamily={AppFonts.GentiumBasic_Regular}
            fontSize={AppSpacing[14]}
            fontColor={AppColors.peanBlue}
          />
          {addressText && (
            <AppText
              text={addressText}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontSize={AppSpacing[14]}
              fontColor={AppColors.peanBlue}
            />
          )}
          {dateText && (
            <AppText
              text={date}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontSize={AppSpacing[12]}
              fontColor={AppColors.peanBlue}
            />
          )}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  locationContainer: {
    paddingTop: AppSpacing[16],
    rowGap: AppSpacing[5],
  },
  statusContainer: {
    flexDirection: 'row',
    columnGap: AppSpacing[16],
  },
  iconContainer: {width: AppSpacing[40]},
  textView: {paddingRight: AppSpacing[16]},
  dashedLineStyle: {
    borderWidth: 0.9,
    borderColor: AppColors.peanBlue,
    flex: 1,
  },
  statusInnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusDisableContainer: {
    alignItems: 'center',
  },
  pickUpDate: {marginBottom: AppSpacing[4]},
  pickUpDateText: {marginBottom: AppSpacing[20]},
});
