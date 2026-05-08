import { categoryAPI } from 'services/api/category';
import { ICategoryListReq } from 'services/api/category/type';

import { duration } from 'utils/constants';

import useFetch from '..';
import { categoryKeys } from '../queryKeys';

/**
 * The `useUserList` function is a custom hook that fetches a list of users from an API using the
 * `useFetch` hook.
 * @returns The `useUserList` function is returning the result of the `useFetch` hook.
 */
export const useCategoryList = (args: ICategoryListReq) => {
  return useFetch({
    queryKey: categoryKeys.categoryList(args),
    apiFunction: () => categoryAPI.getCategoryListAPI(args),
    queryOptions: { staleTime: duration.time_five_minit }
  });
};
export const useCategoryView = (_id: string | undefined) => {
  return useFetch({
    queryKey: categoryKeys.categoryView(_id),
    apiFunction: () => categoryAPI.getCategoryView(_id),
    queryOptions: { staleTime: 0 }
  });
};
