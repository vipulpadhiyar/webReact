import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {fireEvent, RenderResult} from '@testing-library/react-native';

import {AppColors, AppScreens, ReviewScreenTestKeys} from '~/constants';
import {ReviewScreen} from '~/screens/ReviewScreen';
import {useReviewController} from '~/screens/ReviewScreen/controller';

import {renderWithProvidersRow} from '../utils/TestUtils';

jest.mock('../../src/screens/ReviewScreen/controller.tsx', () => ({
  useReviewController: jest.fn(),
}));

const Stack = createNativeStackNavigator<MyTripsStackParamList>();

describe('Review Screen', () => {
  let wrapper: RenderResult;
  const mockSetRatingHandler = jest.fn();

  beforeEach(() => {
    (useReviewController as jest.Mock).mockReturnValue({
      onPressGoBack: jest.fn(),
      onPressSubmit: jest.fn(),
      setRatingHandler: mockSetRatingHandler,
      onTextChange: jest.fn(),
      rating: 0, // Set a rating for testing
      reviewText: '',
      displayError: 'displayError',
      ratingError: 'ratingError',
    });

    wrapper = renderWithProvidersRow(
      <NavigationContainer>
        <Stack.Navigator initialRouteName={AppScreens.ReviewScreen}>
          <Stack.Screen
            name={AppScreens.ReviewScreen}
            component={ReviewScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Display Review screen', async () => {
    const {getByTestId} = wrapper;
    expect(getByTestId(ReviewScreenTestKeys.REVIEW_SCREEN)).toBeTruthy();
    // Verify that the error text is rendered
    expect(wrapper.getByTestId(ReviewScreenTestKeys.RATING_ERROR)).toBeTruthy();
    expect(
      wrapper.getByTestId(ReviewScreenTestKeys.DISPLAY_ERROR),
    ).toBeTruthy();
  });
  it('should render the correct number of stars', () => {
    // Verify that 5 stars are rendered
    expect(wrapper.getAllByTestId(/STAR_NUMBER\d/).length).toBe(5);
  });

  it('should have correct placeholder text color', () => {
    const textInput = wrapper.getByPlaceholderText('Write your review');
    expect(textInput.props.placeholderTextColor).toBe(AppColors.greyLight);
  });

  it('should call onTextChange when text is input', () => {
    const newText = 'This is a review';
    fireEvent.changeText(
      wrapper.getByPlaceholderText('Write your review'),
      newText,
    );
    expect(useReviewController().onTextChange).toHaveBeenCalledWith(newText);
  });

  /*
   * Verify that the error text is rendered
   */
  it('should call setRatingHandler with correct value when star is pressed', () => {
    // Simulate pressing a star
    fireEvent.press(
      wrapper.getByTestId(ReviewScreenTestKeys.STAR_NUMBER + '1'),
    );
    expect(mockSetRatingHandler).toHaveBeenCalledWith(1);
  });

  it('should call onPressSubmit when button is pressed', () => {
    fireEvent.press(
      wrapper.getByTestId(ReviewScreenTestKeys.REVIEW_SUBMIT_BUTTON),
    );
    expect(useReviewController().onPressSubmit).toHaveBeenCalled();
  });
});
