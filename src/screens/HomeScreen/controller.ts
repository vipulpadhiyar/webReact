import {useEffect, useRef, useState} from 'react';
import {Keyboard, TextInput} from 'react-native';
import {
  CommonActions,
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {useFormik} from 'formik';
import {debounce} from 'lodash';

import {RefAppModalProps} from '~/components/AppModal';
import {AppScreens} from '~/constants';
import {CreateTrip} from '~/enums';
import Loader from '~/helpers/Loader';
import {translate as t} from '~/localization';
import {useUnReadNotificationApiAction} from '~/store';
import {
  useAddressDetailByPlaceIdApiAction,
  useAutoCompleteAddressListApiAction,
} from '~/store/locationQuery';
import {
  useCreateTripApiAction,
  useHorseListForTripApiAction,
} from '~/store/trip';
import {DateFormat, DateUtils, showError, showSuccess} from '~/utils';
import {generateAddressObj} from '~/utils/address';
import {trailerDataStatic} from '~/utils/data';
import {oneWayTripSchema, roundWayTripSchema} from '~/validation/createTrip';

/*
 * Custom hook for managing the state and logic of the home screen.
 * @returns {object} - The state and functions for the home screen.
 */

export const useHomeScreenController = () => {
  const {navigate} =
    useNavigation<NavigationProp<HorseProfileStackParamList>>();
  const {dispatch} = useNavigation<NavigationProp<BottomTabStackParamList>>();
  const navigation = useNavigation<NavigationProp<HomeScreenStackParamList>>();

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
  const [notificationCount, setNotificationCount] = useState<number>(0);
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

  const {mutateAsync: fetchHorseList} = useHorseListForTripApiAction();

  const {mutateAsync: getAddressDetail} = useAddressDetailByPlaceIdApiAction();
  const {mutateAsync: getUnReadNotification} = useUnReadNotificationApiAction();
  const {mutateAsync: createTrip} = useCreateTripApiAction();

  const setHorsePickerData = (details: HorseProfileTrip[]) => {
    const convertedObject =
      details &&
      details.map(obj => ({
        label: obj.name,
        isSelected: horseData?.find(h => h.value === obj?._id)?.isSelected
          ? true
          : false, // Check if obj._id is in selectedValues
        value: obj._id,
      }));

    setHorseData(convertedObject);
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    getNotificationCount();
  }, [isFocused]);

  /**
   * Constructs the payload object for the API request based on the current state values.
   * The payload includes dates and trip type, formatted according to DateFormat.MM_DD_YYYY.
   */
  const createPayload = (
    startCurrentPickupDate: string | undefined,
    startCurrentEndPickupDate: string | undefined,
    startCurrentEndDropUpDate: string | undefined,
    isOneWayTrip: boolean,
  ): HorseListTripRequestType => ({
    lastPickUpDate: startCurrentEndPickupDate
      ? DateUtils.convertDateToDaysJs(
          startCurrentEndPickupDate,
          DateFormat.MM_DD_YYYY,
        )
      : startCurrentPickupDate
      ? DateUtils.convertDateToDaysJs(
          startCurrentPickupDate,
          DateFormat.MM_DD_YYYY,
        )
      : undefined,
    pickUpDate: startCurrentPickupDate
      ? DateUtils.convertDateToDaysJs(
          startCurrentPickupDate,
          DateFormat.MM_DD_YYYY,
        )
      : undefined,
    returnDate: startCurrentEndPickupDate
      ? DateUtils.convertDateToDaysJs(
          startCurrentEndPickupDate,
          DateFormat.MM_DD_YYYY,
        )
      : undefined,
    lastReturnDate: startCurrentEndDropUpDate
      ? DateUtils.convertDateToDaysJs(
          startCurrentEndDropUpDate,
          DateFormat.MM_DD_YYYY,
        )
      : undefined,
    tripType: isOneWayTrip ? CreateTrip.ONE_WAY : CreateTrip.ROUND,
  });

  /**
   *Helper function to fetch horse list and update state
   */
  const fetchAndUpdateHorseData = async (payload: HorseListTripRequestType) => {
    try {
      const res = await fetchHorseList(payload);
      if (res?.horses) {
        setHorsePickerData(res.horses);
      }
    } catch (error) {
      // Handle errors here if necessary
    }
  };

  /*
   * useEffect hook with refactored code
   */
  useEffect(() => {
    const payload = createPayload(
      currentPickupDate,
      currentEndPickupDate,
      currentEndDropUpDate,
      isSelectedOneWayTrip,
    );

    fetchAndUpdateHorseData(payload);

    // Dependencies for useEffect: the effect runs whenever any of these values change
  }, [
    currentPickupDate, // Date when pickup starts
    currentEndPickupDate, // Date when pickup ends
    currentEndDropUpDate, // Date when drop-up ends
    isSelectedOneWayTrip, // Flag indicating if the trip is one-way
    isFocused, // Indicates if the component is currently focused
  ]);

  /**
   * get notification count
   */
  const getNotificationCount = () => {
    getUnReadNotification().then(res => {
      if (res?.unReadCount) {
        setNotificationCount(res?.unReadCount);
      } else {
        setNotificationCount(0);
      }
    });
  };

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
    if (modalRef.current) {
      modalRef.current.open({someData: 'example data'});
    }
  };

  /*
   * Close modal
   */
  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };
  /*
   * Open modal
   */
  const openModalReturnPickUp = (isPickUpDateBoolean: boolean) => {
    setPickUpDate(isPickUpDateBoolean);
    if (modalRefReturnPickUP.current) {
      modalRefReturnPickUP.current.open({someData: 'example data'});
    }
  };

  /*
   * Close modal
   */
  const closeModalReturnPickUp = () => {
    if (modalRefReturnPickUP.current) {
      modalRefReturnPickUP.current.close();
    }
  };

  /*
   * Handle search text change with debounce
   */
  const onSearchTextChange = (text: string) => {
    getPickupList(text);
  };

  const searchDebounceFunction = useRef(
    debounce(onSearchTextChange, 1000),
  ).current;

  /*
   * Handle drop-up search text change with debounce
   */
  const onSearchDropUpTextChange = (text: string) => {
    getDropUpList(text);
  };

  const searchDropUPDebounceFunction = useRef(
    debounce(onSearchDropUpTextChange, 100),
  ).current;

  /*
   * Handle search text change with debounce
   */
  const onSearchRoundTextChange = (text: string) => {
    getRoundPickupList(text);
  };

  const searchRoundDebounceFunction = useRef(
    debounce(onSearchRoundTextChange, 100),
  ).current;

  /*
   * Handle drop-up search text change with debounce
   */
  const onSearchRoundDropUpTextChange = (text: string) => {
    getRoundDropUpList(text);
  };

  const searchRoundDropUPDebounceFunction = useRef(
    debounce(onSearchRoundDropUpTextChange, 100),
  ).current;

  const assignAddressData = async (item: Prediction, formikValue: string) => {
    getAddressDetail(item?.place_id).then(async res => {
      let address;
      if (res) {
        address = await generateAddressObj(res, item.description);
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
  /*
   * Handle add function for navigating screen
   */
  const onPressDate = (
    startDate: string,
    endDate: string,
    isFixed: boolean,
  ) => {
    startDate = DateUtils.formateUtcDate(
      new Date(startDate),
      DateFormat.YYY_MM_DDTHH,
    );
    const convertToDaysJs = (date: string, formate?: DateFormat) => {
      return DateUtils.convertDateToDaysJs(
        date,
        formate ? formate : DateFormat.MM_DD_YYYY,
      );
    };

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
      setCurrentEndPickupDate('');
    } else {
      setCurrentEndPickupDate(endDate);
    }

    setCurrentReturnPickupDate('');
    setCurrentEndDropUpDate('');
    formik.setFieldValue('returnDate', '');
    formik.setFieldValue('lastReturnDate', '');

    formik.setFieldValue('lastPickUpDate', lastDate);
  };

  const onPressRoundDate = (
    startDate: string,
    endDate: string,
    isFixed: boolean,
  ) => {
    const convertToDaysJs = (date: string, formate?: DateFormat) => {
      return DateUtils.convertDateToDaysJs(
        date,
        formate ? formate : DateFormat.MM_DD_YYYY,
      );
    };

    const date = isFixed
      ? convertToDaysJs(startDate)
      : `${convertToDaysJs(startDate)} ${t('TO')} ${convertToDaysJs(endDate)}`;

    setCurrentReturnPickupDate(startDate);

    setFixedDropUpDate(isFixed);
    formik.setFieldValue('returnDate', date);

    if (isFixed) {
      setCurrentEndDropUpDate('');
    } else {
      setCurrentEndDropUpDate(endDate);
    }

    const lastDate =
      endDate !== 'Invalid Date' && endDate !== '' && endDate
        ? convertToDaysJs(endDate, DateFormat.MM_DD_YYYY)
        : convertToDaysJs(startDate, DateFormat.MM_DD_YYYY);

    formik.setFieldValue('lastReturnDate', lastDate);
  };
  /*
   * Handle form submission
   */
  const onSubmitHandler = (values: TripRequestParams) => {
    const payload: CreateTripRequest = {
      dropOff: values?.dropOff,
      lastPickUpDate: values?.lastPickUpDate,
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
      payload.lastReturnDate = values.lastReturnDate;
    }
    Loader.showLoader();
    createTrip(payload)
      .then(() => {
        formik.resetForm();
        setCurrentEndPickupDate('');
        setCurrentReturnPickupDate('');
        setCurrentEndDropUpDate('');
        setCurrentPickupDate('');
        setPickUpText('');
        setDropUpInputText('');
        setRoundDropUpInputText('');
        setDropUpInputText('');
        setTrailerData(trailerDataStatic);
        setDisplayValidation(false);
        showSuccess(t('TRIP_ADDED_SUCCESSFULLY'));
        dispatch(
          CommonActions.reset({
            index: 0, // Position of the MyTrips tab in the tab navigator
            routes: [
              {name: AppScreens.HomeScreen}, // Ensure Home tab is in the stack (or any other initial tab)
            ],
          }),
        );
        dispatch(
          CommonActions.navigate({
            name: AppScreens.MyTrips,
            params: {
              screen: AppScreens.MyTripsScreen,
            },
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
   * Function for navigation to notification screen
   */
  const onPressNotification = () => {
    navigation.navigate(AppScreens.NotificationScreen, {});
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
    notificationCount,
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
    onPressNotification,
  };
};
