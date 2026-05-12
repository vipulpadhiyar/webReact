import { videoApi } from 'services/api/video';

import { duration } from 'utils/constants';

import useFetch from '..';
import { videoKeys } from '../queryKeys';
import { IVideoListArg } from './types';

/**
 * The `useUserList` function is a custom hook that fetches a list of users from an API using the
 * `useFetch` hook.
 * @returns The `useUserList` function is returning the result of the `useFetch` hook.
 */
export const useVideoList = (args: IVideoListArg) => {
  return useFetch({
    queryKey: videoKeys.videoList(args),
    apiFunction: () => videoApi.getVideoList(args),
    queryOptions: { staleTime: duration.time_five_minit }
  });
};
export const useVideoView = (_id: string | undefined) => {
  return useFetch({
    queryKey: videoKeys.videoView(_id),
    apiFunction: () => videoApi.getVideoView(_id),
    queryOptions: { staleTime: duration.time_five_minit }
  });
};
