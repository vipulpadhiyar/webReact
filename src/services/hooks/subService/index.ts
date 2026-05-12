import { ICategoryListReq } from 'services/api/category/type';
import { subServiceAPI } from 'services/api/subService';

import { duration } from 'utils/constants';

import useFetch from '..';
import { subServiceKeys } from '../queryKeys';

/**
 * The `useUserList` function is a custom hook that fetches a list of users from an API using the
 * `useFetch` hook.
 * @returns The `useUserList` function is returning the result of the `useFetch` hook.
 */
export const useSubServiceList = (args: ICategoryListReq) => {
  return useFetch({
    queryKey: subServiceKeys.subServiceList(args),
    apiFunction: () => subServiceAPI.getSubServiceListApi(args),
    queryOptions: { staleTime: duration.time_five_minit }
  });
};

export const useSubServiceView = (_id: string | undefined) => {
  return useFetch({
    queryKey: subServiceKeys.subServiceView(_id),
    apiFunction: () => subServiceAPI.getSubServiceView(_id),
    queryOptions: { staleTime: duration.time_five_minit }
  });
};
