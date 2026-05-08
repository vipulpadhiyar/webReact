import { ICategoryListReq } from 'services/api/category/type';
import { cityAreaAPI } from 'services/api/cityArea';

import { duration } from 'utils/constants';

import useFetch from '..';
import { cityAreaKeys } from '../queryKeys';

/**
 * The `useUserList` function is a custom hook that fetches a list of users from an API using the
 * `useFetch` hook.
 * @returns The `useUserList` function is returning the result of the `useFetch` hook.
 */
export const useCityAreaList = (args: ICategoryListReq) => {
  return useFetch({
    queryKey: cityAreaKeys.cityAreaList(args),
    apiFunction: () => cityAreaAPI.getCityArea(args),
    queryOptions: { staleTime: duration.time_five_minit }
  });
};
export const useCityAreaView = (_id: string | undefined) => {
  return useFetch({
    queryKey: cityAreaKeys.cityAreaView(_id),
    apiFunction: () => cityAreaAPI.getCityAreaView(_id),
    queryOptions: { staleTime: 0 }
  });
};
