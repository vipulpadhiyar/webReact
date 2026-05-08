import React from 'react';
import {View} from 'react-native';

import {AppText} from '~/components';
import {AppColors, AppFonts, AppSpacing, IcCheckW} from '~/constants';
import {TripStatusAll, TripType} from '~/enums';
import {translate} from '~/localization';
import {DateFormat, DateUtils} from '~/utils';

import styles from './styles';

/**
 * ITripCheckPoint interface
 * @interface ITripCheckPoint
 * @description This interface is used to handle trip check point
 * @memberof ITripCheckPoint
 * @example
 * const { tripStatus, tripDetail } = props;
 */
interface ITripCheckPoint {
  tripStatus: TripStatusAll;
  tripDetail: TripDetailResponseType;
}

/**
 *
 * @param props  ITripCheckPoint
 * @description This function is used to handle trip check point
 * @memberof ITripCheckPoint
 * @example
 * <TripCheckPoint tripStatus={tripStatus} tripDetail={tripDetail} />;
 * @returns
 */
export const TripCheckPoint = (props: ITripCheckPoint) => {
  const {tripDetail} = props;
  /**
   *
   * @param status
   *  @description This function is used to check status
   * @memberof TripCheckPoint
   * @example
   * isStatus(TripStatusAll.PICKUP);
   * @returns
   */
  const isStatus = (status: TripStatusAll) => {
    const statuses: TripStatusAll[] = [];
    tripDetail.statusHistory?.forEach(item => {
      statuses.push(item.status as TripStatusAll);
    });
    // if (tripDetail.status === TripStatusAll.INITIAL_COMPLETE) {
    //   return false;
    // }
    return statuses.includes(status);
  };

  /**
   *
   * @param status
   * @description This function is used to get address
   * @memberof TripCheckPoint
   * @example
   * getAddress(TripStatusAll.PICKUP);
   * @returns
   */
  const getAddress = (status: TripStatusAll) => {
    if (tripDetail.statusHistory && tripDetail.statusHistory?.length > 0) {
      const foundStatus = tripDetail.statusHistory.find(
        item => item.status === status,
      );
      const {
        address = '',
        city = '',
        state = '',
        country = '',
        pincode = '',
      } = foundStatus?.location || {};

      const completeAddress = [address, city, state, country, pincode]
        .filter(part => part.trim() !== '')
        .join(', ');
      // if (tripDetail.status === TripStatusAll.INITIAL_COMPLETE) {
      //   return getDefaultAddress(status);
      // }
      return completeAddress || getDefaultAddress(status);
    }
    return getDefaultAddress(status);
  };

  /**
   *
   * @param status
   * @description This function is used to get default address
   * @memberof TripCheckPoint
   * @example
   * getDefaultAddress(TripStatusAll.PICKUP);
   * @returns
   */
  const getDefaultAddress = (status: TripStatusAll) => {
    if (status === TripStatusAll.PICKUP) {
      if (
        tripDetail.tripType === TripType.ONE_WAY ||
        tripDetail.roundTripCount === 0
      ) {
        return tripDetail.pickUp?.address;
      }
      return tripDetail.returnPickUp?.address;
    }
    if (status === TripStatusAll.DROP_OFF) {
      if (
        tripDetail.tripType === TripType.ONE_WAY ||
        tripDetail.roundTripCount === 0
      ) {
        return tripDetail.dropOff.address;
      }
      return tripDetail.returnDropOff.address;
    }
    return '';
  };

  /**
   *
   * @param status
   *  @description This function is used to get time stamp
   * @memberof TripCheckPoint
   * @example
   * getTimeStamp(TripStatusAll.PICKUP);
   * @returns
   */
  const getTimeStamp = (status: TripStatusAll) => {
    // if (tripDetail.status === TripStatusAll.INITIAL_COMPLETE) {
    //   return '';
    // }
    if (tripDetail.statusHistory && tripDetail.statusHistory?.length > 0) {
      const foundStatus = tripDetail.statusHistory.find(
        item => item.status === status,
      );
      const timestamp = foundStatus?.timeStamp;
      if (timestamp) {
        return DateUtils.formateLocalDate(
          timestamp,
          DateFormat.MM_DD_YYYY_HH_MM_A,
        );
      }
    }
    return '';
  };

  const renderAddress = (
    label: string,
    statusText: string,
    address: string,
    date: string,
  ) => (
    <>
      <AppText
        text={label}
        fontFamily={AppFonts.GentiumBasic_Regular}
        fontSize={AppSpacing[16]}
      />
      <AppText
        text={statusText}
        fontFamily={AppFonts.GentiumBasic_Regular}
        fontSize={AppSpacing[14]}
        fontColor={AppColors.peanBlue}
      />
      <AppText
        text={address}
        fontFamily={AppFonts.GentiumBasic_Regular}
        fontSize={AppSpacing[16]}
      />
      <AppText
        text={date}
        fontFamily={AppFonts.GentiumBasic_Regular}
        fontSize={AppSpacing[12]}
        fontColor={AppColors.peanBlue80}
      />
    </>
  );
  const pickUpActive = isStatus(TripStatusAll.PICKUP);
  const inTransitActive = isStatus(TripStatusAll.IN_TRANSIT);
  const dropOffActive = isStatus(TripStatusAll.DROP_OFF);
  return (
    <View style={styles.tripCheckView}>
      <View>
        <View style={styles.rowView}>
          <View>
            <View
              style={
                pickUpActive ? styles.pickUpCheckActive : styles.pickUpCheck
              }>
              {pickUpActive && <IcCheckW />}
            </View>

            <View style={pickUpActive ? styles.vLineActive : styles.vLine} />
          </View>
          <View style={styles.address}>
            {renderAddress(
              translate('pickup'),
              pickUpActive ? translate('horse_pickup_completed') : '',
              getAddress(TripStatusAll.PICKUP) || '',
              getTimeStamp(TripStatusAll.PICKUP),
            )}
          </View>
        </View>

        <View style={styles.rowView}>
          <View>
            <View
              style={
                inTransitActive ? styles.pickUpCheckActive : styles.pickUpCheck
              }>
              {inTransitActive && <IcCheckW />}
            </View>
            <View style={inTransitActive ? styles.vLineActive : styles.vLine} />
          </View>
          <View style={styles.address}>
            {renderAddress(
              translate('in_transit'),
              inTransitActive
                ? translate('driver_in_transit_transporting')
                : translate('Waiting_for_transportation'),
              getAddress(TripStatusAll.IN_TRANSIT) || '',
              getTimeStamp(TripStatusAll.IN_TRANSIT),
            )}
          </View>
        </View>

        <View style={styles.rowView}>
          <View>
            <View
              style={
                dropOffActive ? styles.dropOffCheckActive : styles.dropOffCheck
              }>
              {dropOffActive && <IcCheckW />}
            </View>
          </View>

          <View style={styles.address}>
            {renderAddress(
              translate('drop_off'),
              dropOffActive
                ? translate('driver_in_transit_transporting')
                : translate('Waiting_for_drop_off'),
              getAddress(TripStatusAll.DROP_OFF) || '',
              getTimeStamp(TripStatusAll.DROP_OFF),
            )}
          </View>
        </View>
      </View>
    </View>
  );
};
