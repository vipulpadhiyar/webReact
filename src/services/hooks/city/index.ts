import { ICategoryListReq } from 'services/api/category/type';
import { cityAPI } from 'services/api/city';

import { duration } from 'utils/constants';

import useFetch from '..';
import { cityKeys } from '../queryKeys';

/**
 * The `useUserList` function is a custom hook that fetches a list of users from an API using the
 * `useFetch` hook.
 * @returns The `useUserList` function is returning the result of the `useFetch` hook.
 */
export const useCityList = (args: ICategoryListReq) => {
  return useFetch({
    queryKey: cityKeys.cityList(args),
    apiFunction: () => cityAPI.getCityListApi(args),
    queryOptions: { staleTime: duration.time_five_minit }
  });
};
export const useCityView = (_id: string | undefined) => {
  return useFetch({
    queryKey: cityKeys.cityView(_id),
    apiFunction: () => cityAPI.getCityView(_id),
    queryOptions: { staleTime: 0 }
  });
};
