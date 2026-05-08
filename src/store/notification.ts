import {
  useInfiniteQuery,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query';

import {MutationQueryKeys, QueryKeys} from '~/constants';
import {
  deleteNotificationRequest,
  getNotificationList,
  markAsReadNotificationApi,
  notificationDeleteAll,
  toggleNotificationState,
  unReadNotification,
} from '~/service';
import {getNextPageParamUtilForPagination} from '~/utils';

/**
 * The `useMarkAsReadApiAction` function is a TypeScript hook that handles marking notifications as
 * read and updating the notification list accordingly.
 */
export const useMarkAsReadApiAction = (
  options?: UseMutationOptions<
    MarkAsReadResponse | undefined,
    Error,
    MarkAsReadRequest,
    unknown
  >,
) =>
  useMutation({
    mutationKey: [MutationQueryKeys.fileUploadMutate],
    mutationFn: (param: MarkAsReadRequest) => markAsReadNotificationApi(param),
    networkMode: 'always',
    ...options,
  });

/**
 * Custom hook for fetching a paginated list of notifications.
 *
 * This hook uses the `useInfiniteQuery` function from React Query to fetch notifications
 * with pagination. It initializes the query with the first page and uses the provided
 * `getNotificationList` function to fetch data. It also handles pagination with the
 * `getNextPageParamUtilForPagination` function. The query is enabled based on the `enabled`
 * parameter and does not retry failed requests.
 *
 */
export const useNotificationListApi = (enabled: boolean) =>
  useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [QueryKeys.NotificationList],
    queryFn: getNotificationList,
    getNextPageParam: getNextPageParamUtilForPagination,
    enabled: enabled,
    retry: false,
  });

/**
 * Custom hook for handling the mutation to delete all notifications.
 *
 * This hook uses the `useMutation` function from React Query to perform a mutation
 * that deletes all notifications. It uses the `notificationDeleteAll` function to
 * send the delete request and is always executed when triggered. The mutation does not retry
 * on failure.
 *
 */
export const useNotificationDeleteAllApiAction = () =>
  useMutation({
    mutationKey: [MutationQueryKeys.deleteAllNotification],
    mutationFn: notificationDeleteAll,
    networkMode: 'always',
    retry: false,
  });

/**
 * Custom hook for handling the mutation to delete a specific notification.
 *
 * This hook uses the `useMutation` function from React Query to perform a mutation
 * that deletes a specific notification based on the provided parameters. It uses the
 * `deleteNotificationRequest` function to send the delete request. The mutation is always
 * executed when triggered and does not retry on failure.
 *
 */
export const useDeleteNotificationApiAction = () =>
  useMutation({
    mutationKey: [MutationQueryKeys.deleteNotification],
    mutationFn: (param: INotificationDeleteReq) =>
      deleteNotificationRequest(param),
    networkMode: 'always',
    retry: false,
  });

/**
 * Custom hook for handling the mutation to delete a specific notification.
 *
 * This hook uses the `useMutation` function from React Query to perform a mutation
 * that deletes a specific notification based on the provided parameters. It uses the
 * `useUnReadNotificationApiAction` function to send the notification count. The mutation is always
 * executed when triggered and does not retry on failure.
 *
 */
export const useUnReadNotificationApiAction = () =>
  useMutation({
    mutationKey: [MutationQueryKeys.unReadNotification],
    mutationFn: unReadNotification,
    networkMode: 'always',
    retry: false,
  });
/**
 *  Custom hook for handling the mutation to toggle the notification state.
 *
 * This hook uses the `useMutation` function from React Query to perform a mutation
 * that toggles the notification state based on the provided parameters. It uses the
 * `toggleNotificationState` function to send the toggle request. The mutation is always
 * executed when triggered and does not retry on failure.
 *
 */
export const useToggleNotification = () =>
  useMutation({
    mutationKey: [MutationQueryKeys.toggleNotification],
    mutationFn: (param: INotificationToggleRequest) =>
      toggleNotificationState(param),
    networkMode: 'always',
    retry: false,
  });
