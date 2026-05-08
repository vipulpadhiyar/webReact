import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {fireEvent, RenderResult} from '@testing-library/react-native';

import {AppScreens, QuetosDetailsScreenTestKeys} from '~/constants';
import {QuetosDetailsScreen} from '~/screens';
import {useQuetosDetailsController} from '~/screens/QuetosDetailsScreen/controller';

import {renderWithProvidersRow} from '../utils/TestUtils';

jest.mock('../../src/screens/QuetosDetailsScreen/controller.ts', () => ({
  useQuetosDetailsController: jest.fn(),
}));
const Stack = createNativeStackNavigator<QuotesStackParamList>();

describe('Quetos details Screen', () => {
  let wrapper: RenderResult;
  beforeEach(() => {
    (useQuetosDetailsController as jest.Mock).mockReturnValue({
      isExpandView: false,
      quetosDetails: {_id: '1', someProperty: 'Value'},
      successModelRef: {current: {open: jest.fn(), close: jest.fn()}},
      modalRef: {current: {open: jest.fn(), close: jest.fn()}},
      onPressGoBack: jest.fn(),
      setExpandView: jest.fn(),
      onPressAccept: jest.fn(),
      onDone: jest.fn(),
      onPressDecline: jest.fn(),
      onPressDeclineAll: jest.fn(),
      openModal: jest.fn(),
      closeModal: jest.fn(),
    });

    wrapper = renderWithProvidersRow(
      <NavigationContainer>
        <Stack.Navigator initialRouteName={AppScreens.QuetosDetailsScreen}>
          <Stack.Screen
            name={AppScreens.QuetosDetailsScreen}
            component={QuetosDetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render quetos details the component', () => {
    expect(
      wrapper.getByTestId(QuetosDetailsScreenTestKeys.QUETOS_DETAILS_SCREEN),
    ).toBeTruthy();
  });
  it('should call setExpandView when collapse view is pressed', () => {
    const collapseView = wrapper.getByTestId(
      QuetosDetailsScreenTestKeys.COLLAPSE_VIEW,
    );
    expect(collapseView).toBeTruthy();
    fireEvent.press(collapseView);
    expect(useQuetosDetailsController().setExpandView).toHaveBeenCalled();
  });
});
describe('Quetos details Screen collapse view', () => {
  let wrapper: RenderResult;
  beforeEach(() => {
    (useQuetosDetailsController as jest.Mock).mockReturnValue({
      isExpandView: true,
      quetosDetails: {_id: '1', someProperty: 'Value'},
      successModelRef: {current: {open: jest.fn(), close: jest.fn()}},
      modalRef: {current: {open: jest.fn(), close: jest.fn()}},
      onPressGoBack: jest.fn(),
      setExpandView: jest.fn(),
      onPressAccept: jest.fn(),
      onDone: jest.fn(),
      onPressDecline: jest.fn(),
      onPressDeclineAll: jest.fn(),
      openModal: jest.fn(),
      closeModal: jest.fn(),
    });

    wrapper = renderWithProvidersRow(
      <NavigationContainer>
        <Stack.Navigator initialRouteName={AppScreens.QuetosDetailsScreen}>
          <Stack.Screen
            name={AppScreens.QuetosDetailsScreen}
            component={QuetosDetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render quetos details the component', () => {
    expect(
      wrapper.getByTestId(QuetosDetailsScreenTestKeys.QUETOS_DETAILS_SCREEN),
    ).toBeTruthy();
  });
  it('should call setExpandView when collapse view is pressed', () => {
    const expandView = wrapper.getByTestId(
      QuetosDetailsScreenTestKeys.EXPAND_VIEW,
    );
    expect(expandView).toBeTruthy();
    fireEvent.press(expandView);
    expect(useQuetosDetailsController().setExpandView).toHaveBeenCalled();
  });
  it('should render trip name', () => {
    expect(
      wrapper.getByTestId(QuetosDetailsScreenTestKeys.TRIP_NAME),
    ).toBeTruthy();
  });
  it('should render pick up date', () => {
    expect(
      wrapper.getByTestId(QuetosDetailsScreenTestKeys.PICK_UP_DATE),
    ).toBeTruthy();
  });
  it('should render trip type', () => {
    expect(
      wrapper.getByTestId(QuetosDetailsScreenTestKeys.TRIP_TYPE),
    ).toBeTruthy();
  });
  it('should render pick up location', () => {
    expect(
      wrapper.getByTestId(QuetosDetailsScreenTestKeys.PICK_UP_LOCATION),
    ).toBeTruthy();
  });
  it('should render drop up location', () => {
    expect(
      wrapper.getByTestId(QuetosDetailsScreenTestKeys.DROP_UP_LOCATION),
    ).toBeTruthy();
  });
  it('should render trailer type', () => {
    expect(
      wrapper.getByTestId(QuetosDetailsScreenTestKeys.TRAILER_TYPE),
    ).toBeTruthy();
  });
  it('should render horse', () => {
    expect(
      wrapper.getByTestId(QuetosDetailsScreenTestKeys.HORSES),
    ).toBeTruthy();
  });
  it('should render notes', () => {
    expect(wrapper.getByTestId(QuetosDetailsScreenTestKeys.NOTES)).toBeTruthy();
  });
});
