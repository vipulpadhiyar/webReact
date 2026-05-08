import React from 'react';
import {ScrollView} from 'react-native';

import {AppText, AppTouchable} from '~/components';
import {AppColors, AppFonts, AppSpacing} from '~/constants';
import {TripStatusAll} from '~/enums/trips';

import {useMyTripsController} from '../../useMyTripController';

import styles from './styles';
/**
 *  @typedef {Object} ITripStatus
 *  @property {number} activeIndex - The active index of the tab
 *  @property {string} testID - The test ID for testing purposes
 *  @property {function} setActiveIndex - The function to set the active index
 */
interface ITripStatus {
  activeIndex: number;
  testID?: string;
  setActiveIndex: (index: number) => void;
}

export const TabOptions = [
  {
    key: 'All',
    title: 'All',
    tripTitle: 'All',
    value: '',
  },
  {
    key: 'Current',
    title: 'Current',
    tripTitle: 'Current Trip',
    value: TripStatusAll.ONGOING,
  },
  {
    key: 'Upcoming',
    title: 'Upcoming',
    tripTitle: 'Upcoming Trip',
    value: TripStatusAll.UPCOMING,
  },
  {
    key: 'Completed',
    title: 'Completed',
    tripTitle: 'Completed Trip',
    value: TripStatusAll.COMPLETED,
  },
  {
    key: 'Cancel',
    title: 'Cancel',
    tripTitle: 'Cancelled Trip',
    value: TripStatusAll.CANCEL,
  },
];
/**
 *  @typedef {Object} ITripStatus
 *  @property {number} activeIndex - The active index of the tab
 *  @property {string} testID - The test ID for testing purposes
 *  @property {function} setActiveIndex - The function to set the active index
 *  @returns {JSX.Element} - The rendered TripStatus component
 *  @description This component renders the trip status tabs
 *  @example <TripStatus activeIndex={0} setActiveIndex={() => {}} />
 *  @memberof TripStatus
 *  @namespace TripStatus
 */
export const TripStatus = (props: ITripStatus) => {
  const {activeIndex, setActiveIndex, testID = ''} = props;
  const {tabOptions} = useMyTripsController();

  const renderTab = (item: TripTabOptions, index: number) => {
    const onActive = () => setActiveIndex(index);
    return (
      <AppTouchable
        testID={testID + index}
        key={item.title}
        style={index === activeIndex ? styles.activeTab : styles.inactiveTab}
        onPress={onActive}>
        <AppText
          text={item.title || ''}
          fontColor={
            index === activeIndex ? AppColors.white : AppColors.peanBlue
          }
          fontFamily={AppFonts.GentiumBasic_Regular}
          fontSize={AppSpacing[14]}
        />
      </AppTouchable>
    );
  };
  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.content}
      showsHorizontalScrollIndicator={false}>
      {tabOptions.map(renderTab)}
    </ScrollView>
  );
};
