import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {fireEvent, RenderResult} from '@testing-library/react-native';

import {AppScreens, NotificationScreenTestKeys} from '~/constants';
import {NotificationScreen} from '~/screens';
import {useNotificationController} from '~/screens/NotificationScreen/controller';

import {renderWithProvidersRow} from '../utils/TestUtils';

jest.mock('react-native-gesture-handler', () => ({
  Swipeable: jest.fn(),
}));

jest.mock('../../src/screens/NotificationScreen/controller.tsx', () => ({
  useNotificationController: jest.fn(),
}));

const Stack = createNativeStackNavigator<HomeScreenStackParamList>();

describe('Notification Screen', () => {
  let wrapper: RenderResult;

  beforeEach(() => {
    (useNotificationController as jest.Mock).mockReturnValue({
      isFetching: false,
      isRefetching: false,
      notificationList: [{id: '1', title: 'Test Notification'}],
      modalRef: React.createRef(),
      refetch: jest.fn(),
      onPressGoBack: jest.fn(),
      onEndReachedHandler: jest.fn(),
      onPressDeleteAllNotification: jest.fn(),
      closeModal: jest.fn(),
      openModal: jest.fn(),
      onPressDeleteNotification: jest.fn(),
    });

    wrapper = renderWithProvidersRow(
      <NavigationContainer>
        <Stack.Navigator initialRouteName={AppScreens.NotificationScreen}>
          <Stack.Screen
            name={AppScreens.NotificationScreen}
            component={NotificationScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Displays Notification screen', async () => {
    const {getByTestId} = wrapper;
    expect(
      getByTestId(NotificationScreenTestKeys.NOTIFICATION_SCREEN),
    ).toBeTruthy();
  });

  it('Renders notification items', () => {
    (useNotificationController as jest.Mock).mockReturnValue({
      notificationList: [{id: '1', title: 'Test Notification'}],
    });
  });

  it('Opens modal on delete all button press', () => {
    const {getByTestId} = wrapper;
    fireEvent.press(getByTestId(NotificationScreenTestKeys.DELETE_ALL_BUTTON));

    expect(useNotificationController().openModal).toHaveBeenCalled();
  });
});
describe('Notification Screen open modal', () => {
  let wrapper: RenderResult;
  const mockOpenModal = jest.fn();
  const mockCloseModal = jest.fn();
  const mockOnPressDeleteAllNotification = jest.fn();

  beforeEach(() => {
    (useNotificationController as jest.Mock).mockReturnValue({
      isFetching: false,
      isRefetching: false,
      notificationList: [],
      modalRef: {current: {open: jest.fn()}},
      refetch: jest.fn(),
      onPressGoBack: jest.fn(),
      onEndReachedHandler: jest.fn(),
      onPressDeleteAllNotification: mockOnPressDeleteAllNotification,
      closeModal: mockCloseModal,
      openModal: mockOpenModal,
      onPressDeleteNotification: jest.fn(),
    });

    wrapper = renderWithProvidersRow(
      <NavigationContainer>
        <Stack.Navigator initialRouteName={AppScreens.NotificationScreen}>
          <Stack.Screen
            name={AppScreens.NotificationScreen}
            component={NotificationScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Displays Notification screen', async () => {
    const {getByTestId} = wrapper;
    expect(
      getByTestId(NotificationScreenTestKeys.NOTIFICATION_SCREEN),
    ).toBeTruthy();
  });
});
