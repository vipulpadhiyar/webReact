import { ICategoryListReq } from 'services/api/category/type';
import { faqAPI } from 'services/api/faq';
import { requestPayloadGetFaq } from 'services/api/faq/type';

import { duration } from 'utils/constants';

import useFetch from '..';
import { faqKeys } from '../queryKeys';

/**
 * The `useUserList` function is a custom hook that fetches a list of users from an API using the
 * `useFetch` hook.
 * @returns The `useUserList` function is returning the result of the `useFetch` hook.
 */
export const useFaqList = (args: ICategoryListReq) => {
  return useFetch({
    queryKey: faqKeys.faqList(args),
    apiFunction: () => faqAPI.getFaqListApi(args),
    queryOptions: { staleTime: duration.time_five_minit }
  });
};
export const useFaqView = (data: requestPayloadGetFaq) => {
  return useFetch({
    queryKey: faqKeys.faqView(data),
    apiFunction: () => faqAPI.getFaqView(data),
    queryOptions: { staleTime: 0 }
  });
};
