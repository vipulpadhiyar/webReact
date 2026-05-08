import React from 'react';
import {Platform, StatusBar, View} from 'react-native';

import {
  AppButton,
  AppCalenderModal,
  AppContainer,
  AppKeyboardAvoidSafeAreaContainer,
  AppPickerCustom,
  AppText,
  AppTextInput,
  AppTouchable,
} from '~/components';
import {
  AppColors,
  AppFonts,
  AppSpacing,
  EditProfileDetailsScreen,
  IcCalender,
  IcCheckboxSelected,
  IcDownArrow,
  IcEmptyCheckBox,
  IcHorse,
  IcLocation,
  IcNote,
  IcSuitCase,
  IcTrailer,
} from '~/constants';
import {translate} from '~/localization';

import {AppScrollViewComponent} from './components/AppScrollViewComponent';
import {HeaderButton} from './components/HeaderButton';
import {useEditTripDetailsController} from './controller';
import styles from './styles';

/**
 * EditTripDetails component displays the home screen of the application.
 * It includes input fields for trip details, address selection with autocomplete,
 * and buttons to select trip type and submit the form.
 */
export const EditTripDetails = () => {
  const {
    horseData,
    trailerData,
    formik,
    isSelectedOneWayTrip,
    nameInputRef,
    additionalInputRef,
    pickupAddressRef,
    modalRef,
    modalRefReturnPickUP,
    autoCompleteAddressList,
    isDisplayPickUpList,
    isDisplayDropUpList,
    autoCompleteDropAddressList,
    isDisplayRoundPickUpList,
    isDisplayRoundDropUpList,
    pickupRoundAddressRef,
    dropRoundAddressRef,
    autoCompleteRoundAddressList,
    autoCompleteRoundDropAddressList,
    isRoundTripSelected,
    isDisplayValidation,
    currentPickupDate,
    currentEndDropUpDate,
    currentReturnPickupDate,
    isFixedDropUpDate,
    isFixedPickUP,
    currentEndPickupDate,
    setSelectedOneWayTrip,
    onPressIndex,
    onPressTrailerIndex,
    openModal,
    onAddressPress,
    setDisplayPickUpList,
    setDisplayDropUpList,
    onPressAdd,
    setDisplayRoundDropUpList,
    setDisplayRoundPickUpList,
    setRoundAddress,
    onPressDate,
    setDisplayValidation,
    onDropAddressPress,
    onRoundDropUpAddressPress,
    onRoundPickUpAddressPress,
    setPickUpText,
    setDropUpInputText,
    setRoundPickUpText,
    setRoundDropUpInputText,
    openModalReturnPickUp,
    onPressRoundDate,
    onPressBack,
  } = useEditTripDetailsController();

  /*
   * Function to open the modal for selecting pickup date.
   */
  const openModalPickupDate = () => {
    openModal(false);
  };

  /*
   * Function to handle focus event on the pickup address input.
   */
  const handleFocus = () => {
    setDisplayPickUpList(true);
  };

  /*
   *  Function to handle blur event on the pickup address input.
   */
  const handleBlur = () => {
    setDisplayPickUpList(false);
  };
  /*
   *Function to handle focus event on the drop-off address input.
   */
  const handleFocusDropOff = () => {
    setDisplayDropUpList(true);
  };

  /*
   *Function to handle blur event on the drop-off address input.
   */
  const handleBlurDropOff = () => {
    setDisplayDropUpList(false);
  };
  /*
   * Function to handle focus event on the round trip pickup address input.
   */
  const handleFocusRoundPickUp = () => {
    setDisplayRoundPickUpList(true);
  };

  /*
   * Function to handle focus event on the round trip pickup address input.
   */
  const handleBlurRoundPickUp = () => {
    setDisplayRoundPickUpList(false);
  };
  /*
   * Function to handle focus event on the round drop off address input.
   */
  const handleFocusRoundDropOff = () => {
    setDisplayRoundDropUpList(true);
  };

  /*
   * Function to handle blur event on the round trip drop-off address input.
   */
  const handleBlurRoundDropOff = () => {
    setDisplayRoundDropUpList(false);
  };

  /*
   * Function to handle selection of trip type (one-way or round trip).
   */
  const handleTripSelected = () => {
    setRoundAddress(!isRoundTripSelected);
  };
  /*
   * Function to handle pressing the return pickup button.
   */
  const onPressReturnPickUp = () => {
    if (formik.values?.pickUpDate) {
      openModalReturnPickUp(false);
    }
  };
  /*
   * Function to validate horse selection.
   */
  const returnHorseValidation = () => {
    return horseData?.some(option => option?.isSelected) === false
      ? translate('PLEASE_SELECT_AT_LEAST_ONE_HORSE')
      : '';
  };
  /*
   * Function to validate trailer selection.
   */
  const returnTrailerValidation = () => {
    return trailerData?.some(option => option.isSelected) === false
      ? translate('PLEASE_SELECT_AT_LEAST_ONE_TRAILER')
      : '';
  };
  /*
   *Function to handle form submission.
   */
  const onPressSubmit = () => {
    setDisplayValidation(true);
    formik.handleSubmit();
  };
  /*
   * Function to return minimum allowable date for date inputs.
   */
  const returnMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate());
    return tomorrow.toString();
  };
  /*
   *  Function to return maximum allowable date for date inputs.
   */
  const returnMaxDate = () => {
    const next7Days = new Date();
    next7Days.setDate(next7Days.getDate() + 7);
    return next7Days.toString();
  };

  return (
    <AppContainer
      testID={EditProfileDetailsScreen.EDIT_PROFILE_SCREEN}
      containerStyle={styles.container}>
      <StatusBar
        backgroundColor={AppColors.peanBlue}
        barStyle={'light-content'}
      />
      <HeaderButton
        firstButtonTestID={
          EditProfileDetailsScreen.EDIT_PROFILE_SINGLE_TRIP_BUTTON
        }
        secondButtonTestID={
          EditProfileDetailsScreen.EDIT_PROFILE_ROUND_TRIP_BUTTON
        }
        isSelectedOneWayTrip={isSelectedOneWayTrip}
        onPress={setSelectedOneWayTrip}
        onPressBack={onPressBack}
      />
      <AppKeyboardAvoidSafeAreaContainer
        safeAreaContainerStyle={styles.innerContainer}
        scrollChildren={
          <View>
            <AppTextInput
              testID={EditProfileDetailsScreen.EDIT_PROFILE_NAME}
              inputIcon={IcSuitCase}
              inputRef={nameInputRef}
              value={formik.values.name}
              containerStyle={styles.inputContainerStyle}
              onChangeText={formik.handleChange('name')}
              errorText={
                formik.touched.name && formik.errors.name
                  ? formik.errors.name
                  : ''
              }
              placeholder={translate('TRIP_TEXT_PLACEHOLDER')}
              keyboardType="default"
              returnKeyType="next"
            />
            <AppTouchable onPress={openModalPickupDate}>
              <AppTextInput
                testID={EditProfileDetailsScreen.EDIT_PROFILE_PICK_UP_DATE}
                editable={Platform.OS === 'ios' ? true : false}
                inputIcon={IcCalender}
                value={formik.values.pickUpDate}
                containerStyle={styles.inputContainerStyle}
                onChangeText={formik.handleChange('pickUpDate')}
                errorText={
                  formik.touched.pickUpDate && formik.errors.pickUpDate
                    ? formik.errors.pickUpDate
                    : ''
                }
                placeholder={translate('PICK_UP_DATE_PLACEHOLDER')}
                keyboardType="default"
                returnKeyType="next"
                pointerEvents="none"
              />
            </AppTouchable>

            <AppTextInput
              testID={EditProfileDetailsScreen.EDIT_PROFILE_PICK_UP_ADDRESS}
              inputIcon={IcLocation}
              inputRef={pickupAddressRef}
              value={formik.values.fullAddress}
              containerStyle={styles.inputContainerStyle}
              onChangeText={setPickUpText}
              errorText={
                formik.touched.fullAddress && formik.errors.fullAddress
                  ? formik.errors.fullAddress
                  : ''
              }
              placeholder={translate('PICK_ADDRESS_PLACEHOLDER')}
              keyboardType="default"
              returnKeyType="next"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {isDisplayPickUpList &&
            autoCompleteAddressList &&
            autoCompleteAddressList.length > 0 ? (
              <AppScrollViewComponent
                testID={EditProfileDetailsScreen.EDIT_PROFILE_SCROLL_PICK_UP}
                key={translate('PICK_ADDRESS_PLACEHOLDER')}
                addressList={autoCompleteAddressList}
                onPressAddress={onAddressPress}
              />
            ) : null}
            <AppTextInput
              testID={EditProfileDetailsScreen.EDIT_PROFILE_DROP_UP_ADDRESS}
              inputIcon={IcLocation}
              inputRef={nameInputRef}
              value={formik.values.fullDropOffAddress}
              containerStyle={styles.inputContainerStyle}
              onChangeText={setDropUpInputText}
              errorText={
                formik.touched.fullDropOffAddress &&
                formik.errors.fullDropOffAddress
                  ? formik.errors.fullDropOffAddress
                  : ''
              }
              placeholder={translate('DROP_OFF_ADDRESS_PLACEHOLDER')}
              keyboardType="default"
              returnKeyType="next"
              onFocus={handleFocusDropOff}
              onBlur={handleBlurDropOff}
            />
            {isDisplayDropUpList &&
            autoCompleteDropAddressList &&
            autoCompleteDropAddressList.length > 0 ? (
              <AppScrollViewComponent
                testID={EditProfileDetailsScreen.EDIT_PROFILE_SCROLL_DROP}
                key={translate('DROP_OFF_ADDRESS_PLACEHOLDER')}
                addressList={autoCompleteDropAddressList}
                onPressAddress={onDropAddressPress}
              />
            ) : null}
            {!isSelectedOneWayTrip && (
              <>
                <AppTouchable style={styles.roundTripContainer}>
                  {isRoundTripSelected ? (
                    <AppTouchable onPress={handleTripSelected}>
                      <IcCheckboxSelected />
                    </AppTouchable>
                  ) : (
                    <AppTouchable onPress={handleTripSelected}>
                      <IcEmptyCheckBox />
                    </AppTouchable>
                  )}
                  <AppText
                    text={`${translate('ROUND_TRIP')}`}
                    fontSize={AppSpacing[16]}
                    fontFamily={AppFonts.GentiumBasic_Regular}
                    fontColor={AppColors.greyLight1}
                  />
                </AppTouchable>
                <AppTouchable onPress={onPressReturnPickUp}>
                  <AppTextInput
                    testID={
                      EditProfileDetailsScreen.EDIT_PROFILE_RETURN_PICK_UP_DATE
                    }
                    editable={Platform.OS === 'ios' ? true : false}
                    inputIcon={IcCalender}
                    value={formik.values.returnDate}
                    containerStyle={styles.inputContainerStyle}
                    errorText={
                      formik.touched.returnDate && formik.errors.returnDate
                        ? formik.errors.returnDate
                        : ''
                    }
                    placeholder={translate('RETURN_PICK_UP_DATE_PLACEHOLDER')}
                    keyboardType="default"
                    returnKeyType="next"
                    pointerEvents="none"
                  />
                </AppTouchable>
                <AppTextInput
                  testID={
                    EditProfileDetailsScreen.EDIT_PROFILE_RETURN_PICK_UP_ADDRESS
                  }
                  editable={!isRoundTripSelected}
                  inputIcon={IcLocation}
                  inputRef={pickupRoundAddressRef}
                  containerStyle={styles.inputContainerStyle}
                  onChangeText={setRoundPickUpText}
                  value={formik.values.fullAddressRound}
                  errorText={
                    formik.touched.fullAddressRound &&
                    formik.errors.fullAddressRound
                      ? formik.errors.fullAddressRound
                      : ''
                  }
                  placeholder={translate('END_PICK_UP_ADDRESS')}
                  keyboardType="default"
                  returnKeyType="next"
                  onFocus={handleFocusRoundPickUp}
                  onBlur={handleBlurRoundPickUp}
                />
                {isDisplayRoundPickUpList &&
                autoCompleteRoundAddressList &&
                autoCompleteRoundAddressList?.length > 0 ? (
                  <AppScrollViewComponent
                    testID={EditProfileDetailsScreen.EDIT_PROFILE_ROUND_PICK_UP}
                    key={translate('END_PICK_UP_ADDRESS')}
                    addressList={autoCompleteRoundAddressList}
                    onPressAddress={onRoundPickUpAddressPress}
                  />
                ) : null}
                <AppTextInput
                  testID={
                    EditProfileDetailsScreen.EDIT_PROFILE_RETURN_DROP_UP_ADDRESS
                  }
                  editable={!isRoundTripSelected}
                  inputIcon={IcLocation}
                  inputRef={dropRoundAddressRef}
                  value={formik.values.fullDropOffAddressRound}
                  containerStyle={styles.inputContainerStyle}
                  onChangeText={setRoundDropUpInputText}
                  errorText={
                    formik.touched.fullDropOffAddressRound &&
                    formik.errors.fullDropOffAddressRound
                      ? formik.errors.fullDropOffAddressRound
                      : ''
                  }
                  placeholder={translate('END_DROP_OFF_ADDRESS')}
                  keyboardType="default"
                  returnKeyType="next"
                  onFocus={handleFocusRoundDropOff}
                  onBlur={handleBlurRoundDropOff}
                />
                {isDisplayRoundDropUpList &&
                autoCompleteRoundDropAddressList &&
                autoCompleteRoundDropAddressList?.length > 0 ? (
                  <AppScrollViewComponent
                    testID={EditProfileDetailsScreen.EDIT_PROFILE_ROUND_DROP}
                    key={translate('END_DROP_OFF_ADDRESS')}
                    addressList={autoCompleteRoundDropAddressList}
                    onPressAddress={onRoundDropUpAddressPress}
                  />
                ) : null}
              </>
            )}
            <AppPickerCustom
              inputIcon={IcHorse}
              placeHolderText={translate('SELECT_HORSE_PLACE_HOLDER_TEXT')}
              inputRightIcon={IcDownArrow}
              data={horseData}
              onPress={onPressIndex}
              addText={translate('add_new_horse')}
              onPressAdd={onPressAdd}
              errorText={isDisplayValidation && returnHorseValidation()}
            />
            <AppPickerCustom
              inputIcon={IcTrailer}
              placeHolderText={translate('SELECT_TRAILER_PLACE_HOLDER_TEXT')}
              inputRightIcon={IcDownArrow}
              data={trailerData}
              onPress={onPressTrailerIndex}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              errorText={isDisplayValidation && returnTrailerValidation()}
            />
            <AppTextInput
              testID={EditProfileDetailsScreen.EDIT_PROFILE_NOTES}
              inputIcon={IcNote}
              inputRef={additionalInputRef}
              value={formik.values.notes}
              containerStyle={styles.inputContainerStyle}
              onChangeText={formik.handleChange('notes')}
              errorText={
                formik.touched.notes && formik.errors.notes
                  ? formik.errors.notes
                  : ''
              }
              placeholder={translate('ADDITIONAL_PLACE_HOLDER_TEXT')}
              keyboardType="default"
              returnKeyType="next"
            />
            <AppButton
              text={translate('Submit')}
              containerStyle={styles.buttonContainer}
              onPress={onPressSubmit}
            />
          </View>
        }
      />
      <AppCalenderModal
        ref={modalRef}
        onPressDate={onPressDate}
        minDate={returnMinDate()}
        maxDate={returnMaxDate()}
        startDateFromProps={currentPickupDate}
        endDateFromProps={currentEndPickupDate}
        selectedDate={currentPickupDate}
        isFixedFromProps={isFixedPickUP}
      />
      <AppCalenderModal
        ref={modalRefReturnPickUP}
        onPressDate={onPressRoundDate}
        minDate={currentPickupDate}
        maxDate={returnMaxDate()}
        startDateFromProps={currentReturnPickupDate}
        endDateFromProps={currentEndDropUpDate}
        selectedDate={currentReturnPickupDate}
        isFixedFromProps={isFixedDropUpDate}
      />
    </AppContainer>
  );
};
