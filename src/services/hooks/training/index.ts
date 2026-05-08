import { ICategoryListReq } from 'services/api/category/type';
import { requestPayloadGetFaq } from 'services/api/faq/type';
import { trainingAPI } from 'services/api/training';

import { duration } from 'utils/constants';

import useFetch from '..';
import { trainingKeys } from '../queryKeys';

/**
 * The `useUserList` function is a custom hook that fetches a list of users from an API using the
 * `useFetch` hook.
 * @returns The `useUserList` function is returning the result of the `useFetch` hook.
 */
export const useTrainingList = (args: ICategoryListReq) => {
  return useFetch({
    queryKey: trainingKeys.trainingList(args),
    apiFunction: () => trainingAPI.getTrainingListApi(args),
    queryOptions: { staleTime: duration.time_five_minit }
  });
};
export const useTrainingView = (data: requestPayloadGetFaq) => {
  return useFetch({
    queryKey: trainingKeys.trainingView(data),
    apiFunction: () => trainingAPI.getTrainingView(data),
    queryOptions: { staleTime: 0 }
  });
};
