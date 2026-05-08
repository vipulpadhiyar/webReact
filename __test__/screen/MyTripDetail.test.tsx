import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {fireEvent, RenderResult, waitFor} from '@testing-library/react-native';

import {AppScreens, TripDetailTestKeys} from '~/constants';
import {MyTripDetail} from '~/screens';
import {useMyTripDetailController} from '~/screens/Trips/MyTripDetail/useMyTripDetailsController';

import {renderWithProvidersRow} from '../utils/TestUtils';

jest.mock(
  '../../src/screens/Trips/MyTripDetail/useMyTripDetailsController',
  () => ({
    useMyTripDetailController: jest.fn(),
  }),
);
const Stack = createNativeStackNavigator<MyTripsStackParamList>();

describe('MyTripDetail', () => {
  let wrapper: RenderResult;
  beforeEach(() => {
    (useMyTripDetailController as jest.Mock).mockReturnValue({
      isSuccess: true,
      tripDetail: {
        _id: '1',
        name: 'Test Trip',
        status: 'upcoming',
        tripType: 'ONE_WAY',
        pickUpDate: '2024-07-18',
        pickUp: {address: '123 Main St'},
        dropOff: {address: '456 Elm St'},
        trailer: ['FLATBED'],
        horses: [{horseName: 'Spirit'}],
        notes: 'No notes',
      },
      modalDeleteRef: {current: {open: jest.fn(), close: jest.fn()}},
      onBack: jest.fn(),
      getTrailerTypes: jest.fn().mockReturnValue('Flatbed'),
      getHorsesNames: jest.fn().mockReturnValue('Spirit'),
      openModalDelete: jest.fn(),
      closeModalDelete: jest.fn(),
      cancelTripHandler: jest.fn(),
    });

    wrapper = renderWithProvidersRow(
      <NavigationContainer>
        <Stack.Navigator initialRouteName={AppScreens.MyTripDetailScreen}>
          <Stack.Screen
            name={AppScreens.MyTripDetailScreen}
            component={MyTripDetail}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );
  });

  it('renders trip details correctly', () => {
    const {getByText} = wrapper;
    expect(getByText('Trip Details')).toBeTruthy();
    expect(getByText('Test Trip')).toBeTruthy();
    expect(getByText('123 Main St')).toBeTruthy();
    expect(getByText('456 Elm St')).toBeTruthy();
    expect(getByText('Flatbed')).toBeTruthy();
    expect(getByText('Spirit')).toBeTruthy();
  });

  it('opens modal and cancels trip', async () => {
    const {getByTestId} = wrapper;
    fireEvent.press(getByTestId(TripDetailTestKeys.CANCEL_TRIP));
    await waitFor(() => {
      expect(useMyTripDetailController().openModalDelete).toHaveBeenCalled();
    });
  });
});

