import React from 'react';
import {View} from 'react-native';

import {AppText} from '~/components';
import {AppColors, AppFonts, AppSpacing, MyTripsTestKeys} from '~/constants';
import {TripStatusAll} from '~/enums/trips';

import styles from './styles';

/**
 *  @interface ITripStatus
 *  @param {string} status - The status of the trip.
 *  @param {string} testID - The test ID for testing purposes.
 *  @param {any} containerStyle - The style for the container view.
 */
interface ITripStatus {
  status: string;
  testID?: string;
  containerStyle?: any;
}
const TripStatusTitle = [
  {
    key: 'All',
    title: 'All',
    tripTitle: 'All',
    status: [],
  },
  {
    key: 'Current',
    title: 'Current',
    tripTitle: 'Current Trip',
    status: [
      TripStatusAll.ONGOING,
      TripStatusAll.PICKUP,
      TripStatusAll.IN_TRANSIT,
      TripStatusAll.ARRIVED,
      TripStatusAll.DROP_OFF,
      TripStatusAll.INITIAL_COMPLETE,
    ],
  },
  {
    key: 'Upcoming',
    title: 'Upcoming',
    tripTitle: 'Upcoming Trip',
    status: [TripStatusAll.UPCOMING, TripStatusAll.CONFIRM],
  },
  {
    key: 'Completed',
    title: 'Completed',
    tripTitle: 'Completed Trip',
    status: [TripStatusAll.COMPLETED],
  },
  {
    key: 'Cancel',
    title: 'Cancel',
    tripTitle: 'Cancelled Trip',
    status: [TripStatusAll.CANCEL],
  },
];

/**
 *
 * @param prop
 *  @description This component displays the status of the trip.
 * @param testID
 * @param status
 * @returns
 */

export const TripStatus = (prop: ITripStatus) => {
  const getStatus = (status: TripStatusAll) => {
    let title =
      TripStatusTitle.find(item => item.status.includes(status))?.tripTitle ||
      '';
    let view = null;
    switch (status) {
      case TripStatusAll.UPCOMING:
      case TripStatusAll.CONFIRM:
        view = (
          <View style={[styles.upcomingStatus, prop.containerStyle]}>
            <AppText
              testID={MyTripsTestKeys.TRIP_STATUS}
              text={title}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontSize={AppSpacing[14]}
              fontColor={AppColors.upcomingText}
            />
          </View>
        );
        break;
      case TripStatusAll.CANCEL:
        view = (
          <View style={[styles.cancelStatus, prop.containerStyle]}>
            <AppText
              testID={MyTripsTestKeys.TRIP_STATUS}
              text={title}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontSize={AppSpacing[14]}
              fontColor={AppColors.errorText}
            />
          </View>
        );
        break;
      case TripStatusAll.PICKUP:
      case TripStatusAll.IN_TRANSIT:
      case TripStatusAll.ARRIVED:
      case TripStatusAll.INITIAL_COMPLETE:
      case TripStatusAll.DROP_OFF:
        view = (
          <View style={[styles.ongoingStatus, prop.containerStyle]}>
            <AppText
              testID={MyTripsTestKeys.TRIP_STATUS}
              text={title}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontSize={AppSpacing[14]}
              fontColor={AppColors.peanBlue}
            />
          </View>
        );
        break;
      case TripStatusAll.COMPLETED:
        view = (
          <View style={[styles.completeStatus, prop.containerStyle]}>
            <AppText
              testID={MyTripsTestKeys.TRIP_STATUS}
              text={title}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontSize={AppSpacing[14]}
              fontColor={AppColors.completeText}
            />
          </View>
        );
        break;
    }

    return view;
  };

  return <>{getStatus(prop.status as TripStatusAll)}</>;
};
