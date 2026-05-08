import { bookingAPI } from 'services/api/booking';
import { ICategoryListReq } from 'services/api/category/type';

import { duration } from 'utils/constants';

import useFetch from '..';
import { bookingKeys } from '../queryKeys';

/**
 * The `useUserList` function is a custom hook that fetches a list of users from an API using the
 * `useFetch` hook.
 * @returns The `useUserList` function is returning the result of the `useFetch` hook.
 */
export const useBookingList = (args: ICategoryListReq) => {
  return useFetch({
    queryKey: bookingKeys.bookingList(args),
    apiFunction: () => bookingAPI.getBookingList(args),
    queryOptions: { staleTime: duration.time_five_minit }
  });
};
export const useBookingView = (_id: string | undefined) => {
  return useFetch({
    queryKey: bookingKeys.bookingView(_id),
    apiFunction: () => bookingAPI.getBookingView(_id),
    queryOptions: { staleTime: 0 }
  });
};

export const useBookingUpdate = (data: { _id: string; status: string }) => {
  return useFetch({
    queryKey: bookingKeys.bookingStatusUpdate(data),
    apiFunction: () => bookingAPI.bookingStatusUpdate(data),
    queryOptions: { staleTime: 0 }
  });
};
