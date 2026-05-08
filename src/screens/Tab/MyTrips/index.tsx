import React from 'react';
import {RefreshControl, View} from 'react-native';

import {AppFlatList, AppNoData, AppScreen} from '~/components';
import {MyTripsTestKeys} from '~/constants';
import {translate} from '~/localization';

import {SearchBar} from './components/Search';
import {TripListItem} from './components/TripListItem';
import {TripStatus} from './components/TripStatusTab';
import styles from './styles';
import {useMyTripsController} from './useMyTripController';
/**
 * My Trips Screen
 * @returns {JSX.Element}
 *  @requires useMyTripsController
 * @requires TripListItem
 * @requires TripStatus
 * @requires SearchBar
 * @requires AppFlatList
 * @requires AppNoData
 * @requires AppScreen
 * @requires translate
 * @requires styles
 * @requires MyTripsTestKeys
 * @example
 * <MyTripsScreen />
 *
 */
export const MyTripsScreen = () => {
  const {
    activeTabIndex,
    onChangeActiveTab,
    search,
    onSearchChange,
    tripList,
    onRefresh,
    onDetails,
  } = useMyTripsController();

  const renderTrip = (item: TripItem, index: number) => {
    return (
      <TripListItem
        testID={MyTripsTestKeys.TRIP_ITEM}
        btnTestID={MyTripsTestKeys.TRIP_VIEW}
        trip={item}
        key={item._id}
        index={index}
        onDetails={onDetails}
      />
    );
  };

  return (
    <AppScreen
      header={translate('MyTrips')}
      headerStyle={styles.header}
      testID={MyTripsTestKeys.MY_TRIPS_SCREEN}>
      <>
        <View>
          <TripStatus
            activeIndex={activeTabIndex}
            setActiveIndex={onChangeActiveTab}
            testID={MyTripsTestKeys.TRIP_TAB}
          />

          <SearchBar
            testID={MyTripsTestKeys.SEARCH}
            search={search}
            onChange={onSearchChange}
          />
        </View>
        <AppFlatList
          testID={MyTripsTestKeys.TRIP_LIST}
          style={styles.container}
          data={tripList}
          renderItem={({item, index}) => renderTrip(item as TripItem, index)}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View
              style={styles.emptyContainer}
              testID={MyTripsTestKeys.EMPTY_TRIP}>
              <AppNoData text={translate('NoTrips')} />
            </View>
          }
        />
      </>
    </AppScreen>
  );
};
