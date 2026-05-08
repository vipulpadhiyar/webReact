import { ICategoryListReq } from 'services/api/category/type';
import { subCategoryAPI } from 'services/api/subCategory';

import { duration } from 'utils/constants';

import useFetch from '..';
import { subCategoryKeys } from '../queryKeys';

/**
 * The `useUserList` function is a custom hook that fetches a list of users from an API using the
 * `useFetch` hook.
 * @returns The `useUserList` function is returning the result of the `useFetch` hook.
 */
export const useSubCategoryList = (args: ICategoryListReq) => {
  return useFetch({
    queryKey: subCategoryKeys.subCategoryList(args),
    apiFunction: () => subCategoryAPI.getSubCategoryListAPI(args),
    queryOptions: { staleTime: duration.time_five_minit }
  });
};
export const useSubCategoryView = (_id: string | undefined) => {
  return useFetch({
    queryKey: subCategoryKeys.subCategoryView(_id),
    apiFunction: () => subCategoryAPI.getSubCategoryView(_id),
    queryOptions: { staleTime: duration.time_five_minit }
  });
};
