import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RenderResult} from '@testing-library/react-native';

import {AppScreens, QuetosScreenTestKeys} from '~/constants';
import {QuetosENUM} from '~/enums/quetos';
import {QuotesScreen} from '~/screens';
import {useQuetosController} from '~/screens/Tab/Quotes/controller';

import {renderWithProvidersRow} from '../utils/TestUtils';

jest.mock('../../src/screens/Tab/Quotes/controller.ts', () => ({
  useQuetosController: jest.fn(),
}));
const Stack = createNativeStackNavigator<QuotesStackParamList>();

describe('Quetos Screen ', () => {
  let wrapper: RenderResult;
  beforeEach(() => {
    (useQuetosController as jest.Mock).mockReturnValue({
      quetosStatusData: [
        {label: 'Status 1', value: 'Value 1', isSelected: false},
        {label: 'Status 2', value: 'Value 2', isSelected: true},
      ],
      searchDebounceFunction: jest.fn(),
      quetosPendingList: [
        {_id: '1', someProperty: 'Value 1'},
        {_id: '2', someProperty: 'Value 2'},
      ],
      isFetching: false,
      isRefetching: false,
      searchDebounceFunctionReceived: jest.fn(),
      searchDebounceFunctionDecline: jest.fn(),
      currentStatus: QuetosENUM.PENDING_QUETOS,
      isFetchingReceived: false,
      isRefetchingReceived: false,
      quetosReceivedList: [
        {_id: '1', someProperty: 'Value 1'},
        {_id: '2', someProperty: 'Value 2'},
      ],
      isFetchingDecline: false,
      isRefetchingDecline: false,
      quetosDeclineList: [
        {_id: '1', someProperty: 'Value 1'},
        {_id: '2', someProperty: 'Value 2'},
      ],
      flatListRef: React.createRef(),
      onEndReachedHandlerReceivedQuetos: jest.fn(),
      refetchDeclineQuetos: jest.fn(),
      refetchReceivedQuetos: jest.fn(),
      refetch: jest.fn(),
      onPressStatus: jest.fn(),
      onEndReachedHandler: jest.fn(),
      onPressQuetosDetails: jest.fn(),
    });

    wrapper = renderWithProvidersRow(
      <NavigationContainer>
        <Stack.Navigator initialRouteName={AppScreens.QuotesScreen}>
          <Stack.Screen
            name={AppScreens.QuotesScreen}
            component={QuotesScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component', () => {
    expect(
      wrapper.getByTestId(QuetosScreenTestKeys.QUETOS_SCREEN),
    ).toBeTruthy();
  });
  it('should search the component', () => {
    expect(wrapper.getByTestId(QuetosScreenTestKeys.SEARCH)).toBeTruthy();
  });
  it('should title the component', () => {
    expect(wrapper.getByTestId(QuetosScreenTestKeys.TITLE)).toBeTruthy();
  });
  it('should status list the component', () => {
    expect(wrapper.getByTestId(QuetosScreenTestKeys.STATUS_LIST)).toBeTruthy();
  });
  it('should quetos pending list the component', () => {
    expect(
      wrapper.getByTestId(QuetosScreenTestKeys.QUETOS_PENDING_LIST),
    ).toBeTruthy();
  });
});
describe('Quetos Screen phase 2', () => {
  let wrapper: RenderResult;
  beforeEach(() => {
    (useQuetosController as jest.Mock).mockReturnValue({
      quetosStatusData: [
        {label: 'Status 1', value: 'Value 1', isSelected: false},
        {label: 'Status 2', value: 'Value 2', isSelected: true},
      ],
      searchDebounceFunction: jest.fn(),
      quetosPendingList: [],
      isFetching: false,
      isRefetching: false,
      searchDebounceFunctionReceived: jest.fn(),
      searchDebounceFunctionDecline: jest.fn(),
      currentStatus: QuetosENUM.QUETOS_RECEIVED,
      isFetchingReceived: false,
      isRefetchingReceived: false,
      quetosReceivedList: [
        {_id: '1', someProperty: 'Value 1'},
        {_id: '2', someProperty: 'Value 2'},
      ],
      isFetchingDecline: false,
      isRefetchingDecline: false,
      quetosDeclineList: [],
      flatListRef: React.createRef(),
      onEndReachedHandlerReceivedQuetos: jest.fn(),
      refetchDeclineQuetos: jest.fn(),
      refetchReceivedQuetos: jest.fn(),
      refetch: jest.fn(),
      onPressStatus: jest.fn(),
      onEndReachedHandler: jest.fn(),
      onPressQuetosDetails: jest.fn(),
    });

    wrapper = renderWithProvidersRow(
      <NavigationContainer>
        <Stack.Navigator initialRouteName={AppScreens.QuotesScreen}>
          <Stack.Screen
            name={AppScreens.QuotesScreen}
            component={QuotesScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should quetos received pending list the component', () => {
    expect(
      wrapper.getByTestId(QuetosScreenTestKeys.QUETOS_RECEIVED_LIST),
    ).toBeTruthy();
  });
});

describe('Quetos Screen phase 3', () => {
  let wrapper: RenderResult;
  beforeEach(() => {
    (useQuetosController as jest.Mock).mockReturnValue({
      quetosStatusData: [
        {label: 'Status 1', value: 'Value 1', isSelected: false},
        {label: 'Status 2', value: 'Value 2', isSelected: true},
      ],
      searchDebounceFunction: jest.fn(),
      quetosPendingList: [],
      isFetching: false,
      isRefetching: false,
      searchDebounceFunctionReceived: jest.fn(),
      searchDebounceFunctionDecline: jest.fn(),
      currentStatus: QuetosENUM.DECLINE_QUETOS,
      isFetchingReceived: false,
      isRefetchingReceived: false,
      quetosReceivedList: [],
      isFetchingDecline: false,
      isRefetchingDecline: false,
      quetosDeclineList: [
        {_id: '1', someProperty: 'Value 1'},
        {_id: '2', someProperty: 'Value 2'},
      ],
      flatListRef: React.createRef(),
      onEndReachedHandlerReceivedQuetos: jest.fn(),
      refetchDeclineQuetos: jest.fn(),
      refetchReceivedQuetos: jest.fn(),
      refetch: jest.fn(),
      onPressStatus: jest.fn(),
      onEndReachedHandler: jest.fn(),
      onPressQuetosDetails: jest.fn(),
    });

    wrapper = renderWithProvidersRow(
      <NavigationContainer>
        <Stack.Navigator initialRouteName={AppScreens.QuotesScreen}>
          <Stack.Screen
            name={AppScreens.QuotesScreen}
            component={QuotesScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should quetos received pending list the component', () => {
    expect(
      wrapper.getByTestId(QuetosScreenTestKeys.QUETOS_DECLINE_LIST),
    ).toBeTruthy();
  });
});
