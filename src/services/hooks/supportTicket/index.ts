import { ICategoryListReq } from 'services/api/category/type';
import { supportTicketAPI } from 'services/api/supportTicket';

import { duration } from 'utils/constants';

import useFetch from '..';
import { supportTicketKeys } from '../queryKeys';

/**
 * The `useUserList` function is a custom hook that fetches a list of users from an API using the
 * `useFetch` hook.
 * @returns The `useUserList` function is returning the result of the `useFetch` hook.
 */
export const useSupportTicketManagement = (args: ICategoryListReq) => {
  return useFetch({
    queryKey: supportTicketKeys.supportTicketList(args),
    apiFunction: () => supportTicketAPI.getSupportTicketList(args),
    queryOptions: { staleTime: duration.time_five_minit }
  });
};
