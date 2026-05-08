import {useCallback, useState} from 'react';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {AppConstants, AppScreens} from '~/constants';
import Loader from '~/helpers/Loader';
import {translate} from '~/localization';
import {useFeedbackApiAction} from '~/store/trip';
import {showError, showSuccess} from '~/utils';

/**
 * Interface for the Review Controller hook.
 *
 * @typedef {Object} IUseReviewController
 * @property {Function} onPressGoBack - Function to navigate back to the previous screen.
 * @property {Function} onPressSubmit - Function to handle the submission of feedback.
 * @property {Function} setRatingHandler - Function to update the rating state.
 * @property {Function} onTextChange - Function to update the review text state.
 * @property {number} rating - The current rating value.
 * @property {string} reviewText - The current review text.
 * @property {string} displayError - The error message to display if review text is invalid.
 * @property {string} ratingError - The error message to display if rating is invalid.
 */
interface IUseReviewController {
  onPressGoBack: () => void;
  onPressSubmit: () => void;
  setRatingHandler: (star: number) => void;
  onTextChange: (text: string) => void;
  rating: number;
  reviewText: string;
  displayError: string;
  ratingError: string;
}

/**
 * Custom hook to manage the review submission process.
 *
 * @returns {IUseReviewController} - An object containing the review management functions and state.
 */
export const useReviewController = (): IUseReviewController => {
  const {goBack} = useNavigation<NavigationProp<MyTripsStackParamList>>();
  const {params} =
    useRoute<RouteProp<MyTripsStackParamList, AppScreens.ReviewScreen>>();
  const [rating, setRating] = useState<number>(0);
  const [reviewText, serReviewText] = useState<string>('');
  const [displayError, setDisplayError] = useState<string>('');
  const [ratingError, setRatingError] = useState<string>('');
  /**
   * Api action for submit review for trip
   */
  const {mutateAsync: addTripReview} = useFeedbackApiAction();

  /**
   * Navigates back to the previous screen.
   */
  const onPressGoBack = () => {
    goBack();
  };

  /**
   * Updates the rating state and resets the rating error.
   *
   * @param {number} number - The new rating value to set.
   */
  const setRatingHandler = useCallback((number: number) => {
    setRatingError('');
    setRating(number);
  }, []);

  /**
   * Handles the submission of feedback.
   * Validates the review text and rating before sending the feedback request.
   */
  const onPressSubmit = () => {
    /**
     * Initialize error flags
     */
    let hasError = false;

    /**
     * Reset previous errors
     */
    setDisplayError('');
    setRatingError('');

    /**
     *  Check if review text is empty
     */
    if (reviewText === '') {
      setDisplayError(translate('please_add_review'));
      hasError = true;
    }

    /**
     * Check text limit and assign error
     */
    if (reviewText.length === AppConstants.REVIEW_TEXT_LIMIT) {
      setDisplayError(
        translate('review_should_be_not_more_than_300_character'),
      );
      hasError = true;
    }

    if (rating === 0) {
      setRatingError(translate('rating_should_be_more_than_zero'));
      hasError = true;
    }

    /*
     * If there are validation errors, stop execution
     */
    if (hasError) {
      return;
    }

    /*
     * Show loader and prepare payload
     */
    Loader.showLoader();
    const payload: CreateFeedbackRequest = {
      rating,
      review: reviewText,
      tripId: params?.id,
    };

    /*
     *Make API request to add trip review
     */
    addTripReview(payload)
      .then(res => {
        Loader.hideLoader();
        if (res) {
          showSuccess(res?.message ?? '');
          setTimeout(() => {
            onPressGoBack();
          }, 1000);
        }
      })
      .catch(err => {
        Loader.hideLoader();
        showError(err);
      })
      .finally(() => {
        Loader.hideLoader();
      });
  };

  /**
   * Updates the review text state and resets the display error.
   *
   * @param {string} text - The new review text to set.
   */
  const onTextChange = (text: string) => {
    serReviewText(text);
    if (text.length >= AppConstants.REVIEW_TEXT_LIMIT) {
      setDisplayError(
        translate('review_should_be_not_more_than_300_character'),
      );
    } else {
      setDisplayError('');
    }
  };

  return {
    rating,
    reviewText,
    displayError,
    ratingError,
    onPressGoBack,
    setRatingHandler,
    onTextChange,
    onPressSubmit,
  };
};
