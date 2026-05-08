import {useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';
import MapView from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import {
  NavigationProp,
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {AppScreens, SOCKET_CUSTOM_EVENTS} from '~/constants';
import {useSocket} from '~/context';
import {TripStatusAll, TripType} from '~/enums';
import {Storage} from '~/helpers';
import {useTripDetailApiAction} from '~/store';
import {log, showError} from '~/utils';
/**
 * useTripStatusController
 * @returns {ITripStatusController} - Controller for Trip Status Screen
 * @description This controller is used to manage Trip Status Screen
 * @memberof TripStatusController
 * @see useTripStatusController
 * @example
 * const {mapRef, bottomSheetRef, region, pickUp, dropOff, newRegion, tripDetail, driverLocation, onBack, onRegionComplete} = useTripStatusController();
 */
interface ITripStatusController {
  mapRef: React.RefObject<MapView>;
  bottomSheetRef: React.RefObject<BottomSheet>;
  region: Region;
  pickUp: Location;
  dropOff: Location;
  newRegion: Region;
  tripDetail: TripDetailResponseType;
  driverLocation: SocketCoords;
  showDriverLocation: boolean;
  tracksViewChanges: boolean;
  onBack: () => void;
  onRegionComplete: (region: Region) => void;
}

const defaultRegion = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export const useTripStatusController = (): ITripStatusController => {
  /**
   *  App Permission Controller
   *  @const {locationAllowed, onToggleLocation} = useAppPermissionController();
   */

  /**
   *  Map and Bottom Sheet Ref
   *  @const {mapRef, bottomSheetRef} = useRef<MapView>(null);
   */
  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  /**
   * Socket Connection Variable
   * @const {socket, connectSocket, }
   * @memberof MyTripDetailController
   * @description This variable is used to handle socket connection and events.
   * @see useSocket
   */
  const {socket, connectSocket} = useSocket();

  /**
   *  Navigation and Route hooks
   */
  const navigation = useNavigation<NavigationProp<MyTripsStackParamList>>();

  /**
   *  Route params
   */
  const {params} =
    useRoute<RouteProp<MyTripsStackParamList, AppScreens.TripStatusScreen>>();

  const trip = params?.trip;
  /**
   *  State variables
   */
  const [tripDetail, setTripDetails] = useState<TripDetailResponseType>(
    trip as TripDetailResponseType,
  );
  const [region, SetRegion] = useState<Region>(defaultRegion);
  const [showDriverLocation, SetShowDriverLocation] = useState<boolean>(false);
  const [tracksViewChanges, SetTracksViewChanges] = useState<boolean>(true);
  const [driverLocation, SetDriverLocation] = useState<SocketCoords>({
    lat: String(region.latitude),
    lng: String(region.longitude),
  });

  /**
   *  API calls definition
   */
  const {mutateAsync: getTrips} = useTripDetailApiAction();

  /**
   *  useEffect
   */
  const isFocused = useIsFocused();
  useEffect(() => {
    connectSocket();
    connectUser();
    getTripDetails();
    return () => {};
  }, [isFocused]);

  /**
   *  API calls
   *  @returns {Promise<void>}
   *  @private
   *  @description API calls for get trip details
   *  @see useTripDetailApiAction
   *  @memberof MyTripDetailController
   *  @function getTripDetails
   */
  const getTripDetails = async (): Promise<void> => {
    const req: TripDetailRequestType = {
      _id: trip._id,
    };
    try {
      const res = await getTrips(req);
      if (res?._id) {
        log('res', res.chatRoom);
        if (
          res.status === TripStatusAll.COMPLETED ||
          res.status === TripStatusAll.INITIAL_COMPLETE
        ) {
          SetShowDriverLocation(false);
        }
        setTripDetails(res);
        setTimeout(() => {
          SetTracksViewChanges(false);
        }, 2000);
      }
    } catch (error: any) {
      showError(error);
    }
  };

  /**
   * Socket Connection
   * @returns {void}
   * @private
   * @description This function is used to connect socket
   * @memberof MyTripDetailController
   * @function connectUser
   */

  const connectUser = (): void => {
    let userData = Storage.getUserData();
    log('userData', userData);
    socket?.emit(
      SOCKET_CUSTOM_EVENTS.CONNECT_TRIP_ROOM,
      {
        userId: userData?._id,
      },
      (response: any) => {
        log('response of USER_CONNECT :- ', response);
        watchLocationUpdate();
      },
    );
  };

  /**
   *  @returns {void}
   *  @private
   *  @description This function is used to watch location update
   *  @memberof MyTripDetailController
   *  @function watchLocationUpdate
   *  @see SOCKET_CUSTOM_EVENTS.RECEIVE_LOCATION
   *  @example
   *  watchLocationUpdate();
   */
  const watchLocationUpdate = (): void => {
    socket?.on(
      SOCKET_CUSTOM_EVENTS.RECEIVE_LOCATION,
      (data: SocketTripData) => {
        updateTripDate(data);
      },
    );
  };
  /**
   *
   * @param data
   * @description This function is used to update trip data
   * @memberof MyTripDetailController
   * @function updateTripDate
   * @returns {void}
   */
  const updateTripDate = (data: SocketTripData): void => {
    if (data?.trip._id === tripDetail._id) {
      const {driverLocation: newDriverLocation, trip: newTrip} = data;
      const {lat, lng} = newDriverLocation;
      if (AppState.currentState === 'active') {
        SetRegion({
          ...region,
          latitude: Number(lat),
          longitude: Number(lng),
        });
        SetDriverLocation(newDriverLocation);
      }
      if (
        data.trip.status === TripStatusAll.COMPLETED ||
        data.trip.status === TripStatusAll.INITIAL_COMPLETE
      ) {
        SetShowDriverLocation(false);
      } else {
        SetShowDriverLocation(true);
      }
      setTripDetails(newTrip);
    }
  };

  /**
   *
   * @param pickup
   * @param dropOff
   * @description This function is used to calculate region from trip detail
   * @memberof MyTripDetailController
   * @function calculateRegion
   * @returns {Region}
   * @example
   * const newRegion = calculateRegion(pickup, dropOff);
   * @returns
   */
  const calculateRegion = (pickup: Coords, dropOff: Coords): Region => {
    const latitude = (pickup.latitude + dropOff.latitude) / 2;
    const longitude = (pickup.longitude + dropOff.longitude) / 2;

    const latitudeDelta = Math.abs(pickup.latitude - dropOff.latitude) * 1.5;
    const longitudeDelta = Math.abs(pickup.longitude - dropOff.longitude) * 1.5;

    return {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    };
  };
  /**
   * newRegion
   * @description This variable is used to calculate region from trip detail
   * @memberof MyTripDetailController
   * @see calculateRegion
   */
  // const dropLocation = tripDetail.dropOff;
  // const pickUpLocation = tripDetail.pickUp;
  const dropLocation =
    tripDetail.tripType === TripType.ONE_WAY
      ? tripDetail.dropOff
      : tripDetail.roundTripCount === 0
      ? tripDetail.dropOff
      : tripDetail.returnDropOff;
  const pickUpLocation =
    tripDetail.tripType === TripType.ONE_WAY
      ? tripDetail.pickUp
      : tripDetail.roundTripCount === 0
      ? tripDetail.pickUp
      : tripDetail.returnPickUp;
  const newRegion = calculateRegion(
    {
      latitude: pickUpLocation?.lat ?? tripDetail.pickUp.lat,
      longitude: pickUpLocation?.lng ?? tripDetail.pickUp.lng,
    },
    {
      latitude: dropLocation?.lat ?? tripDetail.dropOff.lng,
      longitude: dropLocation?.lng ?? tripDetail.dropOff.lng,
    },
  );

  /**
   * @description This function is used to go back to previous screen
   * @memberof MyTripDetailController
   * @function onBack
   * @returns {void}
   * @example
   * onBack();
   */
  const onBack = (): void => {
    navigation.goBack();
  };

  /**
   * @description This function is used to handle region change
   * @memberof MyTripDetailController
   * @function onRegionComplete
   * @param {Region} regionNew
   * @returns {void}
   * @example
   * onRegionComplete(regionNew);
   */

  const onRegionComplete = (regionNew: Region): void => {
    SetRegion({
      ...region,
      latitudeDelta: regionNew.latitudeDelta,
      longitudeDelta: regionNew.longitudeDelta,
    });
  };

  /**
   * @description This is used to return all the values and functions
   * @memberof MyTripDetailController
   * @returns {Object} - Object containing all the values and functions
   * @example
   * const {mapRef, bottomSheetRef, region, pickUp, dropOff, newRegion, tripDetail, onBack, onPressButton, onPressReportIncident} = useTripStatusController();
   */
  return {
    mapRef,
    bottomSheetRef,
    region,
    pickUp: pickUpLocation,
    dropOff: dropLocation,
    newRegion,
    tripDetail,
    driverLocation,
    showDriverLocation,
    tracksViewChanges,
    onBack,
    onRegionComplete,
  };
};
