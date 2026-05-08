import React from 'react';
import {View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';

import {AppScreen, AppText} from '~/components';
import {
  AppColors,
  AppEnvironment,
  AppFonts,
  AppFontSizes,
  AppSpacing,
  IcAlert,
  IcDeliveryTruck,
  IcMapHome,
  IcStar,
  TripDetailTestKeys,
} from '~/constants';
import {TripStatusAll} from '~/enums';
import {translate} from '~/localization';
import {capitalizeFirstLetter} from '~/utils';
import {formatPhoneNumber} from '~/utils/quetos';

import {DriverDetailsComponent} from '../MyTripDetail/components/DriverDetailsComponent';
import {TripCheckPoint} from '../MyTripDetail/components/TripCheckPoints';

import styles from './styles';
import {useTripStatusController} from './useTripStatusController';

/**
 * Trip Status will show map with pickup and drop-off location and animate if trip is in-transit along with device location
 *  @returns {JSX.Element} - A view containing trip status details
 */
export const TripStatus = (): JSX.Element => {
  const {
    mapRef,
    bottomSheetRef,
    newRegion,
    pickUp,
    dropOff,
    tripDetail,
    driverLocation,
    showDriverLocation,
    tracksViewChanges,
    onBack,
    onRegionComplete,
  } = useTripStatusController();

  /**
   *   @description - This object is used to set the origin and destination for the map view directions
   */

  const origin = {
    latitude: pickUp.lat,
    longitude: pickUp.lng,
  };
  const destination = {
    latitude: dropOff.lat,
    longitude: dropOff.lng,
  };

  /**
   *   @description - This function is used to render the trip update component
   *   @param - tripDetail: TripDetailResponse
   *   @returns - JSX.Element
   */
  const renderTripUpdate = () => {
    return (
      <View style={styles.tripUpdate}>
        <View style={styles.tripDetails}>
          <AppText
            text={translate('trip_update')}
            fontFamily={AppFonts.GentiumBasic_Bold}
            fontSize={AppSpacing[20]}
          />
        </View>
        <View>
          <TripCheckPoint
            tripStatus={tripDetail.status as TripStatusAll}
            tripDetail={tripDetail}
          />
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
                    text={tripDetail?.averageReview?.toString()}
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
      <>
        <View style={styles.border} />
        <View
          testID={TripDetailTestKeys.INCIDENT_REPORT}
          style={styles.incidentDetails}>
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
      </>
    );
  };
  return (
    <GestureHandlerRootView>
      <AppScreen
        header={translate('trip_status')}
        onBack={onBack}
        screenStyle={styles.screenStyle}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          initialRegion={newRegion}
          onRegionChangeComplete={onRegionComplete}
          style={styles.mapStyle}>
          {showDriverLocation ? (
            <MapViewDirections
              origin={{
                latitude: Number(driverLocation.lat),
                longitude: Number(driverLocation.lng),
              }}
              destination={destination}
              apikey={AppEnvironment.map_api_key}
              mode={'DRIVING'}
              strokeWidth={3}
              strokeColor={AppColors.peanBlue}
              resetOnChange={false}
            />
          ) : (
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={AppEnvironment.map_api_key}
              mode={'DRIVING'}
              strokeWidth={3}
              strokeColor={AppColors.peanBlue}
              onError={errorMessage => {
                console.log('GOT AN ERROR', errorMessage);
              }}
            />
          )}
          {showDriverLocation ? null : (
            <Marker
              key={pickUp.address}
              coordinate={{
                latitude: pickUp.lat,
                longitude: pickUp.lng,
              }}
              zIndex={100}
              tracksViewChanges={tracksViewChanges}>
              <View style={styles.iconView}>
                <IcMapHome
                  height={styles.locationIcon.height}
                  width={styles.locationIcon.width}
                />
              </View>
            </Marker>
          )}
          <Marker
            key={dropOff.address}
            coordinate={{
              latitude: dropOff.lat,
              longitude: dropOff.lng,
            }}
            zIndex={100}
            tracksViewChanges={tracksViewChanges}>
            <View style={styles.iconView}>
              <IcMapHome
                height={styles.locationIcon.height}
                width={styles.locationIcon.width}
              />
            </View>
          </Marker>
          {showDriverLocation && driverLocation?.lat && (
            <Marker.Animated
              key={driverLocation.lat}
              coordinate={{
                latitude: Number(driverLocation.lat),
                longitude: Number(driverLocation.lng),
              }}
              zIndex={1000}
              tracksViewChanges={false}>
              <View>
                <IcDeliveryTruck
                  height={styles.deliveryVehicle.height}
                  width={styles.deliveryVehicle.width}
                />
              </View>
            </Marker.Animated>
          )}
        </MapView>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={['10%', '30%', '60%', '90%']}
          index={1}>
          <BottomSheetScrollView>
            <View style={styles.bottomSheet}>
              {renderTripUpdate()}
              {returnTransportDetails()}
              {tripDetail?.incident ? returnIncidentReport() : ''}
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      </AppScreen>
    </GestureHandlerRootView>
  );
};
