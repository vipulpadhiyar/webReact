import {useEffect} from 'react';
import {
  CommonActions,
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';

import {AppScreens} from '~/constants';
import {useHorseListApiAction} from '~/store';

export const useHorseProfileController = () => {
  const navigation =
    useNavigation<NavigationProp<HorseProfileStackParamList>>();

  const {
    data: horseListResponse,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isRefetching,
    refetch,
    fetchNextPage,
  } = useHorseListApiAction(false);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFetching || isRefetching) {
      // Loader.showLoader();
    } else {
      // Loader.hideLoader();
    }
  }, [isFetching, isRefetching]);

  const onEndReachedHandler = () => {
    if (hasNextPage === true && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  };
  const horseList = horseListResponse?.pages?.flatMap(page => page?.listHorse);
  const onAdd = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: AppScreens.AddHorseProfileScreen,
        params: {},
      }),
    );
  };

  const onDetails = (horse: HorseProfile) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: AppScreens.HorseProfileDetailsScreen,
        params: {horse},
      }),
    );
  };
  return {
    isFetching,
    isRefetching,
    horseList,
    refetch,
    onEndReachedHandler,
    onAdd,
    onDetails,
  };
};
