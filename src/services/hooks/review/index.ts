import { ICategoryListReq } from 'services/api/category/type';
import { reviewAPI } from 'services/api/review';

import { duration } from 'utils/constants';

import useFetch from '..';
import { reviewKeys } from '../queryKeys';

/**
 * The `useUserList` function is a custom hook that fetches a list of users from an API using the
 * `useFetch` hook.
 * @returns The `useUserList` function is returning the result of the `useFetch` hook.
 */
export const useReviewList = (args: ICategoryListReq) => {
  return useFetch({
    queryKey: reviewKeys.reviewList(args),
    apiFunction: () => reviewAPI.getReviewListApi(args),
    queryOptions: { staleTime: duration.time_five_minit }
  });
};
export const useReviewView = (_id: string | undefined) => {
  return useFetch({
    queryKey: reviewKeys.reviewView(_id),
    apiFunction: () => reviewAPI.getReviewView(_id),
    queryOptions: { staleTime: 0 }
  });
};
