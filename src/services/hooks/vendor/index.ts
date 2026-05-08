import { ICategoryListReq } from 'services/api/category/type';
import { vendorAPI } from 'services/api/vendor';

import { duration } from 'utils/constants';

import useFetch from '..';
import { vendorKeys } from '../queryKeys';

/**
 * The `useUserList` function is a custom hook that fetches a list of users from an API using the
 * `useFetch` hook.
 * @returns The `useUserList` function is returning the result of the `useFetch` hook.
 */
export const useVendorList = (args: ICategoryListReq) => {
  return useFetch({
    queryKey: vendorKeys.vendorList(args),
    apiFunction: () => vendorAPI.getVendorListApi(args),
    queryOptions: { staleTime: duration.time_five_minit }
  });
};

export const useVendorView = (_id: string | undefined) => {
  return useFetch({
    queryKey: vendorKeys.vendorView(_id),
    apiFunction: () => vendorAPI.getVendorView(_id),
    queryOptions: { staleTime: 0 }
  });
};
