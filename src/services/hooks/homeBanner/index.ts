import { homeBannerApi } from 'services/api/homeBanner';

import { duration } from 'utils/constants';

import useFetch from '..';
import { homeBannerKeys } from '../queryKeys';
import { IHomeBannerListArg } from './types';

/**
 * The `useUserList` function is a custom hook that fetches a list of users from an API using the
 * `useFetch` hook.
 * @returns The `useUserList` function is returning the result of the `useFetch` hook.
 */
export const useHomeBannerList = (args: IHomeBannerListArg) => {
  return useFetch({
    queryKey: homeBannerKeys.homeBannerList(args),
    apiFunction: () => homeBannerApi.getHomeBannerList(args),
    queryOptions: { staleTime: duration.time_five_minit }
  });
};
export const useHomeBannerView = (_id: string | undefined) => {
  return useFetch({
    queryKey: homeBannerKeys.homeBannerView(_id),
    apiFunction: () => homeBannerApi.getHomeBannerView(_id),
    queryOptions: { staleTime: duration.time_five_minit }
  });
};
