import { ICategoryListReq } from 'services/api/category/type';
import { serviceAPI } from 'services/api/service';

import { duration } from 'utils/constants';

import useFetch from '..';
import { serviceKeys } from '../queryKeys';

/**
 * The `useUserList` function is a custom hook that fetches a list of users from an API using the
 * `useFetch` hook.
 * @returns The `useUserList` function is returning the result of the `useFetch` hook.
 */
export const useServiceList = (args: ICategoryListReq) => {
  return useFetch({
    queryKey: serviceKeys.serviceList(args),
    apiFunction: () => serviceAPI.getServiceListApi(args),
    queryOptions: { staleTime: duration.time_five_minit }
  });
};

export const useServiceView = (_id: string | undefined) => {
  return useFetch({
    queryKey: serviceKeys.serviceView(_id),
    apiFunction: () => serviceAPI.getServiceView(_id),
    queryOptions: { staleTime: duration.time_five_minit }
  });
};
