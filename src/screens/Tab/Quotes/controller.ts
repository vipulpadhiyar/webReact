import {useEffect, useRef, useState} from 'react';
import {FlatList, Keyboard} from 'react-native';
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {debounce} from 'lodash';

import {RefAppModalProps} from '~/components/AppModal';
import {AppScreens} from '~/constants';
import {QuetosENUM} from '~/enums/quetos';
import Loader from '~/helpers/Loader';
import {
  useGetQuetosListApiAction,
  useGetQuetosListDeclineApiAction,
  useGetQuetosListReceivedApiAction,
  useReSubmitQuotationRequest,
} from '~/store/quetos';
import {showError} from '~/utils';
import {quetosStaticLabel} from '~/utils/quetos';

/* *
 * Custom hook that manages the state and actions related to quetos list
 * */
export const useQuetosController = () => {
  const {navigate} = useNavigation<NavigationProp<QuotesStackParamList>>();
  /* *
   * State for storing quetos status data and search text
   * */
  const [quetosStatusData, setQuetosStatusData] =
    useState<DropdownPickerType[]>(quetosStaticLabel);
  const [searchTextPending, setSearchTextPending] = useState<string>('');
  const [searchTextDecline, setSearchTextDecline] = useState<string>('');
  const [searchTextReceived, setSearchTextReceived] = useState<string>('');
  const [resubmitId, setResubmitId] = useState<string>('');
  const [currentStatus, setCurrentStatus] = useState<string>(
    QuetosENUM.PENDING_QUETOS,
  );
  const flatListRef = useRef<FlatList>(null);
  const resubmitModalRef = useRef<RefAppModalProps>(null);

  /**
   * Opens the accept modal and passes some data to it.
   */
  const openModalResubmit = () => {
    resubmitModalRef?.current?.open();
  };
  /**
   * Closes the accept modal
   */
  const closeModalResubmit = () => {
    resubmitModalRef?.current?.close();
  };

  const onResubmit = () => {
    resubmitModalRef?.current?.close();
    Loader.showLoader();
    reSubmitQuotation({_id: resubmitId})
      .then(() => {
        refetchDeclineQuetos();
        Loader.hideLoader();
      })
      .catch(err => {
        showError(err);
        Loader.hideLoader();
      })
      .finally(() => {
        Loader.hideLoader();
      });
  };
  /* *
   * Destructuring properties from the API action hook for quetos list
   * */
  const {
    data: quetosPendingListResponse,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isRefetching,
    refetch,
    fetchNextPage,
  } = useGetQuetosListApiAction(true, searchTextPending ?? '');
  /* *
   * Destructuring properties from the API action hook for quetos list
   * */
  const {
    data: quetosDeclineListResponse,
    hasNextPage: hasNextPageDecline,
    isFetching: isFetchingDecline,
    isFetchingNextPage: isFetchingNextPageDecline,
    isRefetching: isRefetchingDecline,
    refetch: refetchDeclineQuetos,
    fetchNextPage: fetchNextPageDecline,
  } = useGetQuetosListDeclineApiAction(true, searchTextDecline ?? '');
  /* *
   * Destructuring properties from the API action hook for quetos list
   * */
  const {
    data: quetosReceivedListResponse,
    hasNextPage: hasNextPageReceived,
    isFetching: isFetchingReceived,
    isFetchingNextPage: isFetchingNextPageReceived,
    isRefetching: isRefetchingReceived,
    refetch: refetchReceivedQuetos,
    fetchNextPage: fetchNextPageReceived,
  } = useGetQuetosListReceivedApiAction(true, searchTextReceived ?? '');

  /* *
   * Api call for re submit quotation details
   * */
  const {mutateAsync: reSubmitQuotation} = useReSubmitQuotationRequest();

  const isFocused = useIsFocused();

  /* *
   * Refetch the quetos list when the screen is focused
   * */
  useEffect(() => {
    if (isFocused) {
      refetch();
      refetchReceivedQuetos();
      refetchDeclineQuetos();
    }
  }, [isFocused]);

  /* *
   * Updates the status data when a status is pressed
   * */
  const onPressStatus = (item: DropdownPickerType, index: number) => {
    if (flatListRef.current && index >= 0) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: index,
      });
    }
    Keyboard.dismiss();
    setSearchTextDecline('');
    setSearchTextPending('');
    setSearchTextReceived('');
    if (item?.value === QuetosENUM.DECLINE_QUETOS) {
      refetchDeclineQuetos();
    } else if (item?.value === QuetosENUM.QUETOS_RECEIVED) {
      refetchReceivedQuetos();
    } else {
      refetch();
    }
    setCurrentStatus(item?.value);
    setQuetosStatusData(prevHorseData =>
      prevHorseData.map(obj =>
        item.label === obj.label
          ? {...obj, isSelected: true}
          : {...obj, isSelected: false},
      ),
    );
  };

  /* *
   * Updates the search text state
   * */
  const onSearchTextChange = (text: string) => {
    setSearchTextPending(text);
  };
  /* *
   * Updates the search text state
   * */
  const onSearchTextChangeReceived = (text: string) => {
    setSearchTextReceived(text);
  };
  /* *
   * Updates the search text state
   * */
  const onSearchTextChangeDecline = (text: string) => {
    setSearchTextDecline(text);
  };

  /* *
   * Debounced function for handling search text changes
   * */
  const searchDebounceFunction = useRef(
    debounce(onSearchTextChange, 1000),
  ).current;
  /* *
   * Debounced function for handling search text changes
   * */
  const searchDebounceFunctionReceived = useRef(
    debounce(onSearchTextChangeReceived, 1000),
  ).current;
  /* *
   * Debounced function for handling search text changes
   * */
  const searchDebounceFunctionDecline = useRef(
    debounce(onSearchTextChangeDecline, 1000),
  ).current;

  /**
   * The `onEndReachedHandler` function fetches the next page of data if there is a next page available
   * and no fetching operations are currently in progress.
   */
  const onEndReachedHandler = () => {
    if (hasNextPage === true && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  };
  /**
   * The `onEndReachedHandler` function fetches the next page of data if there is a next page available
   * and no fetching operations are currently in progress.
   */
  const onEndReachedHandlerDeclineQuetos = () => {
    if (
      hasNextPageDecline === true &&
      !isFetchingDecline &&
      !isFetchingNextPageDecline
    ) {
      fetchNextPageDecline();
    }
  };
  /**
   * The `onEndReachedHandler` function fetches the next page of data if there is a next page available
   * and no fetching operations are currently in progress.
   */
  const onEndReachedHandlerReceivedQuetos = () => {
    if (
      hasNextPageReceived === true &&
      !isFetchingReceived &&
      !isFetchingNextPageReceived
    ) {
      fetchNextPageReceived();
    }
  };

  /* *
   * Flattening the response pages to get the list of pending quetos
   * */
  const quetosPendingList = quetosPendingListResponse?.pages?.flatMap(
    page => page?.nonQuotationTrip,
  );
  const quetosReceivedList = quetosReceivedListResponse?.pages?.flatMap(
    page => page?.quotationTrip,
  );
  const quetosDeclineList = quetosDeclineListResponse?.pages?.flatMap(
    page => page?.haltTrips,
  );

  /**
   * The function onPressQuetosDetails navigates to the QuetosDetailsScreen with the id of the provided
   * item.
   * @param {IQuetosDetails} item - The `item` parameter in the `onPressQuetosDetails` function is of
   * type `IQuetosDetails`, which likely contains details or information related to a specific quote.
   */
  const onPressQuetosDetails = (item: IQuetosDetails) => {
    if (currentStatus === QuetosENUM.PENDING_QUETOS) {
      navigate(AppScreens.EditTripDetails, {id: item?._id});
    } else if (currentStatus === QuetosENUM.DECLINE_QUETOS) {
      if (item?._id) {
        setResubmitId(item?._id);
        openModalResubmit();
      }
    } else {
      navigate(AppScreens.QuetosDetailsScreen, {id: item?._id});
    }
  };

  /**
   * The function onPressModifyDetails navigates to the trip edit details with the id of the provided
   * item.
   * */
  const onPressModifyDetails = (item: IQuetosDetails) => {
    navigate(AppScreens.EditTripDetails, {id: item?._id});
  };

  return {
    quetosStatusData,
    searchDebounceFunction,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isRefetching,
    quetosPendingList,
    // Received quetos
    hasNextPageReceived,
    isFetchingReceived,
    isFetchingNextPageReceived,
    isRefetchingReceived,
    quetosReceivedList,
    //Decline quetos
    hasNextPageDecline,
    isFetchingDecline,
    isFetchingNextPageDecline,
    isRefetchingDecline,
    quetosDeclineList,
    searchTextPending,
    currentStatus,
    searchDebounceFunctionReceived,
    searchDebounceFunctionDecline,
    flatListRef,
    resubmitModalRef,
    closeModalResubmit,
    onResubmit,
    refetch,
    fetchNextPage,
    onPressStatus,
    onPressQuetosDetails,
    onEndReachedHandler,
    onEndReachedHandlerReceivedQuetos,
    fetchNextPageReceived,
    fetchNextPageDecline,
    onEndReachedHandlerDeclineQuetos,
    refetchDeclineQuetos,
    refetchReceivedQuetos,
    onPressModifyDetails,
  };
};
