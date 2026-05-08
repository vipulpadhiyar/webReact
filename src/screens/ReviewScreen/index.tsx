import React from 'react';
import {TextInput, View} from 'react-native';
import StarRating from 'react-native-star-rating-widget';

import {AppButton, AppScreen, AppText} from '~/components';
import {
  AppColors,
  AppConstants,
  AppFonts,
  AppFontSizes,
  AppSpacing,
  ReviewScreenTestKeys,
} from '~/constants';
import {translate} from '~/localization';

import {useReviewController} from './controller';
import styles from './styles';

/**
 * Screen for submitting a review and rating.
 *
 * Displays rating stars, a text input for the review, and handles submission of feedback.
 *
 * @returns {JSX.Element} - The ReviewScreen component.
 */
export const ReviewScreen = () => {
  // Destructure necessary functions and state from the custom hook
  const {
    rating,
    reviewText,
    displayError,
    ratingError,
    onPressGoBack,
    setRatingHandler,
    onTextChange,
    onPressSubmit,
  } = useReviewController();

  /**
   * function for change rating handler
   */
  const onPressRating = (star: number) => {
    setRatingHandler(star);
  };

  return (
    <AppScreen
      testID={ReviewScreenTestKeys.REVIEW_SCREEN}
      header={translate('add_review')}
      onBack={onPressGoBack}>
      <View style={styles.subContainer}>
        <View style={styles.feedbackStarContainer}>
          <AppText
            text={translate('add_driver_rating')}
            fontColor={AppColors.peanBlue}
            fontSize={AppFontSizes[16]}
            fontFamily={AppFonts.GentiumBasic_Regular}
          />
          <View
            testID={ReviewScreenTestKeys.STAR_VIEW}
            style={styles.starContainer}>
            <StarRating
              rating={rating}
              onChange={onPressRating}
              enableHalfStar
              starSize={AppSpacing[40]}
              emptyColor={AppColors.starEmptyBg}
            />
          </View>
          {ratingError && (
            <AppText
              testID={ReviewScreenTestKeys.RATING_ERROR}
              text={ratingError}
              fontSize={AppFontSizes[14]}
              fontColor={AppColors.errorText}
              containerStyle={styles.errorRating}
            />
          )}
          <AppText
            text={translate('add_review')}
            fontColor={AppColors.peanBlue}
            fontSize={AppFontSizes[16]}
            fontFamily={AppFonts.GentiumBasic_Regular}
          />
          <TextInput
            value={reviewText}
            placeholder={translate('Write your review')}
            placeholderTextColor={AppColors.greyLight}
            onChangeText={onTextChange}
            style={styles.input}
            multiline={true}
            maxLength={AppConstants.REVIEW_TEXT_LIMIT}
          />
          {displayError && (
            <AppText
              testID={ReviewScreenTestKeys.DISPLAY_ERROR}
              text={displayError}
              fontSize={AppFontSizes[14]}
              fontColor={AppColors.errorText}
              containerStyle={styles.errorTextStyle}
            />
          )}
        </View>
        <View style={styles.flexContainer} />
        <AppButton
          testID={ReviewScreenTestKeys.REVIEW_SUBMIT_BUTTON}
          text={translate('Submit')}
          textFontFamily={AppFonts.GentiumBasic_Bold}
          containerStyle={styles.submitButton}
          textSize={AppSpacing[16]}
          onPress={onPressSubmit}
        />
      </View>
    </AppScreen>
  );
};
