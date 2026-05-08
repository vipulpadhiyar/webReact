import {useEffect, useRef, useState} from 'react';
import {
  CommonActions,
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {debounce} from 'lodash';

import {AppScreens} from '~/constants';
import {useListTripApiAction} from '~/store/trip';
import {showError} from '~/utils';

import {TabOptions} from './components/TripStatusTab';

/**
 *  My Trips Controller
 *  @description Controller for My Trips Screen
 *  @returns IUseMyTripsController
 *  @example
 *  const {search, TabOptions, tripList, activeTabIndex, onRefresh, onSearchChange, onChangeActiveTab, onDetails} = useMyTripsController();
 *  @see useMyTripsController
 *  @see IUseMyTripsController
 */
interface IUseMyTripsController {
  search: string;
  tabOptions: TripTabOptions[];
  tripList: TripItem[];
  activeTabIndex: number;
  onRefresh: () => void;
  onSearchChange: (searchText: string) => void;
  onChangeActiveTab: (index: number) => void;
  onDetails: (index: number) => void;
}
export const useMyTripsController = (): IUseMyTripsController => {
  const navigation = useNavigation<NavigationProp<MyTripsStackParamList>>();

  /**
   *  State variables
   *  @type {TripItem[]} tripList - List of trips
   *  @type {number} activeTabIndex - Index of active tab
   *  @type {string} search - Search text
   */
  const [tripList, setTripList] = useState<TripItem[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const tabOptions = TabOptions;
  /**
   *  API actions
   *  @type {Function} getTrips - API action to get trips
   */
  const {mutateAsync: getTrips} = useListTripApiAction();

  /**
   *  Use Effects
   *  @description Fetch trips on component mount and when tab changes
   *  @returns {void}
   *  @example
   *  useEffect(() => {
   *    // Fetch trips
   *  }, []);
   *
   */
  useEffect(() => {
    getTripsWithStatus(tabOptions[activeTabIndex].value, search);
    searchDebounceFunction.current = debounce(onSearchChangeFn, 1000);
    return () => {};
  }, []);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getTripsWithStatus(tabOptions[activeTabIndex].value, search);
    }
  }, [isFocused]);
  /**
   *
   * @param status
   * @param searchStr
   *  @description Fetch trips with status and search string
   *  @returns {Promise<void>}
   *  @example
   *  getTripsWithStatus(TripStatusAll.ONGOING, '');
   */

  const getTripsWithStatus = async (status: string, searchStr: string) => {
    const params: TripListRequestType = {};
    if (status.length > 0) {
      params.status = status;
    }
    if (searchStr.length > 0) {
      params.search = searchStr;
    }
    try {
      const res = await getTrips(params);
      if (res?.tripList) {
        setTripList(res.tripList);
      }
    } catch (error: any) {
      showError(error);
    }
  };

  const onSearchChangeFn = (searchText: string) => {
    getTripsWithStatus(tabOptions[activeTabIndex].value, searchText);
  };

  const onSearchChange = (searchText: string) => {
    setSearch(searchText);
    searchDebounceFunction.current(searchText);
  };

  const searchDebounceFunction = useRef(debounce(onSearchChangeFn, 1000));

  useEffect(() => {
    // Update the debounced function whenever activeTabIndex changes
    searchDebounceFunction.current = debounce(onSearchChangeFn, 1000);
  }, [activeTabIndex]);

  const onChangeActiveTab = (index: number) => {
    setActiveTabIndex(index);
    getTripsWithStatus(tabOptions[index].value, search);
  };

  const onRefresh = () => {
    getTripsWithStatus(tabOptions[activeTabIndex].value, search);
  };

  /**
   *  @description Navigate to Trip Details Screen
   *  @param {number} index - Index of trip in list
   *  @returns {void}
   *  @example
   *  onDetails(0);
   *
   */
  const onDetails = (index: number) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: AppScreens.MyTripDetailScreen,
        params: {
          trip: tripList[index],
        },
      }),
    );
  };

  return {
    search,
    tabOptions,
    tripList,
    activeTabIndex,
    onRefresh,
    onSearchChange,
    onChangeActiveTab,
    onDetails,
  };
};
export default useMyTripsController;