describe('MyTripDetail transport details', () => {
  let wrapper: RenderResult;
  beforeEach(() => {
    (useMyTripDetailController as jest.Mock).mockReturnValue({
      isSuccess: true,
      tripDetail: {
        _id: '66a0b7555dc660d8fe9559f5',
        horses: [
          {
            horseName: 'Faster',
            _id: '669f49fec45a7fa9dc25e52a',
          },
        ],
        incident: 'sadfdsfdsf',
        pickUpDate: '2024-07-25T00:00:00.000Z',
        statusHistory: [
          {
            status: 'pickup',
            location: {
              address: 'string',
              city: 'string',
              state: 'string',
              country: 'string',
              pincode: 'string',
              lng: 0,
              lat: 0,
            },
            timeStamp: '2024-07-24T09:49:27.201Z',
          },
          {
            status: 'inTransit',
            location: {
              address: 'string',
              city: 'string',
              state: 'string',
              country: 'string',
              pincode: 'string',
              lng: 0,
              lat: 0,
            },
            timeStamp: '2024-07-24T09:49:36.051Z',
          },
          {
            status: 'arrived',
            location: {
              address: 'string',
              city: 'string',
              state: 'string',
              country: 'string',
              pincode: 'string',
              lng: 0,
              lat: 0,
            },
            timeStamp: '2024-07-24T09:49:42.574Z',
          },
          {
            status: 'dropOff',
            location: {
              address: 'string',
              city: 'string',
              state: 'string',
              country: 'string',
              pincode: 'string',
              lng: 0,
              lat: 0,
            },
            timeStamp: '2024-07-24T09:49:57.643Z',
          },
          {
            status: 'completed',
            location: {
              address: 'string',
              city: 'string',
              state: 'string',
              country: 'string',
              pincode: 'string',
              lng: 0,
              lat: 0,
            },
            timeStamp: '2024-07-24T09:50:04.576Z',
          },
        ],
        companyOwnerName: 'jennifer roy',
        lastPickUpDate: '2024-07-25T00:00:00.000Z',
        pickUp: {
          city: 'Aventura',
          address: 'Aventura Mall, Biscayne Boulevard, Aventura, FL, USA',
          state: 'Florida',
          lat: 0,
          lng: 0,
          country: 'United States',
          pincode: '33180',
        },
        dropOff: {
          city: 'Albuquerque',
          address: 'U.S. Route 66, Albuquerque, NM, USA',
          state: 'New Mexico',
          lat: 0,
          lng: 0,
          country: 'United States',
          pincode: '87105',
        },
        notes: 'Test gvt',
        name: 'Testing',
        status: 'confirm',
        returnDate: '2024-07-25T00:00:00.000Z',
        lastReturnDate: '2024-07-25T00:00:00.000Z',
        tripType: 'roundTrip',
        returnPickUp: {
          city: 'Albuquerque',
          address: 'U.S. Route 66, Albuquerque, NM, USA',
          state: 'New Mexico',
          lat: 0,
          lng: 0,
          country: 'United States',
          pincode: '87105',
        },
        returnDropOff: {
          city: 'Aventura',
          address: 'Aventura Mall, Biscayne Boulevard, Aventura, FL, USA',
          state: 'Florida',
          lat: 0,
          lng: 0,
          country: 'United States',
          pincode: '33180',
        },
        trailer: ['bumper_pull', 'head_to_head'],
        transportCompany: 'Gill and Small Trading',
        tcPhoneNo: '+1 1974107241',
        tcEmail: 'tego@mailinator.com',
        driverName: 'khushi rudani',
        myReview: {},
        amount: 11,
        isFlexiblePickUpDate: false,
        isFlexibleReturnDate: false,
        averageReview: 0,
      },
      modalDeleteRef: {current: {open: jest.fn(), close: jest.fn()}},
      onBack: jest.fn(),
      getTrailerTypes: jest.fn().mockReturnValue('Flatbed'),
      getHorsesNames: jest.fn().mockReturnValue('Spirit'),
      openModalDelete: jest.fn(),
      closeModalDelete: jest.fn(),
      cancelTripHandler: jest.fn(),
    });

    wrapper = renderWithProvidersRow(
      <NavigationContainer>
        <Stack.Navigator initialRouteName={AppScreens.MyTripDetailScreen}>
          <Stack.Screen
            name={AppScreens.MyTripDetailScreen}
            component={MyTripDetail}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );
  });

  it('Display transport details', async () => {
    const {getByTestId} = wrapper;
    expect(getByTestId(TripDetailTestKeys.TRANSPORT_DETAILS)).toBeTruthy();
  });
  it('Display incident details', async () => {
    const {getByTestId} = wrapper;
    expect(getByTestId(TripDetailTestKeys.INCIDENT_REPORT)).toBeTruthy();
  });
  it('Display trip update details', async () => {
    const {getByTestId} = wrapper;
    expect(getByTestId(TripDetailTestKeys.TRIP_UPDATE)).toBeTruthy();
  });
});
