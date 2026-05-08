import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {fireEvent, RenderResult, waitFor} from '@testing-library/react-native';

import {AppScreens, MyTripsTestKeys} from '~/constants';
import {TripStatusAll} from '~/enums/trips';
import {MyTripsScreen} from '~/screens';
import {TabOptions} from '~/screens/Tab/MyTrips/components/TripStatusTab';
import {useMyTripsController} from '~/screens/Tab/MyTrips/useMyTripController';

import {renderWithProvidersRow} from '../utils/TestUtils';

jest.mock('../../src/screens/Tab/MyTrips/useMyTripController', () => ({
  useMyTripsController: jest.fn(),
}));
const Stack = createNativeStackNavigator<MyTripsStackParamList>();

const mockTrips = [
  {
    _id: '1',
    name: 'Trip 1',
    status: TripStatusAll.ONGOING,
    pickUpDate: '2024-07-18',
    tripType: 'oneWay',
    pickUp: {address: 'Address 1'},
    dropOff: {address: 'Address 2'},
  },
  // ...more mock trips
];
describe('MyTrip', () => {
  let wrapper: RenderResult;
  beforeEach(() => {
    (useMyTripsController as jest.Mock).mockReturnValue({
      activeTabIndex: 0,
      tabOptions: TabOptions,
      onChangeActiveTab: jest.fn(),
      search: '',
      onSearchChange: jest.fn(),
      tripList: mockTrips,
      onRefresh: jest.fn(),
      onDetails: jest.fn(),
    });

    wrapper = renderWithProvidersRow(
      <NavigationContainer>
        <Stack.Navigator initialRouteName={AppScreens.MyTripsScreen}>
          <Stack.Screen
            name={AppScreens.MyTripsScreen}
            component={MyTripsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component', () => {
    expect(wrapper.getByTestId(MyTripsTestKeys.MY_TRIPS_SCREEN)).toBeTruthy();
  });
  it('should render the list of trips', () => {
    expect(wrapper.getAllByTestId(MyTripsTestKeys.TRIP_ITEM)).toHaveLength(
      mockTrips.length,
    );
  });

  it('should call onSearchChange when search input changes', async () => {
    const {getByTestId} = wrapper;
    const searchInput = getByTestId(MyTripsTestKeys.SEARCH);
    fireEvent.changeText(searchInput, 'Test Search');
    await waitFor(() => {
      expect(useMyTripsController().onSearchChange).toHaveBeenCalledWith(
        'Test Search',
      );
    });
  });
  it('should call onDetails when a trip item is pressed', async () => {
    const {getByTestId} = wrapper;
    const tripItem = getByTestId(MyTripsTestKeys.TRIP_VIEW);
    await waitFor(async () => {
      fireEvent.press(tripItem);
      expect(useMyTripsController().onDetails).toHaveBeenCalledWith(0);
    });
  });
  it('should call onRefresh when pull-to-refresh is triggered', async () => {
    const {getByTestId} = wrapper;
    const flatList = getByTestId(MyTripsTestKeys.TRIP_LIST);
    const {refreshControl} = flatList.props;
    await waitFor(() => {
      refreshControl.props.onRefresh();
      expect(useMyTripsController().onRefresh).toHaveBeenCalled();
    });
  });
  it('should call onChangeActiveTab when a tab is pressed', async () => {
    const {getByTestId} = wrapper;
    const tab = getByTestId(MyTripsTestKeys.TRIP_TAB + '1');
    await waitFor(() => {
      fireEvent.press(tab);
      expect(useMyTripsController().onChangeActiveTab).toHaveBeenCalledWith(1);
    });
  });
  it('should render the empty state when there are no trips', () => {
    (useMyTripsController as jest.Mock).mockReturnValue({
      activeTabIndex: 0,
      tabOptions: TabOptions,
      onChangeActiveTab: jest.fn(),
      search: '',
      onSearchChange: jest.fn(),
      tripList: [],
      onRefresh: jest.fn(),
      onDetails: jest.fn(),
    });
    const {getByTestId} = renderWithProvidersRow(
      <NavigationContainer>
        <Stack.Navigator initialRouteName={AppScreens.MyTripsScreen}>
          <Stack.Screen
            name={AppScreens.MyTripsScreen}
            component={MyTripsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    expect(getByTestId(MyTripsTestKeys.EMPTY_TRIP)).toBeTruthy();
  });
});
