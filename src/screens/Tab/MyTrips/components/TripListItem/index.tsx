import React from 'react';
import {View} from 'react-native';

import {AppButton, AppText} from '~/components';
import {AppColors, AppFonts, AppSpacing} from '~/constants';
import {TripType as TripTypeAll} from '~/enums';
import {translate} from '~/localization';
import {DateFormat, formateLocalDate} from '~/utils';

import {TripStatus} from '../TripStatus';

import styles from './styles';
/**
 * TripListItem
 * returns trip list item component
 * onDetails redirected to detail screen
 * pass trip as TripItem
 */
interface ITripListItem {
  index: number;
  trip: TripItem;
  testID?: string;
  btnTestID?: string;
  onDetails: (index: number) => void;
}
export const TripType = [
  {
    key: 'oneWay',
    title: 'One Way',
  },
  {
    key: 'roundTrip',
    title: 'Round Trip',
  },
];
export const TripListItem = (props: ITripListItem) => {
  const {index, trip, onDetails} = props;
  /**
   *
   * @param type
   * @returns trip type title
   */
  const getTripType = (type: string) => {
    return TripType.find(item => item.key === type)?.title ?? '';
  };

  const isRoundTrip =
    trip.tripType === TripTypeAll.ROUNDTRIP && trip.roundTripCount >= 1;
  /**
   * pickUpDate with Format
   */
  const pickUpDate = formateLocalDate(trip.pickUpDate, DateFormat.MM_DD_YYYY);
  const pickUpLastDate = formateLocalDate(
    trip.lastPickUpDate,
    DateFormat.MM_DD_YYYY,
  );
  const returnPickUpDate = formateLocalDate(
    trip.returnDate,
    DateFormat.MM_DD_YYYY,
  );
  const returnPickUpLastDate = formateLocalDate(
    trip.lastReturnDate,
    DateFormat.MM_DD_YYYY,
  );
  const oneWayDate =
    pickUpDate === pickUpLastDate
      ? pickUpDate
      : pickUpDate + ` ${translate('to')} ` + pickUpLastDate;
  const returnDate =
    returnPickUpDate === returnPickUpLastDate
      ? returnPickUpDate
      : returnPickUpDate + ` ${translate('to')} ` + returnPickUpLastDate;

  const finalPickUpDate = isRoundTrip ? returnDate : oneWayDate;

  /**
   * handle onDetails to navigate to detail screen
   */
  const handleOnDetails = () => {
    onDetails(index);
  };

  return (
    <View style={styles.content} testID={props.testID}>
      <TripStatus status={trip.status} containerStyle={styles.tripStatus} />
      <View style={styles.nameImageView}>
        <View style={styles.nameView}>
          <AppText
            text={trip.name}
            fontFamily={AppFonts.GentiumBasic_Bold}
            fontSize={AppSpacing[20]}
          />
        </View>
      </View>
      <View style={styles.barnColorView}>
        <View style={styles.nameView}>
          <AppText
            text={
              trip.isFlexiblePickUpDate
                ? translate('flexible_pick_up_date')
                : isRoundTrip
                ? translate('ReturnDate')
                : translate('PickupDate')
            }
            fontFamily={AppFonts.GentiumBasic_Regular}
            fontSize={AppSpacing[16]}
          />
          <AppText
            text={finalPickUpDate}
            fontFamily={AppFonts.GentiumBasic_Regular}
            fontSize={AppSpacing[14]}
            fontColor={AppColors.subTextColor}
          />
        </View>
        <View style={styles.nameView}>
          <AppText
            text={translate('TripType')}
            fontFamily={AppFonts.GentiumBasic_Regular}
            fontSize={AppSpacing[16]}
          />
          <AppText
            text={getTripType(trip.tripType)}
            fontFamily={AppFonts.GentiumBasic_Regular}
            fontSize={AppSpacing[14]}
            fontColor={AppColors.subTextColor}
          />
        </View>
      </View>
      <View style={styles.barnColorView}>
        <View style={styles.nameView}>
          <AppText
            text={
              isRoundTrip
                ? translate('ReturnPickupAddress')
                : translate('PickupAddress')
            }
            fontFamily={AppFonts.GentiumBasic_Regular}
            fontSize={AppSpacing[16]}
          />
          <AppText
            text={isRoundTrip ? trip.returnPickUp.address : trip.pickUp.address}
            fontFamily={AppFonts.GentiumBasic_Regular}
            fontSize={AppSpacing[14]}
            fontColor={AppColors.subTextColor}
          />
        </View>
      </View>
      <View style={styles.barnColorView}>
        <View style={styles.nameView}>
          <AppText
            text={
              isRoundTrip
                ? translate('ReturnDropOffAddress')
                : translate('DropOffAddress')
            }
            fontFamily={AppFonts.GentiumBasic_Regular}
            fontSize={AppSpacing[16]}
          />
          <AppText
            text={
              isRoundTrip ? trip.returnDropOff.address : trip.dropOff.address
            }
            fontFamily={AppFonts.GentiumBasic_Regular}
            fontSize={AppSpacing[14]}
            fontColor={AppColors.subTextColor}
          />
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.viewBtnContainer}>
        <AppButton
          testID={props.btnTestID}
          text={translate('ViewTripDetails')}
          textFontFamily={AppFonts.GentiumBasic_Bold}
          containerStyle={styles.viewBtn}
          textSize={AppSpacing[14]}
          onPress={handleOnDetails}
        />
      </View>
    </View>
  );
};
