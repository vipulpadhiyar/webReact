import {fireEvent} from '@testing-library/react-native';

import {AppScreens, HomeScreenTestKeys} from '~/constants';
import {HomeScreen} from '~/screens/HomeScreen';

import {renderWithProviders} from '../utils/TestUtils';

// Mock useForgotPasswordController
jest.mock('../../src/screens/HomeScreen/controller.ts', () => ({
  useHomeScreenController: () => ({
    formik: {
      values: {
        horses: [''],
        name: '',
        tripType: '',
        pickUpDate: '',
        lastPickUpDate: '',
        pickUp: {
          address: '',
          city: '',
          state: '',
          country: '',
          pincode: '',
          lat: 0,
          lng: 0,
        },
        dropOff: {
          address: '',
          city: '',
          state: '',
          country: '',
          pincode: '',
          lat: 0,
          lng: 0,
        },
        returnDropOff: {
          address: '',
          city: '',
          state: '',
          country: '',
          pincode: '',
          lat: 0,
          lng: 0,
        },
        returnPickUp: {
          address: '',
          city: '',
          state: '',
          country: '',
          pincode: '',
          lat: 0,
          lng: 0,
        },
        returnDate: '',
        lastReturnDate: '',
        trailer: '',
        notes: '',
        horseList: [{horseName: ''}],
        trailerList: [{trailerName: ''}],
        fullAddress: '',
        fullDropOffAddress: '',
        fullAddressRound: '',
        fullDropOffAddressRound: '',
      },
      setFieldValue: jest.fn(),
      handleSubmit: jest.fn(),
      validateForm: jest.fn(),
      handleChange: jest.fn(),
      isValid: true,
      touched: {
        horses: true,
        name: true,
        tripType: true,
        pickUpDate: true,
        lastPickUpDate: true,
        'pickUp.address': true,
        'pickUp.city': true,
        'pickUp.state': true,
        'pickUp.country': true,
        'pickUp.pincode': true,
        dropOff: true,
        'dropOff.address': true,
        'dropOff.city': true,
        'dropOff.state': true,
        'dropOff.country': true,
        'dropOff.pincode': true,
        returnDropOff: true,
        'returnDropOff.address': true,
        'returnDropOff.city': true,
        'returnDropOff.state': true,
        'returnDropOff.country': true,
        'returnDropOff.pincode': true,
        returnPickUp: true,
        'returnPickUp.address': true,
        'returnPickUp.city': true,
        'returnPickUp.state': true,
        'returnPickUp.country': true,
        'returnPickUp.pincode': true,
        returnDate: true,
        lastReturnDate: true,
        trailer: true,
        notes: true,
        'horseList[0].horseName': true,
        'trailerList[0].trailerName': true,
        fullAddress: true,
        fullDropOffAddress: true,
        fullAddressRound: true,
        fullDropOffAddressRound: true,
      },
      errors: {
        horses: 'Invalid horses',
        name: 'Name is required',
        tripType: 'Trip type is required',
        pickUpDate: 'Invalid pickUpDate',
        lastPickUpDate: 'Invalid lastPickUpDate',
        'pickUp.address': 'Invalid pickUp address',
        'pickUp.city': 'Invalid pickUp city',
        'pickUp.state': 'Invalid pickUp state',
        'pickUp.country': 'Invalid pickUp country',
        'pickUp.pincode': 'Invalid pickUp pincode',
        dropOff: 'Invalid dropOff',
        'dropOff.address': 'Invalid dropOff address',
        'dropOff.city': 'Invalid dropOff city',
        'dropOff.state': 'Invalid dropOff state',
        'dropOff.country': 'Invalid dropOff country',
        'dropOff.pincode': 'Invalid dropOff pincode',
        returnDropOff: 'Invalid returnDropOff',
        'returnDropOff.address': 'Invalid returnDropOff address',
        'returnDropOff.city': 'Invalid returnDropOff city',
        'returnDropOff.state': 'Invalid returnDropOff state',
        'returnDropOff.country': 'Invalid returnDropOff country',
        'returnDropOff.pincode': 'Invalid returnDropOff pincode',
        returnPickUp: 'Invalid returnPickUp',
        'returnPickUp.address': 'Invalid returnPickUp address',
        'returnPickUp.city': 'Invalid returnPickUp city',
        'returnPickUp.state': 'Invalid returnPickUp state',
        'returnPickUp.country': 'Invalid returnPickUp country',
        'returnPickUp.pincode': 'Invalid returnPickUp pincode',
        returnDate: 'Invalid returnDate',
        lastReturnDate: 'Invalid lastReturnDate',
        trailer: 'Invalid trailer',
        notes: 'Invalid notes',
        'horseList[0].horseName': 'Invalid horse name',
        'trailerList[0].trailerName': 'Invalid trailer name',
        fullAddress: 'Invalid fullAddress',
        fullDropOffAddress: 'Invalid fullDropOffAddress',
        fullAddressRound: 'Invalid fullAddressRound',
        fullDropOffAddressRound: 'Invalid fullDropOffAddressRound',
      },
    },
    autoCompleteAddressList: [
      {
        description: 'Ranipet, Tamil Nadu, India',
        matched_substrings: [{length: 5, offset: 0}],
        place_id: 'ChIJm91xELA1rTsRE7Mc1H8D8UI',
        reference: 'ChIJm91xELA1rTsRE7Mc1H8D8UI',
        structured_formatting: {
          main_text: 'Ranipet',
          main_text_matched_substrings: [[Object]],
          secondary_text: 'Tamil Nadu, India',
        },
        terms: [
          {offset: 0, value: 'Ranipet'},
          {offset: 9, value: 'Tamil Nadu'},
          {offset: 21, value: 'India'},
        ],
        types: ['locality', 'geocode', 'political'],
      },
      {
        description: 'Ranipet, Tamil Nadu, India',
        matched_substrings: [{length: 5, offset: 0}],
        place_id: 'ChIJm91xELA1rTsRE7Mc1H8D8UI',
        reference: 'ChIJm91xELA1rTsRE7Mc1H8D8UI',
        structured_formatting: {
          main_text: 'Ranipet',
          main_text_matched_substrings: [[Object]],
          secondary_text: 'Tamil Nadu, India',
        },
        terms: [
          {offset: 0, value: 'Ranipet'},
          {offset: 9, value: 'Tamil Nadu'},
          {offset: 21, value: 'India'},
        ],
        types: ['locality', 'geocode', 'political'],
      },
    ],
    autoCompleteDropAddressList: [
      {
        description: 'Ranipet, Tamil Nadu, India',
        matched_substrings: [{length: 5, offset: 0}],
        place_id: 'ChIJm91xELA1rTsRE7Mc1H8D8UI',
        reference: 'ChIJm91xELA1rTsRE7Mc1H8D8UI',
        structured_formatting: {
          main_text: 'Ranipet',
          main_text_matched_substrings: [[Object]],
          secondary_text: 'Tamil Nadu, India',
        },
        terms: [
          {offset: 0, value: 'Ranipet'},
          {offset: 9, value: 'Tamil Nadu'},
          {offset: 21, value: 'India'},
        ],
        types: ['locality', 'geocode', 'political'],
      },
      {
        description: 'Ranipet, Tamil Nadu, India',
        matched_substrings: [{length: 5, offset: 0}],
        place_id: 'ChIJm91xELA1rTsRE7Mc1H8D8UI',
        reference: 'ChIJm91xELA1rTsRE7Mc1H8D8UI',
        structured_formatting: {
          main_text: 'Ranipet',
          main_text_matched_substrings: [[Object]],
          secondary_text: 'Tamil Nadu, India',
        },
        terms: [
          {offset: 0, value: 'Ranipet'},
          {offset: 9, value: 'Tamil Nadu'},
          {offset: 21, value: 'India'},
        ],
        types: ['locality', 'geocode', 'political'],
      },
    ],
    autoCompleteRoundAddressList: [
      {
        description: 'Ranipet, Tamil Nadu, India',
        matched_substrings: [{length: 5, offset: 0}],
        place_id: 'ChIJm91xELA1rTsRE7Mc1H8D8UI',
        reference: 'ChIJm91xELA1rTsRE7Mc1H8D8UI',
        structured_formatting: {
          main_text: 'Ranipet',
          main_text_matched_substrings: [[Object]],
          secondary_text: 'Tamil Nadu, India',
        },
        terms: [
          {offset: 0, value: 'Ranipet'},
          {offset: 9, value: 'Tamil Nadu'},
          {offset: 21, value: 'India'},
        ],
        types: ['locality', 'geocode', 'political'],
      },
      {
        description: 'Ranipet, Tamil Nadu, India',
        matched_substrings: [{length: 5, offset: 0}],
        place_id: 'ChIJm91xELA1rTsRE7Mc1H8D8UI',
        reference: 'ChIJm91xELA1rTsRE7Mc1H8D8UI',
        structured_formatting: {
          main_text: 'Ranipet',
          main_text_matched_substrings: [[Object]],
          secondary_text: 'Tamil Nadu, India',
        },
        terms: [
          {offset: 0, value: 'Ranipet'},
          {offset: 9, value: 'Tamil Nadu'},
          {offset: 21, value: 'India'},
        ],
        types: ['locality', 'geocode', 'political'],
      },
    ],
    autoCompleteRoundDropAddressList: [
      {
        description: 'Ranipet, Tamil Nadu, India',
        matched_substrings: [{length: 5, offset: 0}],
        place_id: 'ChIJm91xELA1rTsRE7Mc1H8D8UI',
        reference: 'ChIJm91xELA1rTsRE7Mc1H8D8UI',
        structured_formatting: {
          main_text: 'Ranipet',
          main_text_matched_substrings: [[Object]],
          secondary_text: 'Tamil Nadu, India',
        },
        terms: [
          {offset: 0, value: 'Ranipet'},
          {offset: 9, value: 'Tamil Nadu'},
          {offset: 21, value: 'India'},
        ],
        types: ['locality', 'geocode', 'political'],
      },
      {
        description: 'Ranipet, Tamil Nadu, India',
        matched_substrings: [{length: 5, offset: 0}],
        place_id: 'ChIJm91xELA1rTsRE7Mc1H8D8UI',
        reference: 'ChIJm91xELA1rTsRE7Mc1H8D8UI',
        structured_formatting: {
          main_text: 'Ranipet',
          main_text_matched_substrings: [[Object]],
          secondary_text: 'Tamil Nadu, India',
        },
        terms: [
          {offset: 0, value: 'Ranipet'},
          {offset: 9, value: 'Tamil Nadu'},
          {offset: 21, value: 'India'},
        ],
        types: ['locality', 'geocode', 'political'],
      },
    ],
    isDisplayPickUpList: true,
    isDisplayDropUpList: true,
    isDisplayRoundPickUpList: true,
    isDisplayRoundDropUpList: true,
    isDisplayValidation: true,
    onAddressPress: jest.fn(),
    renderAddress: jest.fn(() => {}),
    renderSeparator: jest.fn(),
    onPress: jest.fn(),
    onDropAddressPress: jest.fn(),
    setDisplayRoundPickUpList: jest.fn(() => {}),
    setDisplayPickUpList: jest.fn(() => {}),
    setDisplayDropUpList: jest.fn(() => {}),
    setDisplayRoundDropUpList: jest.fn(() => {}),
    openModal: jest.fn(() => {}),
    setSelectedOneWayTrip: jest.fn(() => {}),
    horseData: [
      {
        value: '66940f1cd0e77de21f57dac8',
        isSelected: true,
        name: 'Arabian',
      },
      {
        value: '66940f1cd0e77de21f57dac8',
        isSelected: false,
        name: 'Arabian',
      },
    ],
    trailerData: [
      {
        value: '66940f1cd0e77de21f57dac8',
        isSelected: true,
        name: 'Arabian',
      },
      {
        value: '66940f1cd0e77de21f57dac8',
        isSelected: false,
        name: 'Arabian',
      },
    ],
    isSelectedOneWayTrip: false,
  }),
}));

