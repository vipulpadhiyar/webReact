import {useEffect} from 'react';
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';

import {useFaqListApiAction} from '~/store';
import {log} from '~/utils';

export const useFaqController = () => {
  /* The code snippet you provided is a custom hook called `useUserProfileController` that is used to
handle the userProfile functionality in a TypeScript application. Here is a breakdown of what
each part of the code is doing: */
  const navigation = useNavigation<NavigationProp<ProfileStackParamList>>();
  const {
    data: listResponseData,
    error,
    hasNextPage,
    isRefetching,
    isFetching,
    isFetchingNextPage,
    refetch,
    fetchNextPage,
  } = useFaqListApiAction();

  /**
   * On end reached handler for the flatlist.
   */
  const onEndReachedHandler = () => {
    if (hasNextPage === true && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  };
  /**
   *Focused hook
   */
  const isFocused = useIsFocused();

  /**
   * Refetch the data when screen is focused
   */

  useEffect(() => {
    refetch();
  }, [isFocused]);
  /**
   * Handle the error.
   */
  useEffect(() => {
    log('error :-', error);
  }, [error]);
  /**
   * The `onBack` function is used to navigate back in a TypeScript application.
   */

  /**
   * List data.
   */
  const listData = listResponseData?.pages?.flatMap(page => page?.faq);
  const onBack = () => {
    navigation.goBack();
  };

  return {
    onBack,
    listData,
    isRefetching,
    isFetching,
    isFetchingNextPage,
    refetch,
    onEndReachedHandler,
  };
};
