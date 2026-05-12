import { ICategoryListReq } from 'services/api/category/type';
import { cityCategoryAPI } from 'services/api/cityCategory';

import { duration } from 'utils/constants';

import useFetch from '..';
import { cityCategoryKeys } from '../queryKeys';

/**
 * The `useUserList` function is a custom hook that fetches a list of users from an API using the
 * `useFetch` hook.
 * @returns The `useUserList` function is returning the result of the `useFetch` hook.
 */
export const useCityCategoryList = (args: ICategoryListReq) => {
  return useFetch({
    queryKey: cityCategoryKeys.cityCategoryList(args),
    apiFunction: () => cityCategoryAPI.getCityCategory(args),
    queryOptions: { staleTime: duration.time_five_minit }
  });
};
export const useCityCategoryView = (_id: string | undefined) => {
  return useFetch({
    queryKey: cityCategoryKeys.cityCAtegoryView(_id),
    apiFunction: () => cityCategoryAPI.getCityCategoryView(_id),
    queryOptions: { staleTime: 0 }
  });
};
