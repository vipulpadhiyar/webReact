import { ICategoryListReq } from 'services/api/category/type';
import { customerAPI } from 'services/api/customer';

import { duration } from 'utils/constants';

import useFetch from '..';
import { customerKeys } from '../queryKeys';

/**
 * The `useUserList` function is a custom hook that fetches a list of users from an API using the
 * `useFetch` hook.
 * @returns The `useUserList` function is returning the result of the `useFetch` hook.
 */
export const useCustomerList = (args: ICategoryListReq) => {
  return useFetch({
    queryKey: customerKeys.customerList(args),
    apiFunction: () => customerAPI.getCustomerList(args),
    queryOptions: { staleTime: duration.time_five_minit }
  });
};
export const useCustomerView = (_id: string | undefined) => {
  return useFetch({
    queryKey: customerKeys.customerView(_id),
    apiFunction: () => customerAPI.getCustomerView(_id),
    queryOptions: { staleTime: 0 }
  });
};
