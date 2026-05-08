import { ICategoryListReq } from 'services/api/category/type';
import { contactUsAPI } from 'services/api/contactUs';
import { requestPayloadGetFaq } from 'services/api/faq/type';

import { duration } from 'utils/constants';

import useFetch from '..';
import { contactUsKeys } from '../queryKeys';

/**
 * The `useUserList` function is a custom hook that fetches a list of users from an API using the
 * `useFetch` hook.
 * @returns The `useUserList` function is returning the result of the `useFetch` hook.
 */
export const useContactUsList = (args: ICategoryListReq) => {
  return useFetch({
    queryKey: contactUsKeys.contactUsList(args),
    apiFunction: () => contactUsAPI.getContactUsAPI(args),
    queryOptions: { staleTime: duration.time_five_minit }
  });
};
export const useContactUsView = (data: requestPayloadGetFaq) => {
  return useFetch({
    queryKey: contactUsKeys.contactUsView(data),
    apiFunction: () => contactUsAPI.getContactUsView(data),
    queryOptions: { staleTime: 0 }
  });
};
