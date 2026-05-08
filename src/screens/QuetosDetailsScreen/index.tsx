import React from 'react';
import {View} from 'react-native';

import {
  AppHOButton,
  AppModal,
  AppScreen,
  AppScrollView,
  AppSuccessAlert,
  AppText,
  AppTouchable,
} from '~/components';
import {
  AppColors,
  AppFonts,
  AppFontSizes,
  IcDownArrow,
  IcUpArrow,
  QuetosDetailsScreenTestKeys,
} from '~/constants';
import {QuetosTypeEnum, QuotationStatus} from '~/enums/quetos';
import {translate} from '~/localization';
import {DateFormat, formateLocalDate} from '~/utils';
import {
  returnHorseTrailerText,
  returnStatus,
  returnTrailerList,
  setFlexibleDatesForQuetos,
} from '~/utils/quetos';

import {LogOutModal} from '../Tab/Profile/components/LogOutModal';

import {ListDetailsContainer} from './components/ListDetailsContainer';
import {ReceivedQuetosListItem} from './components/ReceivedQuetosListItem';
import {useQuetosDetailsController} from './controller';
import {styles} from './styles';

export const QuetosDetailsScreen = () => {
  const {
    isExpandView,
    quetosDetails,
    successModelRef,
    modalRef,
    acceptModalRef,
    declineModalRef,
    onPressGoBack,
    setExpandView,
    onPressAccept,
    onPressDecline,
    onDone,
    onPressDeclineAll,
    openModal,
    closeModal,
    closeModalAccept,
    closeModalDecline,
    onPressDeclineQuote,
    onPressAcceptQuote,
  } = useQuetosDetailsController();

  /**
   * Function to get the formatted date based on the quetos details.
   * @param {Object} quetosDetailsForDate - The details of the quetos.
   * @returns {string} - The formatted date.
   */
  const getFormattedDate = (
    quetosDetailsForDate: TripDetailsResponse,
  ): string => {
    if (!quetosDetailsForDate) {
      return '';
    }

    return quetosDetailsForDate.isFlexiblePickUpDate
      ? setFlexibleDatesForQuetos(
          quetosDetailsForDate.pickUpDate,
          quetosDetailsForDate.lastPickUpDate,
        )
      : formateLocalDate(
          quetosDetailsForDate.pickUpDate,
          DateFormat.DD_MM_YYYY,
        );
  };
  /**
   * Function to get the formatted date based on the quetos details.
   * @param {Object} quetosDetailsForReturnDate - The details of the quetos.
   * @returns {string} - The formatted date.
   */
  const getFormattedReturnDate = (
    quetosDetailsForReturnDate: TripDetailsResponse,
  ): string => {
    if (!quetosDetailsForReturnDate) {
      return '';
    }
    if (
      quetosDetailsForReturnDate.isFlexibleReturnDate &&
      quetosDetailsForReturnDate?.returnDate &&
      quetosDetailsForReturnDate?.lastReturnDate
    ) {
      return setFlexibleDatesForQuetos(
        quetosDetailsForReturnDate?.returnDate,
        quetosDetailsForReturnDate.lastReturnDate,
      );
    } else {
      return formateLocalDate(
        quetosDetailsForReturnDate.pickUpDate,
        DateFormat.DD_MM_YYYY,
      );
    }
  };
  /**
   * State hooks
   */
  const datePickupDate =
    (quetosDetails && getFormattedDate(quetosDetails)) ?? '';
  const dateReturnPickupDate =
    (quetosDetails && getFormattedReturnDate(quetosDetails)) ?? '';

  const tripType = quetosDetails && returnStatus(quetosDetails?.tripType);
  const trailer = quetosDetails
    ? returnTrailerList(quetosDetails?.trailer)
    : '';
  const horses = quetosDetails ? returnTrailerList(quetosDetails?.horses) : '';
  /**
   * The function `findAcceptedId` returns the ID of an accepted quotation, if found, or an empty string
   * if not found.
   * @returns The `findAcceptedId` function returns a string value representing the `_id` of the accepted
   * quotation if found, or an empty string if no accepted quotation is found.
   */

  const findAcceptedId = (): string => {
    const acceptedQuotation = quetosDetails?.quotations?.find(
      quotation => quotation.status === QuotationStatus.ACCEPTED,
    );
    return acceptedQuotation?._id ?? '';
  };

  /**
   * The onPressExpandView function toggles the state of isExpandView between true and false.
   */
  const onPressExpandView = () => {
    setExpandView(!isExpandView);
  };
  /**
   * The function `renderReceivedQuotation` renders a list item component for a received quotation in a
   * TypeScript React application.
   * @param {Quotation} item - The `item` parameter in the `renderReceivedQuotation` function is of type
   * `Quotation`. It is used to render a `ReceivedQuetosListItem` component with specific data related to
   * the quotation item.
   * @returns A JSX element is being returned, specifically a `<ReceivedQuetosListItem>` component with
   * props `key`, `data`, `onPress`, and `horseLength`.
   */
  const renderReceivedQuotation = (item: Quotation) => {
    return (
      <ReceivedQuetosListItem
        key={item?._id}
        data={item}
        onPress={onPressAcceptQuote}
        horseLength={quetosDetails?.horses?.length ?? 0}
        acceptedQuotation={findAcceptedId()}
        onPressDecline={onPressDeclineQuote}
        trailerType={
          (quetosDetails && returnHorseTrailerText(quetosDetails?.trailer)) ??
          ''
        }
      />
    );
  };
  /* The above code is a TypeScript React component that renders a screen for displaying trip details
  and received quotations. */
  return (
    <AppScreen
      testID={QuetosDetailsScreenTestKeys.QUETOS_DETAILS_SCREEN}
      header={translate('quotes_detail')}
      onBack={onPressGoBack}>
      <View style={styles.subContainer}>
        <AppScrollView>
          {!isExpandView ? (
            <AppTouchable
              testID={QuetosDetailsScreenTestKeys.COLLAPSE_VIEW}
              onPress={onPressExpandView}
              style={styles.tripDetailsContainer}>
              <View style={styles.flexContainer}>
                <AppText
                  text={translate('TripDetails')}
                  fontSize={AppFontSizes[20]}
                  fontFamily={AppFonts.GentiumBasic_Bold}
                />
              </View>
              <IcDownArrow />
            </AppTouchable>
          ) : (
            <View style={styles.expandViewContainer}>
              <AppTouchable
                testID={QuetosDetailsScreenTestKeys.EXPAND_VIEW}
                onPress={onPressExpandView}
                style={styles.priceContainer}>
                <AppText
                  text={translate('TripDetails')}
                  fontSize={AppFontSizes[20]}
                  fontFamily={AppFonts.GentiumBasic_Bold}
                  containerStyle={styles.flexContainer}
                />
                <IcUpArrow />
              </AppTouchable>
              <ListDetailsContainer
                testID={QuetosDetailsScreenTestKeys.TRIP_NAME}
                key={translate('TripName')}
                label={translate('TripName')}
                value={quetosDetails?.name ?? ''}
                viewContainer={styles.quetosDetailsContainer}
              />
              <View style={styles.listInnerContainer}>
                <ListDetailsContainer
                  key={translate('PickupDate')}
                  label={
                    !quetosDetails?.isFlexiblePickUpDate
                      ? translate('PickupDate')
                      : translate('flexible_pick_up_date')
                  }
                  value={datePickupDate}
                  viewContainer={styles.viewDateContainer}
                />
                <ListDetailsContainer
                  testID={QuetosDetailsScreenTestKeys.TRIP_TYPE}
                  key={translate('TripType')}
                  label={translate('TripType')}
                  value={tripType ?? ''}
                  viewContainer={styles.viewDateContainer}
                />
              </View>
              <ListDetailsContainer
                testID={QuetosDetailsScreenTestKeys.PICK_UP_LOCATION}
                key={translate('pickup_location')}
                label={translate('pickup_location')}
                value={quetosDetails?.pickUp?.address ?? ''}
              />
              <ListDetailsContainer
                testID={QuetosDetailsScreenTestKeys.DROP_UP_LOCATION}
                key={translate('drop_off_location')}
                label={translate('drop_off_location')}
                value={quetosDetails?.dropOff?.address ?? ''}
              />
              {tripType === QuetosTypeEnum.ROUND_TRIP ? (
                <>
                  <ListDetailsContainer
                    testID={QuetosDetailsScreenTestKeys.PICK_UP_DATE}
                    key={translate('return_pick_up_date')}
                    label={
                      !quetosDetails?.isFlexiblePickUpDate
                        ? translate('return_pick_up_date')
                        : translate('flexible_return_pick_up_date')
                    }
                    value={dateReturnPickupDate}
                  />
                  <ListDetailsContainer
                    key={translate('return_pickup_location')}
                    label={translate('return_pickup_location')}
                    value={quetosDetails?.returnPickUp?.address ?? ''}
                  />
                  <ListDetailsContainer
                    key={translate('return_drop_off_location')}
                    label={translate('return_drop_off_location')}
                    value={quetosDetails?.returnDropOff?.address ?? ''}
                  />
                </>
              ) : null}
              <ListDetailsContainer
                testID={QuetosDetailsScreenTestKeys.TRAILER_TYPE}
                key={translate('TrailerType')}
                label={translate('TrailerType')}
                value={trailer}
              />
              <ListDetailsContainer
                testID={QuetosDetailsScreenTestKeys.HORSES}
                key={translate('Horses')}
                label={translate('Horses')}
                value={horses}
              />
              <ListDetailsContainer
                testID={QuetosDetailsScreenTestKeys.NOTES}
                key={translate('AdditionalNotes')}
                label={translate('AdditionalNotes')}
                value={quetosDetails?.notes ?? ''}
              />
            </View>
          )}
          <View style={styles.declineAllContainer}>
            <AppText
              text={
                isExpandView
                  ? translate('received_quote_details')
                  : translate('quotes_received')
              }
              fontSize={AppFontSizes[20]}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontColor={AppColors.greyLight1}
              containerStyle={styles.receivedQuetosText}
            />
            {!isExpandView && findAcceptedId() === '' && (
              <AppHOButton
                text={translate('decline_all')}
                containerStyle={styles.viewButton}
                textFontFamily={AppFonts.GentiumBasic_Bold}
                textSize={AppFontSizes[14]}
                onPress={openModal}
              />
            )}
          </View>
          <AppScrollView>
            <>
              {quetosDetails &&
                quetosDetails?.quotations &&
                quetosDetails?.quotations?.map(renderReceivedQuotation)}
            </>
          </AppScrollView>
        </AppScrollView>
      </View>
      <AppModal ref={successModelRef}>
        <AppSuccessAlert
          title={translate('success')}
          message={translate('quotation_success_message')}
          topBtnText={translate('OK')}
          onTopPress={onDone}
        />
      </AppModal>
      <AppModal ref={modalRef}>
        <LogOutModal
          header={translate('decline_all_quetos')}
          message={translate('are_you_sure_you_want_to_declined_all_quotes')}
          onCancel={closeModal}
          onConfirm={onPressDeclineAll}
        />
      </AppModal>
      <AppModal ref={acceptModalRef}>
        <LogOutModal
          header={translate('accept_quetos')}
          message={translate('are_you_sure_you_want_to_accept_quotes')}
          onCancel={closeModalAccept}
          onConfirm={onPressAccept}
        />
      </AppModal>
      <AppModal ref={declineModalRef}>
        <LogOutModal
          header={translate('decline_quetos')}
          message={translate('are_you_sure_you_want_to_decline_quotes')}
          onCancel={closeModalDecline}
          onConfirm={onPressDecline}
        />
      </AppModal>
    </AppScreen>
  );
};
