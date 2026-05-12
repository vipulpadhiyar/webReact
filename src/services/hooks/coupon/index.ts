import { ICategoryListReq } from 'services/api/category/type';
import { couponAPI } from 'services/api/coupon';

import { duration } from 'utils/constants';

import useFetch from '..';
import { couponKey } from '../queryKeys';

/**
 * The `useUserList` function is a custom hook that fetches a list of users from an API using the
 * `useFetch` hook.
 * @returns The `useUserList` function is returning the result of the `useFetch` hook.
 */
export const useCouponList = (args: ICategoryListReq) => {
  return useFetch({
    queryKey: couponKey.couponList(args),
    apiFunction: () => couponAPI.getCouponListApi(args),
    queryOptions: { staleTime: duration.time_five_minit }
  });
};
export const useCouponView = (_id: string | undefined) => {
  return useFetch({
    queryKey: couponKey.couponView(_id),
    apiFunction: () => couponAPI.getCouponView(_id),
    queryOptions: { staleTime: 0 }
  });
};
