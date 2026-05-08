import {useEffect} from 'react';

import {useListApiAction} from '~/store';
import {log} from '~/utils';

// Define the props type for the returned object
type MainController = {
  listData: (ListItemType | undefined)[] | undefined;
  onEndReachedHandler: () => void;
  isRefetching: boolean;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  refetch: () => void;
};

/**
 * Custom hook for managing navigation and other functionalities related to onboarding.
 * @returns {void} - Object containing functions for navigation and other functionalities.
 * @exports useMainController - Hook for managing onboarding functionalities.
 */
export const useMainController = (): MainController => {
  /* Navigation Hook */
  const {
    data: listResponseData,
    error,
    hasNextPage,
    isRefetching,
    isFetching,
    isFetchingNextPage,
    refetch,
    fetchNextPage,
  } = useListApiAction();
  /* SafeArea Hook */
  /* Redux Hook */
  /* Reference Hook */
  /* State Hook */
  /* Formik Hook */
  /* Custom Hook */
  /* UseEffect Hook */

  /**
   * On end reached handler for the flatlist.
   */
  const onEndReachedHandler = () => {
    if (hasNextPage === true && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  /**
   * Handle the error.
   */
  useEffect(() => {
    log('error :-', error);
  }, [error]);

  /**
   * List data.
   */
  const listData = listResponseData?.pages?.flatMap(page => page?.list);

  return {
    listData,
    isRefetching,
    isFetching,
    isFetchingNextPage,
    refetch,
    onEndReachedHandler,
  };
};
