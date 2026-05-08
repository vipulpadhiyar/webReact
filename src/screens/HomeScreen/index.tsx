import React from 'react';
import {Platform, StatusBar, View} from 'react-native';

import {
  AppButton,
  AppCalenderModal,
  AppContainer,
  AppKeyboardAvoidSafeAreaContainer,
  AppPickerCustom,
  AppScrollView,
  AppText,
  AppTextInput,
  AppTouchable,
} from '~/components';
import {
  AppColors,
  AppFonts,
  AppSpacing,
  HomeScreenTestKeys,
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
import {translate as t} from '~/localization';

import {Address} from './components/Address';
import {HeaderButton} from './components/HeaderButton';
import {useHomeScreenController} from './controller';
import styles from './styles';

/**
 * HomeScreen component displays the home screen of the application.
 * It includes input fields for trip details, address selection with autocomplete,
 * and buttons to select trip type and submit the form.
 */
export const HomeScreen = () => {
  const {
    notificationCount,
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
    onPressNotification,
  } = useHomeScreenController();

  /**
   * Render separator component for the FlatList.
   * @returns {React.ReactElement} - The separator view.
   */
  const renderSeparator = () => {
    return (
      <View
        testID={HomeScreenTestKeys.SEPARATE_VIEW}
        style={styles.separatorView}
      />
    );
  };

  /**
   * Render address item for the FlatList.
   * @param {Prediction} item - The address prediction item.
   * @returns {React.ReactElement} - The Address component.
   */
  const renderAddress = (
    item: Prediction,
    onPress: (item: Prediction) => void,
  ) => {
    return (
      <Address key={item?.place_id} data={item} onPress={() => onPress(item)} />
    );
  };

  /**
   *  returnTomorrowDate for next day selection
   */
  const returnTomorrowDate = () => {
    const next7Days = new Date();
    next7Days.setDate(next7Days.getDate() + 1);
    return next7Days.toString();
  };
  /**
   *  returnPreviousDate for previous day
   */
  const returnPreviousDate = (date: string) => {
    const day = new Date(date);

    day.setDate(day.getDate() - 1);
    return day.toString();
  };
  return (
    <AppContainer
      testID={HomeScreenTestKeys.HOME_SCREEN}
      containerStyle={styles.container}>
      <StatusBar
        backgroundColor={AppColors.peanBlue}
        barStyle={'light-content'}
      />
      <HeaderButton
        firstButtonTestID={HomeScreenTestKeys.SINGLE_TRIP_BUTTON}
        secondButtonTestID={HomeScreenTestKeys.ROUND_TRIP_BUTTON}
        isSelectedOneWayTrip={isSelectedOneWayTrip}
        notificationCount={notificationCount}
        onPress={setSelectedOneWayTrip}
        onPressNotification={onPressNotification}
      />
      <AppKeyboardAvoidSafeAreaContainer
        safeAreaContainerStyle={styles.innerContainer}
        scrollChildren={
          <View>
            <AppTextInput
              testID={HomeScreenTestKeys.NAME}
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
              placeholder={t('TRIP_TEXT_PLACEHOLDER')}
              keyboardType="default"
              returnKeyType="next"
            />
            <AppTouchable onPress={() => openModal(false)}>
              <AppTextInput
                editable={Platform.OS === 'ios' ? true : false}
                testID={HomeScreenTestKeys.PICK_UP_DATE}
                inputIcon={IcCalender}
                value={formik.values.pickUpDate}
                containerStyle={styles.inputContainerStyle}
                onChangeText={formik.handleChange('pickUpDate')}
                errorText={
                  formik.touched.pickUpDate && formik.errors.pickUpDate
                    ? formik.errors.pickUpDate
                    : ''
                }
                placeholder={t('PICK_UP_DATE_PLACEHOLDER')}
                keyboardType="default"
                returnKeyType="next"
                pointerEvents="none"
              />
            </AppTouchable>

            <AppTextInput
              testID={HomeScreenTestKeys.PICK_UP_ADDRESS}
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
              placeholder={t('PICK_ADDRESS_PLACEHOLDER')}
              keyboardType="default"
              returnKeyType="next"
              onFocus={() => setDisplayPickUpList(true)}
              onBlur={() => setDisplayPickUpList(false)}
            />
            {isDisplayPickUpList &&
            autoCompleteAddressList &&
            autoCompleteAddressList.length > 0 ? (
              <AppScrollView
                testID={HomeScreenTestKeys.SCROLL_PICK_UP}
                nestedScrollEnabled
                keyboardShouldPersistTaps="always"
                style={styles.contentContainerStyle}>
                {autoCompleteAddressList.map((item, index) => (
                  <View key={item?.place_id || index}>
                    {renderAddress(item, onAddressPress)}
                    {index < autoCompleteAddressList.length - 1 &&
                      renderSeparator()}
                  </View>
                ))}
              </AppScrollView>
            ) : null}
            <AppTextInput
              testID={HomeScreenTestKeys.DROP_UP_ADDRESS}
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
              placeholder={t('DROP_OFF_ADDRESS_PLACEHOLDER')}
              keyboardType="default"
              returnKeyType="next"
              onFocus={() => setDisplayDropUpList(true)}
              onBlur={() => {
                setDisplayDropUpList(false);
              }}
            />
            {isDisplayDropUpList &&
            autoCompleteDropAddressList &&
            autoCompleteDropAddressList.length > 0 ? (
              <AppScrollView
                testID={HomeScreenTestKeys.SCROLL_DROP}
                nestedScrollEnabled
                keyboardShouldPersistTaps="always"
                style={styles.contentContainerStyle}>
                {autoCompleteDropAddressList.map((item, index) => (
                  <View key={item?.place_id || index}>
                    {renderAddress(item, onDropAddressPress)}
                    {index < autoCompleteDropAddressList.length - 1 &&
                      renderSeparator()}
                  </View>
                ))}
              </AppScrollView>
            ) : null}
            {!isSelectedOneWayTrip && (
              <>
                <AppTouchable style={styles.roundTripContainer}>
                  {isRoundTripSelected ? (
                    <AppTouchable
                      onPress={() => {
                        setRoundAddress(!isRoundTripSelected);
                      }}>
                      <IcCheckboxSelected />
                    </AppTouchable>
                  ) : (
                    <AppTouchable
                      onPress={() => {
                        setRoundAddress(!isRoundTripSelected);
                      }}>
                      <IcEmptyCheckBox />
                    </AppTouchable>
                  )}
                  <AppText
                    text={`${t('ROUND_TRIP')}`}
                    fontSize={AppSpacing[16]}
                    fontFamily={AppFonts.GentiumBasic_Regular}
                    fontColor={AppColors.greyLight1}
                  />
                </AppTouchable>
                <AppTouchable
                  onPress={() =>
                    formik.values?.pickUpDate && openModalReturnPickUp(false)
                  }>
                  <AppTextInput
                    editable={Platform.OS === 'ios' ? true : false}
                    testID={HomeScreenTestKeys.RETURN_PICK_UP_DATE}
                    inputIcon={IcCalender}
                    value={formik.values.returnDate}
                    containerStyle={styles.inputContainerStyle}
                    errorText={
                      formik.touched.returnDate && formik.errors.returnDate
                        ? formik.errors.returnDate
                        : ''
                    }
                    placeholder={t('RETURN_PICK_UP_DATE_PLACEHOLDER')}
                    keyboardType="default"
                    returnKeyType="next"
                    pointerEvents="none"
                  />
                </AppTouchable>
                <AppTextInput
                  testID={HomeScreenTestKeys.RETURN_PICK_UP_ADDRESS}
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
                  placeholder={t('END_PICK_UP_ADDRESS')}
                  keyboardType="default"
                  returnKeyType="next"
                  onFocus={() => setDisplayRoundPickUpList(true)}
                  onBlur={() => setDisplayRoundPickUpList(false)}
                />
                {isDisplayRoundPickUpList &&
                autoCompleteRoundAddressList &&
                autoCompleteRoundAddressList?.length > 0 ? (
                  <AppScrollView
                    testID={HomeScreenTestKeys.ROUND_PICK_UP}
                    nestedScrollEnabled
                    keyboardShouldPersistTaps="always"
                    style={styles.contentContainerStyle}>
                    {autoCompleteRoundAddressList.map((item, index) => (
                      <View key={item?.place_id || index}>
                        {renderAddress(item, onRoundPickUpAddressPress)}
                        {index < autoCompleteRoundAddressList.length - 1 &&
                          renderSeparator()}
                      </View>
                    ))}
                  </AppScrollView>
                ) : null}
                <AppTextInput
                  testID={HomeScreenTestKeys.RETURN_DROP_UP_ADDRESS}
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
                  placeholder={t('END_DROP_OFF_ADDRESS')}
                  keyboardType="default"
                  returnKeyType="next"
                  onFocus={() => setDisplayRoundDropUpList(true)}
                  onBlur={() => setDisplayRoundDropUpList(false)}
                />
                {isDisplayRoundDropUpList &&
                autoCompleteRoundDropAddressList &&
                autoCompleteRoundDropAddressList?.length > 0 ? (
                  <AppScrollView
                    testID={HomeScreenTestKeys.ROUND_DROP}
                    nestedScrollEnabled
                    keyboardShouldPersistTaps="always"
                    style={styles.contentContainerStyle}>
                    {autoCompleteRoundDropAddressList.map((item, index) => (
                      <View key={item?.place_id || index}>
                        {renderAddress(item, onRoundDropUpAddressPress)}
                        {index < autoCompleteRoundDropAddressList.length - 1 &&
                          renderSeparator()}
                      </View>
                    ))}
                  </AppScrollView>
                ) : null}
              </>
            )}
            <AppPickerCustom
              inputIcon={IcHorse}
              placeHolderText={t('SELECT_HORSE_PLACE_HOLDER_TEXT')}
              inputRightIcon={IcDownArrow}
              data={horseData}
              onPress={onPressIndex}
              addText={t('add_new_horse')}
              onPressAdd={onPressAdd}
              errorText={
                isDisplayValidation &&
                horseData?.some(option => option.isSelected) === false
                  ? t('PLEASE_SELECT_AT_LEAST_ONE_HORSE')
                  : ''
              }
            />
            <AppPickerCustom
              inputIcon={IcTrailer}
              placeHolderText={t('SELECT_TRAILER_PLACE_HOLDER_TEXT')}
              inputRightIcon={IcDownArrow}
              data={trailerData}
              onPress={onPressTrailerIndex}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              errorText={
                isDisplayValidation &&
                trailerData?.some(option => option.isSelected) === false
                  ? t('PLEASE_SELECT_AT_LEAST_ONE_TRAILER')
                  : ''
              }
            />
            {/* To do for tariler type */}
            {/* <View style={styles.trailerContainer}>
              <AppText
                text={`${t('TRAILER_TYPE')} :`}
                fontSize={AppSpacing[14]}
                fontFamily={AppFonts.GentiumBasic_Regular}
                fontColor={AppColors.greyLight1}
              />
              {isTrailerTypeRequired ? (
                <IcCheckboxSelected
                  height={AppSpacing[20]}
                  width={AppSpacing[20]}
                  onPress={() => {
                    setTrailerTypeRequired(!isTrailerTypeRequired);
                  }}
                />
              ) : (
                <IcEmptyCheckBox
                  height={AppSpacing[20]}
                  width={AppSpacing[20]}
                  onPress={() => {
                    setTrailerTypeRequired(!isTrailerTypeRequired);
                  }}
                />
              )}
              <AppText
                text={`${t('REQUIRED')}`}
                fontSize={AppSpacing[14]}
                fontFamily={AppFonts.GentiumBasic_Regular}
                fontColor={AppColors.greyLight1}
              />
              {!isTrailerTypeRequired ? (
                <IcCheckboxSelected
                  height={AppSpacing[20]}
                  width={AppSpacing[20]}
                  onPress={() => {
                    setTrailerTypeRequired(!isTrailerTypeRequired);
                  }}
                />
              ) : (
                <IcEmptyCheckBox
                  height={AppSpacing[20]}
                  width={AppSpacing[20]}
                  onPress={() => {
                    setTrailerTypeRequired(!isTrailerTypeRequired);
                  }}
                />
              )}
              <AppText
                text={`${t('PREFERRED')}`}
                fontSize={AppSpacing[14]}
                fontFamily={AppFonts.GentiumBasic_Regular}
                fontColor={AppColors.greyLight1}
              />
            </View> */}
            <AppTextInput
              testID={HomeScreenTestKeys.NOTES}
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
              placeholder={t('ADDITIONAL_PLACE_HOLDER_TEXT')}
              keyboardType="default"
              returnKeyType="next"
            />
            <AppButton
              text={t('Submit')}
              containerStyle={styles.buttonContainer}
              onPress={() => {
                setDisplayValidation(true);
                formik.handleSubmit();
              }}
            />
          </View>
        }
      />
      <AppCalenderModal
        ref={modalRef}
        onPressDate={onPressDate}
        minDate={(() => {
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate());
          return tomorrow.toString();
        })()}
        maxDate={(() => {
          const next7Days = new Date();
          next7Days.setDate(next7Days.getDate() + 7);
          return next7Days.toString();
        })()}
        startDateFromProps={currentPickupDate}
        endDateFromProps={currentEndPickupDate}
        selectedDate={
          currentPickupDate ? currentPickupDate : returnTomorrowDate()
        }
        isFixedFromProps={isFixedPickUP}
      />
      <AppCalenderModal
        ref={modalRefReturnPickUP}
        onPressDate={onPressRoundDate}
        minDate={returnPreviousDate(currentPickupDate)}
        maxDate={(() => {
          const next7Days = new Date();
          next7Days.setDate(next7Days.getDate() + 7);
          return next7Days.toString();
        })()}
        startDateFromProps={currentReturnPickupDate}
        endDateFromProps={currentEndDropUpDate}
        selectedDate={
          currentReturnPickupDate ? currentReturnPickupDate : currentPickupDate
        }
        isFixedFromProps={isFixedDropUpDate}
      />
    </AppContainer>
  );
};