describe('Home Screen', () => {
  it('renders correctly', () => {
    const {getByTestId} = renderWithProviders([
      {name: AppScreens.HomeScreen, screen: HomeScreen},
    ]);

    // Assert presence of UI elements based on testIDs or other unique identifiers
    expect(getByTestId(HomeScreenTestKeys.HOME_SCREEN)).toBeDefined();
    expect(getByTestId(HomeScreenTestKeys.NAME)).toBeDefined();
    expect(getByTestId(HomeScreenTestKeys.PICK_UP_DATE)).toBeDefined();
    expect(getByTestId(HomeScreenTestKeys.PICK_UP_ADDRESS)).toBeDefined();
    expect(getByTestId(HomeScreenTestKeys.DROP_UP_ADDRESS)).toBeDefined();
    expect(getByTestId(HomeScreenTestKeys.NOTES)).toBeDefined();
    expect(
      getByTestId(HomeScreenTestKeys.RETURN_DROP_UP_ADDRESS),
    ).toBeDefined();
    expect(
      getByTestId(HomeScreenTestKeys.RETURN_PICK_UP_ADDRESS),
    ).toBeDefined();
    expect(getByTestId(HomeScreenTestKeys.RETURN_PICK_UP_DATE)).toBeDefined();

    fireEvent(getByTestId(HomeScreenTestKeys.PICK_UP_ADDRESS), 'focus');
    fireEvent(getByTestId(HomeScreenTestKeys.PICK_UP_ADDRESS), 'blur');

    fireEvent(getByTestId(HomeScreenTestKeys.DROP_UP_ADDRESS), 'focus');
    fireEvent(getByTestId(HomeScreenTestKeys.DROP_UP_ADDRESS), 'blur');

    fireEvent(getByTestId(HomeScreenTestKeys.RETURN_DROP_UP_ADDRESS), 'focus');
    fireEvent(getByTestId(HomeScreenTestKeys.RETURN_DROP_UP_ADDRESS), 'blur');

    fireEvent(getByTestId(HomeScreenTestKeys.RETURN_PICK_UP_ADDRESS), 'focus');
    fireEvent(getByTestId(HomeScreenTestKeys.RETURN_PICK_UP_ADDRESS), 'blur');

    fireEvent(getByTestId(HomeScreenTestKeys.PICK_UP_DATE), 'focus');
    fireEvent(getByTestId(HomeScreenTestKeys.RETURN_PICK_UP_DATE), 'focus');

    expect(getByTestId(HomeScreenTestKeys.SINGLE_TRIP_BUTTON)).toBeDefined();
    expect(getByTestId(HomeScreenTestKeys.ROUND_TRIP_BUTTON)).toBeDefined();

    fireEvent.press(getByTestId(HomeScreenTestKeys.SINGLE_TRIP_BUTTON));
    fireEvent.press(getByTestId(HomeScreenTestKeys.ROUND_TRIP_BUTTON));
  });
});

describe('Home Screen Test Suit 2', () => {
  it('renders AppScrollView when isDisplayPickUpList is true and autoCompleteAddressList is populated', () => {
    const {getByTestId} = renderWithProviders([
      {name: AppScreens.HomeScreen, screen: HomeScreen},
    ]);

    // Assert that AppScrollView is rendered
    const appScrollPickup = getByTestId(HomeScreenTestKeys.SCROLL_PICK_UP); // Adjust with your test ID
    expect(appScrollPickup).toBeTruthy();

    const appScrollDrop = getByTestId(HomeScreenTestKeys.SCROLL_DROP); // Adjust with your test ID
    expect(appScrollDrop).toBeTruthy();

    const appScrollRoundPickup = getByTestId(HomeScreenTestKeys.ROUND_PICK_UP); // Adjust with your test ID
    expect(appScrollRoundPickup).toBeTruthy();

    const appScrollRoundDrop = getByTestId(HomeScreenTestKeys.ROUND_DROP); // Adjust with your test ID
    expect(appScrollRoundDrop).toBeTruthy();
  });
});
