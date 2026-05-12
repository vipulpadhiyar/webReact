import { subAdminApi } from 'services/api/subAdmin';

import { duration } from 'utils/constants';

import useFetch from '..';
import { subAdminKeys } from '../queryKeys';
import { ISubAdminListArg } from './types';

/**
 * The `useUserList` function is a custom hook that fetches a list of users from an API using the
 * `useFetch` hook.
 * @returns The `useUserList` function is returning the result of the `useFetch` hook.
 */
export const useSubAdminList = (args: ISubAdminListArg) => {
  return useFetch({
    queryKey: subAdminKeys.subAdminList(args),
    apiFunction: () => subAdminApi.getSubAdminListAPI(args),
    queryOptions: { staleTime: duration.time_five_minit }
  });
};
export const useSubAdminView = (_id: string | undefined) => {
  return useFetch({
    queryKey: subAdminKeys.subAdminView(_id),
    apiFunction: () => subAdminApi.getSubAdminView(_id),
    queryOptions: { staleTime: duration.time_five_minit }
  });
};
