import { ICategoryListReq } from 'services/api/category/type';
import { vendorPaymentAPI } from 'services/api/vendorPayment';

import { duration } from 'utils/constants';

import useFetch from '..';
import { vendorPaymentKeys } from '../queryKeys';

/**
 * The `useUserList` function is a custom hook that fetches a list of users from an API using the
 * `useFetch` hook.
 * @returns The `useUserList` function is returning the result of the `useFetch` hook.
 */
export const useVendorPaymentList = (args: ICategoryListReq) => {
  return useFetch({
    queryKey: vendorPaymentKeys.vendorPaymentList(args),
    apiFunction: () => vendorPaymentAPI.getVendorPaymentList(args),
    queryOptions: { staleTime: duration.time_five_minit }
  });
};
export const useVendorPaymentView = (_id: string | undefined) => {
  return useFetch({
    queryKey: vendorPaymentKeys.vendorPaymentView(_id),
    apiFunction: () => vendorPaymentAPI.getVendorPaymentView(_id),
    queryOptions: { staleTime: 0 }
  });
};
