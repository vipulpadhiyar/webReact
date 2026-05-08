import {RefObject, useEffect, useRef, useState} from 'react';
import {
  CommonActions,
  NavigationProp,
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {RefAppModalProps} from '~/components/AppModal';
import {AppScreens} from '~/constants';
import {TripStatusAll} from '~/enums';
import {useCancelTripApiAction, useTripDetailApiAction} from '~/store/trip';
import {showError} from '~/utils';
import {trailerDataStatic} from '~/utils/data';

/**
 *
 *  @typedef {Object} IMyTripDetailsController
 *  @property {boolean} isSuccess - The success status of the API call
 *  @property {TripDetailResponseType} tripDetail - The trip details data
 *  @property {RefObject<RefAppModalProps>} modalDeleteRef - Reference to the modal delete component
 *  @property {() => void} openModalDelete - Function to open the modal delete
 *  @property {() => void} closeModalDelete - Function to close the modal delete
 *  @property {() => void} cancelTripHandler - Function to handle cancel trip
 *  @property {() => void} onBack - Function to handle back navigation
 *  @property {(trailers: string[]) => string} getTrailerTypes - Function to get trailer types
 *  @property {(horses: Horse[]) => string} getHorsesNames - Function to get horse names
 *  @property {(history: string) => StatusHistory | null} findInTripStatus - Function to find trip status
 *  @property {() => void} onTripStatusPress - Function to handle trip status press
 *  @property {() => boolean} showTripStatus - Function to show trip status
 *
 *  @description This interface defines the properties and methods for the MyTripDetailController
 *  @interface IMyTripDetailsController
 *  @memberof MyTripDetailController
 *  @extends {IMyTripDetailsController}
 *  @public
 *  @example
 *  const {isSuccess, tripDetail, modalDeleteRef, openModalDelete, closeModalDelete, cancelTripHandler, onBack, getTrailerTypes, getHorsesNames, findInTripStatus, onTripStatusPress, showTripStatus} = useMyTripDetailController();
 */
interface IMyTripDetailsController {
  isSuccess: boolean;
  tripDetail: TripDetailResponseType;
  modalDeleteRef: RefObject<RefAppModalProps>;
  openModalDelete: () => void;
  closeModalDelete: () => void;
  onPressAddReview: () => void;
  cancelTripHandler: () => void;
  onBack: () => void;
  getTrailerTypes: (trailers: string[]) => string;
  getHorsesNames: (horses: Horse[]) => string;
  findInTripStatus: (history: string) => StatusHistory | null;
  onTripStatusPress: () => void;
  showTripStatus: () => boolean;
}

export const useMyTripDetailController = (): IMyTripDetailsController => {
  /**
   *  Navigation and Route hooks
   */
  const navigation = useNavigation<NavigationProp<MyTripsStackParamList>>();

  /**
   *  Route params
   */
  const {params} =
    useRoute<RouteProp<MyTripsStackParamList, AppScreens.MyTripDetailScreen>>();

  let trip = params?.trip;

  /**
   *  State variables
   */
  const [tripDetail, setTripDetails] = useState(trip);

  /**
   *  API hooks
   */
  const {mutateAsync: getTrips, isSuccess} = useTripDetailApiAction();
  const {mutateAsync: cancelTrip} = useCancelTripApiAction();
  /**
   * Function alert when screen is focused
   */
  const isFocused = useIsFocused();

  /**
   *  Effect hooks
   */
  useEffect(() => {
    getTripDetails();
    return () => {};
  }, [isFocused]);

  /**
   *  API calls
   *  @returns {Promise<void>}
   *  @private
   *  @description API calls for get trip details
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
        setTripDetails(res);
      }
    } catch (error: any) {
      showError(error);
    }
  };

  /**
   *  @description API calls for cancel trip
   *  @memberof MyTripDetailController
   *  @function cancelTripHandler
   */
  const cancelTripHandler = async () => {
    const req: TripCancelRequestType = {
      _id: trip._id,
    };
    try {
      const res = await cancelTrip(req);
      if (res?._id) {
        // setTripDetails(res); data missing
        getTripDetails();
      }
    } catch (error: any) {
      showError(error);
    }
  };

  /**
   *  @description Navigate to previous screen
   *  @memberof MyTripDetailController
   *  @function onBack
   */
  const onBack = () => {
    navigation.goBack();
  };

  /**
   *
   *  @param trailers
   *  @returns
   *  @memberof MyTripDetailController
   *  @function getTrailerTypes
   *  @description Get trailer types from trailer data static
   */
  const getTrailerTypes = (trailers: string[]) => {
    let strTrailers: string[] = [];
    trailerDataStatic.forEach(item => {
      if (trailers.includes(item.value)) {
        strTrailers.push(item.label);
      }
    });
    return strTrailers.length > 0 ? strTrailers.join(', ') : '';
  };

  /**
   *
   *  @param horses
   *  @returns
   *  @memberof MyTripDetailController
   *  @function getHorsesNames
   *  @description Get horse names from horses array
   */
  const getHorsesNames = (horses: Horse[]) => {
    let strHorses: string[] = [];
    horses.forEach(item => {
      strHorses.push(item.horseName);
    });
    return strHorses.length > 0 ? strHorses.join(', ') : '';
  };

  /**
   *  Refs
   *  @description Refs for modals
   *  @memberof MyTripDetailController
   *  @local
   *  @type {RefObject<RefAppModalProps>}
   *  @readonly
   */
  const modalDeleteRef: RefObject<RefAppModalProps> =
    useRef<RefAppModalProps>(null);

  const openModalDelete = () => {
    if (modalDeleteRef.current) {
      modalDeleteRef.current.open();
    }
  };

  const closeModalDelete = () => {
    if (modalDeleteRef.current) {
      modalDeleteRef.current.close();
    }
  };

  /**
   * Finds the first status history object in the trip detail that matches the specified status.
   *
   * @param {string} history - The status to search for within the status history.
   * @returns {statusHistoryDetails | null} - The status history object with the matching status, or null if not found.
   */
  const findInTripStatus = (history: string): StatusHistory | null => {
    const inTransitStatus = tripDetail?.statusHistory?.find(
      item => item.status === history,
    );
    return inTransitStatus || null;
  };

  /**
   * Function for  Navigate to ReviewScreen
   */
  const onPressAddReview = () => {
    navigation.navigate(AppScreens.ReviewScreen, {id: tripDetail?._id});
  };
  /**
   *  @description Navigate to TripStatusScreen
   *  @memberof MyTripDetailController
   *  @function onTripStatusPress
   *  @returns {void}
   *  @public
   *  @example
   *  onTripStatusPress();
   */
  const onTripStatusPress = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: AppScreens.TripStatusScreen,
        params: {
          trip: trip,
        },
      }),
    );
  };

  /**
   *  @description Show trip status
   *  @memberof MyTripDetailController
   *  @function showTripStatus
   *  @returns {boolean}
   *  @public
   *  @example
   *  showTripStatus();
   */
  const showTripStatus = (): boolean => {
    return (
      tripDetail.status !== TripStatusAll.UPCOMING &&
      tripDetail.status !== TripStatusAll.CONFIRM
    );
  };

  /**
   *  @returns {IMyTripDetailsController}
   *  @memberof MyTripDetailController
   *  @description Controller for MyTripDetail screen
   */
  return {
    isSuccess,
    tripDetail,
    modalDeleteRef,
    openModalDelete,
    closeModalDelete,
    cancelTripHandler,
    onBack,
    getTrailerTypes,
    getHorsesNames,
    findInTripStatus,
    onPressAddReview,
    onTripStatusPress,
    showTripStatus,
  };
};
export default useMyTripDetailController;
