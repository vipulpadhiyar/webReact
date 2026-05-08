import {useEffect, useRef, useState} from 'react';
import {Keyboard, TextInput} from 'react-native';
import {
  CommonActions,
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useFormik} from 'formik';
import {debounce} from 'lodash';

import {RefAppModalProps} from '~/components/AppModal';
import {AppScreens} from '~/constants';
import {CreateTrip} from '~/enums';
import Loader from '~/helpers/Loader';
import {translate as t, translate} from '~/localization';
import {
  useAddressDetailByPlaceIdApiAction,
  useAutoCompleteAddressListApiAction,
} from '~/store/locationQuery';
import {
  useEditTripApiAction,
  useHorseListForTripApiAction,
  useTripDetailApiAction,
} from '~/store/trip';
import {DateFormat, DateUtils, showError, showSuccess} from '~/utils';
import {generateAddressObj} from '~/utils/address';
import {trailerDataStatic} from '~/utils/data';
import {oneWayTripSchema, roundWayTripSchema} from '~/validation/createTrip';

/*
 * Custom hook for managing the state and logic of the home screen.
 * @returns {object} - The state and functions for the home screen.
 */

export const useEditTripDetailsController = () => {
  const {params} =
    useRoute<RouteProp<QuotesStackParamList, AppScreens.EditTripDetails>>();
  const {navigate, goBack} =
    useNavigation<NavigationProp<QuotesStackParamList>>();
  const {dispatch} = useNavigation<NavigationProp<BottomTabStackParamList>>();

  /*
   *State Hooks
   */
  const [currentPickupDate, setCurrentPickupDate] = useState<string>('');
  useState<string>('');
  const [currentEndPickupDate, setCurrentEndPickupDate] = useState<string>('');
  const [currentReturnPickupDate, setCurrentReturnPickupDate] =
    useState<string>('');
  useState<string>('');
  const [currentEndDropUpDate, setCurrentEndDropUpDate] = useState<string>('');
  const [isSelectedOneWayTrip, setSelectedOneWayTrip] = useState<boolean>(true);
  const [isTrailerTypeRequired, setTrailerTypeRequired] =
    useState<boolean>(true);
  const [isDisplayPickUpList, setDisplayPickUpList] = useState<boolean>(false);
  const [isDisplayDropUpList, setDisplayDropUpList] = useState<boolean>(false);
  const [isDisplayRoundPickUpList, setDisplayRoundPickUpList] =
    useState<boolean>(false);
  const [isDisplayRoundDropUpList, setDisplayRoundDropUpList] =
    useState<boolean>(false);
  const [horseData, setHorseData] = useState<DropdownPickerType[]>([]);
  const [trailerData, setTrailerData] =
    useState<DropdownPickerType[]>(trailerDataStatic);
  const modalRef = useRef<RefAppModalProps>(null);
  const modalRefReturnPickUP = useRef<RefAppModalProps>(null);
  const [isRoundTripSelected, setRoundTripSelected] = useState<boolean>(false);
  const [isDisplayValidation, setDisplayValidation] = useState<boolean>(false);
  const [isPickUpDate, setPickUpDate] = useState<boolean>(true);
  const [isFixedPickUP, setFixedPickUP] = useState<boolean>(true);
  const [isFixedDropUpDate, setFixedDropUpDate] = useState<boolean>(true);

  /*
   * Fetch autocomplete address list for pickup and drop-off locations
   */
  const {data: autoCompleteAddressList, mutateAsync: getPickupList} =
    useAutoCompleteAddressListApiAction();
  const {data: autoCompleteDropAddressList, mutateAsync: getDropUpList} =
    useAutoCompleteAddressListApiAction();
  const {data: autoCompleteRoundAddressList, mutateAsync: getRoundPickupList} =
    useAutoCompleteAddressListApiAction();
  const {
    data: autoCompleteRoundDropAddressList,
    mutateAsync: getRoundDropUpList,
  } = useAutoCompleteAddressListApiAction();
  /*
   * Fetch address details from place id
   */
  const {mutateAsync: getAddressDetail} = useAddressDetailByPlaceIdApiAction();
  const {mutateAsync: fetchHorseList} = useHorseListForTripApiAction();

  /**
   *  API hooks
   */
  const {mutateAsync: getTrips} = useTripDetailApiAction();
  const {mutateAsync: editTrip} = useEditTripApiAction();

  /*
   * Update horse date from api response
   */
  const setHorsePickerData = (details: HorseProfileTrip[]) => {
    const convertedObject =
      details &&
      details.map(obj => ({
        label: obj.name,
        isSelected: false,
        value: obj._id,
      }));
    setHorseData(convertedObject);
  };

  /**
   * Updates horse data based on trip details and user input.
   *
   * @param pickUpStart - The start date for pickup period.
   * @param pickUpEnd - The end date for pickup period.
   * @param returnStart - The start date for return period.
   * @param returnEnd - The end date for return period.
   * @param isOneWay - Indicates whether the trip is one-way or round-trip.
   * @param tripDetailHorse - Array of horses related to the trip details.
   * @param initial - Flag indicating if this is the initial data load.
   */
  const updatedHorseData = (
    pickUpStart: string,
    pickUpEnd: string,
    returnStart: string,
    returnEnd: string,
    isOneWay: boolean,
    tripDetailHorse: Horse[],
    initial: boolean,
  ) => {
    // Create a helper function to convert dates
    const convertDate = (date: string) =>
      date
        ? DateUtils.convertDateToDaysJs(date, DateFormat.MM_DD_YYYY)
        : undefined;

    // Build the payload
    const payload: HorseListTripRequestType = {
      lastPickUpDate: convertDate(pickUpEnd) || convertDate(pickUpStart),
      pickUpDate: convertDate(pickUpStart),
      returnDate: convertDate(returnStart),
      lastReturnDate: convertDate(returnEnd),
      tripType: isOneWay ? CreateTrip.ONE_WAY : CreateTrip.ROUND,
      tripId: params?.id,
    };

    // Fetch the horse list and update state
    fetchHorseList(payload).then(res => {
      if (res?.horses) {
        setHorsePickerData(res.horses);
        const duplicateHorseData =
          res &&
          res?.horses.map(obj => ({
            label: obj.name,
            isSelected: false,
            value: obj._id,
          }));
        if (initial) {
          handleHorseSelection(duplicateHorseData, tripDetailHorse);
        } else {
          setHorseData(duplicateHorseData);
        }
      }
    });
  };
  /*
   *Use effect that refetch horse list
   */
  useEffect(() => {
    getTripDetails();
  }, []);

  /*
   * Initialize formik for form handling
   */
  const formik = useFormik({
    initialValues: {
      horses: [''],
      name: '',
      tripType: '',
      pickUpDate: '',
      lastPickUpDate: '',
      pickUp: {
        address: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        lat: 0,
        lng: 0,
      },
      dropOff: {
        address: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        lat: 0,
        lng: 0,
      },
      returnDropOff: {
        address: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        lat: 0,
        lng: 0,
      },
      returnPickUp: {
        address: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        lat: 0,
        lng: 0,
      },
      returnDate: '',
      lastReturnDate: '',
      trailer: '',
      notes: '',
      horseList: [{horseName: ''}],
      trailerList: [{trailerName: ''}],
      fullAddress: '',
      fullDropOffAddress: '',
      fullAddressRound: '',
      fullDropOffAddressRound: '',
    },
    validationSchema: isSelectedOneWayTrip
      ? oneWayTripSchema
      : roundWayTripSchema,
    onSubmit: (values: TripRequestParams) => onSubmitHandler(values),
  });

  /*
   *Update selection from trip details
   */
  const updateSelection = (
    data: DropdownPickerType[],
    values: Horse[],
  ): DropdownPickerType[] => {
    const valueIds = values.map(item => item._id);
    return data.map(item => ({
      ...item,
      isSelected: valueIds.includes(item.value),
    }));
  };

  /**
   * Formats dates based on flexibility flag.
   * @param isFlexible - Flag indicating if dates are flexible or not.
   * @param startDate - Start date string to format.
   * @param endDate - End date string to format (only used if isFlexible is true).
   * @returns Formatted date string or date range string.
   */
  const setFlexibleDate = (
    isFlexible: boolean,
    startDate: string,
    endDate: string,
  ) => {
    if (isFlexible) {
      return `${convertToDaysJs(
        startDate?.toString(),
        DateFormat.MM_DD_YYYY,
      )} ${translate('TO')} ${convertToDaysJs(
        endDate?.toString(),
        DateFormat.MM_DD_YYYY,
      )}`;
    } else {
      return convertToDaysJs(startDate?.toString(), DateFormat.MM_DD_YYYY);
    }
  };

  /*
   * Function to update basic form fields with trip details
   */
  const handleBasicDetails = (tripDetails: TripDetailResponseType) => {
    formik.setFieldValue('name', tripDetails.name);
    formik.setFieldValue(
      'pickUpDate',
      setFlexibleDate(
        tripDetails.isFlexiblePickUpDate,
        tripDetails.pickUpDate?.toString(),
        tripDetails.lastPickUpDate?.toString(),
      ),
    );
    formik.setFieldValue('lastPickUpDate', tripDetails.lastPickUpDate);
    formik.setFieldValue('pickUp', tripDetails.pickUp);
    formik.setFieldValue('fullAddress', tripDetails.pickUp?.address);
    formik.setFieldValue('dropOff', tripDetails.dropOff);
    formik.setFieldValue('fullDropOffAddress', tripDetails.dropOff?.address);
    formik.setFieldValue('notes', tripDetails.notes);
  };

  /*
   * Function to handle round trip specific details
   */
  const handleRoundTripDetails = (tripDetails: TripDetailResponseType) => {
    setSelectedOneWayTrip(false);
    setCurrentReturnPickupDate(tripDetails.returnDate?.toString());
    setCurrentEndDropUpDate(tripDetails.lastReturnDate?.toString());
    formik.setFieldValue(
      'returnDate',
      setFlexibleDate(
        tripDetails.isFlexibleReturnDate ?? false,
        tripDetails.returnDate?.toString(),
        tripDetails.lastReturnDate?.toString(),
      ),
    );
    formik.setFieldValue('lastReturnDate', tripDetails?.lastReturnDate);
    formik.setFieldValue('returnPickUp', tripDetails.returnPickUp);
    formik.setFieldValue('returnDropOff', tripDetails.returnDropOff);
    formik.setFieldValue('fullAddressRound', tripDetails.returnPickUp?.address);
    formik.setFieldValue(
      'fullDropOffAddressRound',
      tripDetails.returnPickUp?.address,
    );

    if (
      tripDetails.pickUp?.address === tripDetails.returnDropOff?.address &&
      tripDetails.dropOff?.address === tripDetails.returnPickUp?.address
    ) {
      setRoundTripSelected(true);
    }
  };

  /*
   * Function to update trailer selection based on trip details
   */
  const handleTrailerSelection = (tripDetails: TripDetailResponseType) => {
    tripDetails.trailer.forEach(value => {
      const findTrailerIndex = trailerDataStatic.findIndex(
        item => item.value === value,
      );
      onPressTrailerIndex(findTrailerIndex);
    });
  };

  /*
   * Function to handle flexible date options
   */
  const handleFlexibleDates = (tripDetails: TripDetailResponseType) => {
    if (tripDetails.isFlexiblePickUpDate) {
      setFixedPickUP(false);
    }
    if (tripDetails.isFlexibleReturnDate) {
      setFixedDropUpDate(false);
    }
    setCurrentPickupDate(tripDetails.pickUpDate?.toString());
    setCurrentEndPickupDate(tripDetails.lastPickUpDate?.toString());
  };

  /*
   * Function to update horse selection based on trip details
   */
  const handleHorseSelection = (
    convertedObject: DropdownPickerType[],
    tripDetails: Horse[],
  ) => {
    const updatedData = updateSelection(convertedObject, tripDetails);
    setHorseData(updatedData);
  };

  /*
   *function for getting trip details
   */
  const getTripDetails = async () => {
    Loader.showLoader();
    const req: TripDetailRequestType = {
      _id: params.id,
    };
    try {
      const res = await getTrips(req);
      if (res?._id) {
        // handleHorseSelection(convertedObject, res); // Update horse selection
        handleFlexibleDates(res); // Handle flexible date options
        handleTrailerSelection(res); // Update trailer selection in UI
        handleBasicDetails(res); // Update basic form fields
        updatedHorseData(
          res?.pickUpDate?.toString() ?? '',
          res?.lastPickUpDate?.toString() ?? '',
          res?.returnDate?.toString() ?? '',
          res?.lastReturnDate?.toString() ?? '',
          res.tripType === CreateTrip.ROUND ? false : true,
          res?.horses,
          true,
        );
        if (res.tripType === CreateTrip.ROUND) {
          handleRoundTripDetails(res); // Handle round trip specific details
        }
      }
      Loader.hideLoader();
    } catch (error: any) {
      Loader.hideLoader();
      showError(error);
    }
  };
  /*
   * Refs for text inputs
   */
  const nameInputRef = useRef<TextInput>();
  const pickupAddressRef = useRef<TextInput>();
  const additionalInputRef = useRef<TextInput>();
  const pickupRoundAddressRef = useRef<TextInput>();
  const dropRoundAddressRef = useRef<TextInput>();

  /*
   * Toggle selection state for horse data
   */
  const onPressIndex = (indexSelected: number) => {
    setHorseData(prevHorseData =>
      prevHorseData.map((item, index) =>
        index === indexSelected
          ? {...item, isSelected: !item.isSelected}
          : item,
      ),
    );
  };

  /*
   * Toggle selection state for trailer data
   */
  const onPressTrailerIndex = (indexSelected: number) => {
    const itemDetails = trailerData[indexSelected];
    if (itemDetails.value === 'no_preference') {
      setTrailerData(prevTrailerData =>
        prevTrailerData.map(
          item =>
            item.value === 'no_preference'
              ? {...item, isSelected: !item.isSelected} // Set 'no_preference' to true
              : {...item, isSelected: false}, // Set all other items to false
        ),
      );
    } else {
      setTrailerData(prevTrailerData =>
        prevTrailerData.map((item, index) =>
          index === indexSelected
            ? {...item, isSelected: !item.isSelected}
            : item.value === 'no_preference'
            ? {...item, isSelected: false}
            : item,
        ),
      );
    }
  };

  /*
   * Open modal
   */
  const openModal = (isPickUpDateBoolean: boolean) => {
    setPickUpDate(isPickUpDateBoolean);
    Keyboard.dismiss();
    modalRef?.current?.open({someData: 'example data'});
  };

  /*
   * Close modal
   */
  const closeModal = () => {
    modalRef?.current?.close();
  };
  /*
   * Open modal
   */
  const openModalReturnPickUp = (isPickUpDateBoolean: boolean) => {
    setPickUpDate(isPickUpDateBoolean);
    modalRefReturnPickUP?.current?.open();
  };

  /*
   * Close modal
   */
  const closeModalReturnPickUp = () => {
    modalRefReturnPickUP?.current?.close();
  };

  /*
   * Handle search text change with debounce
   */
  const onSearchTextChange = (text: string) => {
    getPickupList(text);
  };

  /*
   * debounce function for text input
   */
  const searchDebounceFunction = useRef(
    debounce(onSearchTextChange, 1000),
  ).current;

  /*
   * Handle drop-up search text change with debounce
   */
  const onSearchDropUpTextChange = (text: string) => {
    getDropUpList(text);
  };

  /*
   * debounce function for text input
   */
  const searchDropUPDebounceFunction = useRef(
    debounce(onSearchDropUpTextChange, 100),
  ).current;

  /*
   * Handle search text change with debounce
   */
  const onSearchRoundTextChange = (text: string) => {
    getRoundPickupList(text);
  };

  /*
   * debounce function for text input
   */
  const searchRoundDebounceFunction = useRef(
    debounce(onSearchRoundTextChange, 100),
  ).current;

  /*
   * Handle drop-up search text change with debounce
   */
  const onSearchRoundDropUpTextChange = (text: string) => {
    getRoundDropUpList(text);
  };

  /*
   * debounce function for text input
   */
  const searchRoundDropUPDebounceFunction = useRef(
    debounce(onSearchRoundDropUpTextChange, 100),
  ).current;

  /*
   * generate address details from place id
   */
  const assignAddressData = async (item: Prediction, formikValue: string) => {
    getAddressDetail(item?.place_id).then(async res => {
      if (res) {
        const address = await generateAddressObj(res, item.description);
        formik.setFieldValue(formikValue, address);
      }
    });
  };

  /*
   * Handle address selection
   */
  const onAddressPress = (item: Prediction) => {
    Keyboard.dismiss();
    formik.setFieldValue('fullAddress', item?.description);
    assignAddressData(item, 'pickUp');
  };
  /*
   * Handle address selection
   */
  const onDropAddressPress = (item: Prediction) => {
    Keyboard.dismiss();
    formik.setFieldValue('fullDropOffAddress', item?.description);
    assignAddressData(item, 'dropOff');
  };
  /*
   * Handle address selection
   */
  const onRoundPickUpAddressPress = (item: Prediction) => {
    Keyboard.dismiss();
    formik.setFieldValue('fullAddressRound', item?.description);
    assignAddressData(item, 'returnPickUp');
  };
  /*
   * Handle address selection
   */
  const onRoundDropUpAddressPress = (item: Prediction) => {
    Keyboard.dismiss();
    formik.setFieldValue('fullDropOffAddressRound', item?.description);
    assignAddressData(item, 'returnDropOff');
  };
  /*
   * Handle add function for navigating screen
   */
  const onPressAdd = () => {
    navigate(AppScreens.AddHorseProfileScreen, {});
  };

  const convertToDaysJs = (date: string, formate?: DateFormat) => {
    return DateUtils.convertDateToDaysJs(
      date,
      formate ? formate : DateFormat.MM_DD_YYYY,
    );
  };
  /*
   * Handle add function for navigating screen
   */
  const onPressDate = (
    startDate: string,
    endDate: string,
    isFixed: boolean,
  ) => {
    const date = isFixed
      ? convertToDaysJs(startDate)
      : `${convertToDaysJs(startDate)} ${t('TO')} ${convertToDaysJs(endDate)}`;

    setFixedPickUP(isFixed);
    setCurrentPickupDate(startDate);
    formik.setFieldValue('pickUpDate', date);

    const lastDate =
      endDate !== 'Invalid Date' && endDate !== '' && endDate
        ? convertToDaysJs(endDate, DateFormat.MM_DD_YYYY)
        : convertToDaysJs(startDate, DateFormat.MM_DD_YYYY);

    if (isFixed) {
      setCurrentEndPickupDate(startDate);
    } else {
      setCurrentEndPickupDate(endDate);
    }
    setCurrentReturnPickupDate('');
    setCurrentEndDropUpDate('');
    formik.setFieldValue('returnDate', '');
    formik.setFieldValue('lastReturnDate', '');

    formik.setFieldValue('lastPickUpDate', lastDate);

    /**
     *  Transform the array
     */
    const transformedArray = horseData
      .filter(item => item.isSelected) // Step 1: Filter where isSelected is true
      .map(item => ({
        horseName: item.label, // Step 2: Map to new shape
        _id: item.value,
      }));
    updatedHorseData(
      startDate,
      endDate,
      currentEndPickupDate,
      currentEndPickupDate,
      true,
      transformedArray,
      true,
    );
  };

  /**
   * Handles the onPress event for setting the round trip date.
   *
   * @param {string} startDate - The start date of the trip.
   * @param {string} endDate - The end date of the trip.
   * @param {boolean} isFixed - Determines if the date range is fixed or not.
   */
  const onPressRoundDate = (
    startDate: string,
    endDate: string,
    isFixed: boolean,
  ) => {
    const date = isFixed
      ? convertToDaysJs(startDate)
      : `${convertToDaysJs(startDate)} ${t('TO')} ${convertToDaysJs(endDate)}`;

    setCurrentReturnPickupDate(startDate);

    setFixedDropUpDate(isFixed);
    formik.setFieldValue('returnDate', date);

    if (isFixed) {
      setCurrentEndDropUpDate(endDate);
    } else {
      setCurrentEndDropUpDate(endDate);
    }

    const lastDate =
      endDate !== 'Invalid Date' && endDate !== '' && endDate
        ? convertToDaysJs(endDate, DateFormat.MM_DD_YYYY)
        : convertToDaysJs(startDate, DateFormat.MM_DD_YYYY);

    formik.setFieldValue('lastReturnDate', lastDate);

    /**
     *  Transform the array
     */
    const transformedArray = horseData
      .filter(item => item.isSelected) // Step 1: Filter where isSelected is true
      .map(item => ({
        horseName: item.label, // Step 2: Map to new shape
        _id: item.value,
      }));
    updatedHorseData(
      currentPickupDate,
      currentEndPickupDate,
      startDate,
      endDate,
      true,
      transformedArray,
      true,
    );
  };
  /*
   * Handle form submission
   */
  const onSubmitHandler = (values: TripRequestParams) => {
    const payload: CreateTripRequest = {
      tripId: params?.id,
      dropOff: values?.dropOff,
      lastPickUpDate: currentEndPickupDate
        ? DateUtils.convertDateToDaysJs(
            currentEndPickupDate,
            DateFormat.MM_DD_YYYY,
          )
        : DateUtils.convertDateToDaysJs(
            currentPickupDate,
            DateFormat.MM_DD_YYYY,
          ),
      name: values?.name,
      notes: values?.notes,
      pickUpDate: DateUtils.convertDateToDaysJs(
        currentPickupDate,
        DateFormat.MM_DD_YYYY,
      ),
      pickUp: values?.pickUp,
      tripType: isSelectedOneWayTrip ? CreateTrip.ONE_WAY : CreateTrip.ROUND,
      horses:
        horseData
          .filter(item => item.isSelected) // Filter for items where isSelected is true
          .map(item => item?.value) ?? values?.horses,
      trailer: trailerData
        .filter(item => item.isSelected) // Filter for items where isSelected is true
        .map(item => item.value),
      isFlexiblePickUpDate: !isFixedPickUP,
    };
    if (!isSelectedOneWayTrip) {
      payload.isFlexibleReturnDate = !isFixedDropUpDate;
    }
    if (
      values?.returnDropOff?.country &&
      values?.returnDropOff?.country !== ''
    ) {
      payload.returnDropOff = values.returnDropOff;
    }
    if (values?.returnPickUp?.country && values?.returnPickUp?.country !== '') {
      payload.returnPickUp = values.returnPickUp;
    }
    if (values?.returnDate && values?.returnDate !== '') {
      payload.returnDate = DateUtils.convertDateToDaysJs(
        currentReturnPickupDate,
        DateFormat.MM_DD_YYYY,
      );
    }
    if (values?.lastReturnDate && values?.lastReturnDate !== '') {
      payload.lastReturnDate = currentEndDropUpDate
        ? DateUtils.convertDateToDaysJs(
            currentEndDropUpDate,
            DateFormat.MM_DD_YYYY,
          )
        : DateUtils.convertDateToDaysJs(
            currentEndPickupDate,
            DateFormat.MM_DD_YYYY,
          );
    }
    Loader.showLoader();
    editTrip(payload)
      .then(() => {
        showSuccess(translate('trip_edited_successfully'));
        dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: AppScreens.AppTab, // The name of your tab navigator
                state: {
                  routes: [{name: AppScreens.MyTrips}],
                },
              },
            ],
          }),
        );
      })
      .catch(err => {
        showError(err);
      })
      .finally(() => {
        Loader.hideLoader();
      });
  };
  /*
   * Set round address is select round trip
   */
  const setRoundAddress = (value: boolean) => {
    const addressPayload: Address = {
      address: '',
      city: '',
      country: '',
      lat: 0,
      lng: 0,
      pincode: '',
      state: '',
    };
    if (
      formik?.values?.pickUpDate &&
      formik.values.fullAddress &&
      formik.values.fullDropOffAddress
    ) {
      setRoundTripSelected(value);
      if (value) {
        if (formik.values.pickUp) {
          formik.setFieldValue('returnDropOff', formik.values.pickUp);
          formik.setFieldValue(
            'fullDropOffAddressRound',
            formik.values.fullAddress,
          );
        }
        if (formik.values.dropOff) {
          formik.setFieldValue('returnPickUp', formik.values.dropOff);
          formik.setFieldValue(
            'fullAddressRound',
            formik.values.fullDropOffAddress,
          );
        }
      } else {
        formik.setFieldValue('returnDropOff', addressPayload);
        formik.setFieldValue('returnPickUp', addressPayload);
        formik.setFieldValue('fullDropOffAddressRound', '');
        formik.setFieldValue('fullAddressRound', '');
      }
    } else {
      showError(t('PleaseEnterStartPickupDatePickUpAddress'));
    }
  };

  /*
   * Refs for text inputs
   */
  const setPickUpText = (text: string) => {
    formik.setFieldValue('fullAddress', text);
    searchDebounceFunction(text);
  };

  /*
   * Refs for text inputs
   */
  const setDropUpInputText = (text: string) => {
    formik.setFieldValue('fullDropOffAddress', text);
    searchDropUPDebounceFunction(text);
  };

  /*
   * Refs for text inputs
   */
  const setRoundPickUpText = (text: string) => {
    formik.setFieldValue('fullAddressRound', text);
    searchRoundDebounceFunction(text);
  };

  /*
   * Refs for text inputs
   */
  const setRoundDropUpInputText = (text: string) => {
    formik.setFieldValue('fullDropOffAddressRound', text);
    searchRoundDropUPDebounceFunction(text);
  };
  /*
   * Navigate to go back
   */
  const onPressBack = () => {
    goBack();
  };

  return {
    formik,
    isSelectedOneWayTrip,
    nameInputRef,
    horseData,
    trailerData,
    additionalInputRef,
    modalRef,
    autoCompleteAddressList,
    searchDebounceFunction,
    pickupAddressRef,
    isDisplayPickUpList,
    isDisplayDropUpList,
    autoCompleteDropAddressList,
    isTrailerTypeRequired,
    isDisplayRoundPickUpList,
    isDisplayRoundDropUpList,
    pickupRoundAddressRef,
    dropRoundAddressRef,
    autoCompleteRoundAddressList,
    autoCompleteRoundDropAddressList,
    isRoundTripSelected,
    isDisplayValidation,
    isPickUpDate,
    currentPickupDate,
    currentEndPickupDate,
    currentEndDropUpDate,
    currentReturnPickupDate,
    modalRefReturnPickUP,
    isFixedDropUpDate,
    isFixedPickUP,
    setSelectedOneWayTrip,
    onPressIndex,
    onPressTrailerIndex,
    onSubmitHandler,
    openModal,
    closeModal,
    onAddressPress,
    setDisplayPickUpList,
    setDisplayDropUpList,
    onSearchDropUpTextChange,
    onPressAdd,
    setTrailerTypeRequired,
    setDisplayRoundDropUpList,
    setDisplayRoundPickUpList,
    onPressDate,
    onSearchTextChange,
    setDisplayValidation,
    onDropAddressPress,
    onRoundDropUpAddressPress,
    onRoundPickUpAddressPress,
    setRoundAddress,
    setPickUpText,
    setDropUpInputText,
    setRoundPickUpText,
    setRoundDropUpInputText,
    openModalReturnPickUp,
    closeModalReturnPickUp,
    onPressRoundDate,
    onPressBack,
  };
};
