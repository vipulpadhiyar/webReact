import React from 'react';
import {View} from 'react-native';

import {
  AppButton,
  AppConfirmAlert,
  AppModal,
  AppScreen,
  AppScrollView,
  AppText,
} from '~/components';
import {
  AppColors,
  AppFonts,
  AppFontSizes,
  AppSpacing,
  IcAlert,
  IcCancel,
  IcStar,
  TripDetailTestKeys,
} from '~/constants';
import {TripStatusAll} from '~/enums/trips';
import {translate} from '~/localization';
import {TripType} from '~/screens/Tab/MyTrips/components/TripListItem';
import {TripStatus} from '~/screens/Tab/MyTrips/components/TripStatus';
import {capitalizeFirstLetter, DateFormat, formateLocalDate} from '~/utils';
import {formatPhoneNumber} from '~/utils/quetos';

import {DriverDetailsComponent} from './components/DriverDetailsComponent';
import {TripCheckPoint} from './components/TripCheckPoints';
import styles from './styles';
import {useMyTripDetailController} from './useMyTripDetailsController';

/**
 *
 * My TripDetail is screen to view details of trip
 * User can check details as well as current status
 * Use can cancel upcoming trip
 */
export const MyTripDetail = () => {
  /**
   *  useMyTripDetailController usage
   */
  const {
    isSuccess,
    tripDetail,
    modalDeleteRef,
    onBack,
    getTrailerTypes,
    getHorsesNames,
    openModalDelete,
    closeModalDelete,
    cancelTripHandler,
    findInTripStatus,
    onPressAddReview,
    onTripStatusPress,
    showTripStatus,
  } = useMyTripDetailController();
  /**
   *  get trip type to find one way or round trip
   */
  const getTripType = (type: string) => {
    return TripType.find(item => item.key === type)?.title ?? '';
  };
  /**
   * Get pickup details from status history
   */
  const pickupDetailsCheck =
    findInTripStatus && findInTripStatus(TripStatusAll.PICKUP);

  /**
   *  on confirm press
   */
  const onConfirmPress = () => {
    closeModalDelete();
    cancelTripHandler();
  };

  const pickUpDate = formateLocalDate(
    tripDetail.pickUpDate,
    DateFormat.MM_DD_YYYY,
  );
  const pickUpLastDate = formateLocalDate(
    tripDetail.lastPickUpDate,
    DateFormat.MM_DD_YYYY,
  );
  const returnDate = formateLocalDate(
    tripDetail.returnDate,
    DateFormat.MM_DD_YYYY,
  );

  const returnLastDate = formateLocalDate(
    tripDetail.lastReturnDate,
    DateFormat.MM_DD_YYYY,
  );

  const finalPickUpDate =
    pickUpDate === pickUpLastDate
      ? pickUpDate
      : pickUpDate + ` ${translate('to')} ` + pickUpLastDate;

  const finalReturnDate =
    returnDate === returnLastDate
      ? returnDate
      : returnDate + ` ${translate('to')} ` + returnLastDate;
  const renderTripDetails = () => {
    return (
      <View style={styles.tripDetails}>
        <View style={styles.detailsStatusView}>
          <AppText
            text={translate('TripDetails')}
            fontFamily={AppFonts.GentiumBasic_Bold}
            fontSize={AppSpacing[20]}
          />
          <TripStatus status={tripDetail.status} />
        </View>
        <View style={styles.detailsStatusView}>
          <View>
            <AppText
              text={translate('TripName')}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontSize={AppSpacing[16]}
            />
            <AppText
              text={tripDetail.name}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontSize={AppSpacing[14]}
              fontColor={AppColors.subTextColor}
            />
          </View>

          {showTripStatus() && (
            <AppButton
              text={translate('trip_status')}
              textFontFamily={AppFonts.GentiumBasic_Bold}
              containerStyle={styles.tripStatus}
              textStyle={styles.tripStatusText}
              textSize={AppSpacing[14]}
              onPress={onTripStatusPress}
            />
          )}
        </View>
        <View style={styles.twoColumnView}>
          <View style={styles.nameView}>
            <AppText
              text={
                tripDetail.isFlexiblePickUpDate
                  ? translate('flexible_pick_up_date')
                  : translate('PickupDate')
              }
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontSize={AppSpacing[16]}
            />
            <AppText
              text={finalPickUpDate}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontSize={AppSpacing[14]}
              fontColor={AppColors.subTextColor}
            />
          </View>
          <View style={styles.nameView}>
            <AppText
              text={translate('TripType')}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontSize={AppSpacing[16]}
            />
            <AppText
              text={getTripType(tripDetail.tripType)}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontSize={AppSpacing[14]}
              fontColor={AppColors.subTextColor}
            />
          </View>
        </View>

        {tripDetail.returnDate ? (
          <View style={styles.twoColumnView}>
            <View style={styles.nameView}>
              <AppText
                text={
                  tripDetail.isFlexibleReturnDate
                    ? translate('flexible_return_pick_up_date')
                    : translate('ReturnDate')
                }
                fontFamily={AppFonts.GentiumBasic_Regular}
                fontSize={AppSpacing[16]}
              />
              <AppText
                text={finalReturnDate}
                fontFamily={AppFonts.GentiumBasic_Regular}
                fontSize={AppSpacing[14]}
                fontColor={AppColors.subTextColor}
              />
            </View>
          </View>
        ) : null}
        <View style={styles.twoColumnView}>
          <View style={styles.nameView}>
            <AppText
              text={translate('PickupAddress')}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontSize={AppSpacing[16]}
            />
            <AppText
              text={tripDetail.pickUp.address}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontSize={AppSpacing[14]}
              fontColor={AppColors.subTextColor}
            />
          </View>
        </View>
        <View style={styles.twoColumnView}>
          <View style={styles.nameView}>
            <AppText
              text={translate('DropOffAddress')}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontSize={AppSpacing[16]}
            />
            <AppText
              text={tripDetail.dropOff.address}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontSize={AppSpacing[14]}
              fontColor={AppColors.subTextColor}
            />
          </View>
        </View>
        {tripDetail.returnPickUp ? (
          <View style={styles.twoColumnView}>
            <View style={styles.nameView}>
              <AppText
                text={translate('ReturnPickupAddress')}
                fontFamily={AppFonts.GentiumBasic_Regular}
                fontSize={AppSpacing[16]}
              />
              <AppText
                text={tripDetail.returnPickUp.address}
                fontFamily={AppFonts.GentiumBasic_Regular}
                fontSize={AppSpacing[14]}
                fontColor={AppColors.subTextColor}
              />
            </View>
          </View>
        ) : null}
        {tripDetail.returnDropOff ? (
          <View style={styles.twoColumnView}>
            <View style={styles.nameView}>
              <AppText
                text={translate('ReturnDropOffAddress')}
                fontFamily={AppFonts.GentiumBasic_Regular}
                fontSize={AppSpacing[16]}
              />
              <AppText
                text={tripDetail.returnDropOff.address}
                fontFamily={AppFonts.GentiumBasic_Regular}
                fontSize={AppSpacing[14]}
                fontColor={AppColors.subTextColor}
              />
            </View>
          </View>
        ) : null}
        <View style={styles.twoColumnView}>
          <View style={styles.nameView}>
            <AppText
              text={translate('TrailerType')}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontSize={AppSpacing[16]}
            />
            <AppText
              text={getTrailerTypes(tripDetail.trailer)}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontSize={AppSpacing[14]}
              fontColor={AppColors.subTextColor}
            />
          </View>
        </View>
        <View style={styles.twoColumnView}>
          <View style={styles.nameView}>
            <AppText
              text={translate('Horses')}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontSize={AppSpacing[16]}
            />
            <AppText
              text={getHorsesNames(tripDetail.horses)}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontSize={AppSpacing[14]}
              fontColor={AppColors.subTextColor}
            />
          </View>
        </View>
        <View style={styles.twoColumnView}>
          <View style={styles.nameView}>
            <AppText
              text={translate('AdditionalNotes')}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontSize={AppSpacing[16]}
            />
            <AppText
              text={tripDetail.notes}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontSize={AppSpacing[14]}
              fontColor={AppColors.subTextColor}
            />
          </View>
        </View>
      </View>
    );
  };

  /**
   * Component to render the transport details.
   * This includes transport company name, driver details, transport cost,
   * and contact information like email and phone number.
   * @returns {JSX.Element} - A view containing transport details.
   */
  const returnTransportDetails = (): JSX.Element => {
    return (
      <View
        testID={TripDetailTestKeys.TRANSPORT_DETAILS}
        style={styles.driverDetails}>
        <AppText
          text={translate('transporter_details')}
          fontFamily={AppFonts.GentiumBasic_Bold}
          fontSize={AppSpacing[20]}
        />
        <View style={styles.innerDetailsContainer}>
          <View style={styles.flexContainer}>
            <AppText
              text={tripDetail?.transportCompany ?? ''}
              fontSize={AppFontSizes[16]}
              fontFamily={AppFonts.GentiumBasic_Regular}
              fontColor={AppColors.greyLight1}
            />
            <View style={styles.ratingContainer}>
              <View style={styles.mainStarContainer}>
                <AppText
                  text={
                    tripDetail?.driverName
                      ? capitalizeFirstLetter(tripDetail?.driverName)
                      : ''
                  }
                  fontSize={AppFontSizes[14]}
                  fontFamily={AppFonts.GentiumBasic_Regular}
                  fontColor={AppColors.greyLight8}
                />
                <View style={styles.starContainer}>
                  <IcStar />
                  <AppText
                    text={tripDetail?.averageReview.toString()}
                    fontFamily={AppFonts.GentiumBasic_Regular}
                    fontSize={AppFontSizes[12]}
                    fontColor={AppColors.yellow}
                  />
                </View>
              </View>
            </View>
          </View>
          <AppText
            text={`$ ${Number(tripDetail?.amount).toFixed(2)}`}
            fontFamily={AppFonts.GentiumBasic_Bold}
            fontSize={AppFontSizes[16]}
            fontColor={AppColors.greyLight1}
          />
        </View>
        <View style={styles.listInnerContainer}>
          <DriverDetailsComponent
            key={translate('Email')}
            label={translate('Email')}
            value={tripDetail?.tcEmail ?? ''}
            viewContainer={styles.viewDateContainer}
          />
          <DriverDetailsComponent
            key={translate('Phone')}
            label={translate('Phone')}
            value={
              tripDetail?.tcPhoneNo
                ? formatPhoneNumber(tripDetail?.tcPhoneNo)
                : ''
            }
            viewContainer={styles.viewDateContainer}
          />
        </View>
      </View>
    );
  };

  /**
   * Renders a component displaying the incident report for a trip.
   *
   * @returns {JSX.Element} The rendered component.
   */
  const returnIncidentReport = (): JSX.Element => {
    return (
      <View
        testID={TripDetailTestKeys.INCIDENT_REPORT}
        style={styles.driverDetails}>
        <View style={styles.ratingContainer}>
          <IcAlert />
          <AppText
            text={translate('incident_report')}
            fontFamily={AppFonts.GentiumBasic_Bold}
            fontSize={AppSpacing[20]}
          />
        </View>
        <AppText
          text={tripDetail?.incident ?? ''}
          fontFamily={AppFonts.GentiumBasic_Regular}
          fontSize={AppSpacing[14]}
          fontColor={AppColors.greyLight8}
          containerStyle={styles.incidentText}
        />
      </View>
    );
  };
  /**
   * Renders a component displaying the review
   *
   * @returns {JSX.Element} The rendered component.
   */
  const returnReview = (): JSX.Element => {
    return (
      <View
        testID={TripDetailTestKeys.INCIDENT_REPORT}
        style={styles.driverDetails}>
        <View style={styles.ratingContainer}>
          <AppText
            text={translate('review')}
            fontFamily={AppFonts.GentiumBasic_Bold}
            fontSize={AppSpacing[20]}
          />
        </View>
        <View style={styles.myStarContainer}>
          <IcStar />
          <AppText
            text={tripDetail?.myReview.rating.toString()}
            fontFamily={AppFonts.GentiumBasic_Regular}
            fontSize={AppFontSizes[12]}
            fontColor={AppColors.yellow}
          />
        </View>
        <AppText
          text={tripDetail?.myReview?.review ?? ''}
          fontFamily={AppFonts.GentiumBasic_Regular}
          fontSize={AppSpacing[14]}
          fontColor={AppColors.greyLight8}
          containerStyle={styles.incidentText}
        />
      </View>
    );
  };

  /**
   * Renders a component showing the trip's status updates, including pickup, transit, and drop-off details.
   *
   * @returns {JSX.Element} The rendered component.
   */
  const returnTripUpdate = (): JSX.Element => {
    return (
      <View
        testID={TripDetailTestKeys.TRIP_UPDATE}
        style={styles.driverDetails}>
        <AppText
          text={translate('trip_update')}
          fontFamily={AppFonts.GentiumBasic_Bold}
          fontSize={AppSpacing[20]}
          containerStyle={styles.pickUpDateText}
        />
        <TripCheckPoint
          tripStatus={tripDetail.status as TripStatusAll}
          tripDetail={tripDetail}
        />
      </View>
    );
  };

  return (
    <AppScreen header={translate('MyTripDetail')} onBack={onBack}>
      <View style={styles.subContainer}>
        <AppScrollView contentContainerStyle={styles.scrollView}>
          <>
            {isSuccess && renderTripDetails()}
            {tripDetail.status !== TripStatusAll.UPCOMING &&
            tripDetail?.driverName
              ? returnTransportDetails()
              : null}
            {pickupDetailsCheck && returnTripUpdate()}
            {tripDetail?.incident ? returnIncidentReport() : ''}
            {tripDetail.status === TripStatusAll.UPCOMING && (
              <AppButton
                testID={TripDetailTestKeys.CANCEL_TRIP}
                text={translate('CancelTrip')}
                textFontFamily={AppFonts.GentiumBasic_Bold}
                containerStyle={styles.cancelBtn}
                textSize={AppSpacing[16]}
                onPress={openModalDelete}
              />
            )}
            {tripDetail.status === TripStatusAll.COMPLETED &&
              !tripDetail?.myReview?.rating && (
                <AppButton
                  text={translate('add_review')}
                  textFontFamily={AppFonts.GentiumBasic_Bold}
                  containerStyle={styles.cancelBtn}
                  textSize={AppSpacing[16]}
                  onPress={onPressAddReview}
                />
              )}
            {tripDetail.status === TripStatusAll.COMPLETED &&
              tripDetail?.myReview?.rating &&
              returnReview()}
          </>
        </AppScrollView>
      </View>
      <AppModal ref={modalDeleteRef}>
        <AppConfirmAlert
          icon={IcCancel}
          title={translate('CancelTrip')}
          message={translate('AreYouSureYouWantToCancelTrip')}
          leftBtnText={translate('Confirm')}
          rightBtnText={translate('Cancel')}
          onLeftPress={onConfirmPress}
          onRightPress={closeModalDelete}
        />
      </AppModal>
    </AppScreen>
  );
};
