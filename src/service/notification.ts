import {api} from '~/api';
import {AppConstants, AppEndPoints} from '~/constants';

/**
 * This function is used to call the notification read api using axios.
 * @param {MarkAsReadRequest} params - Request params for the notification read api
 *
 * @returns {Promise<MarkAsReadResponse | undefined>} - Return promise with response of the api.
 */
export const markAsReadNotificationApi = async (
  params: MarkAsReadRequest,
): Promise<MarkAsReadResponse | undefined> => {
  const response = await api.get<ApiResponseType<MarkAsReadResponse>>(
    `${AppEndPoints.NotificationRead}/${params?.notificationId}`,
  );
  return response?.data?.data;
};

/**
 * Fetches a paginated list of notifications from the server.
 *
 * This function constructs a request payload with the specified page number and
 * a predefined limit for the number of items per page. It sends a POST request to
 * the endpoint responsible for fetching the notification list.
 *
 * @param {Object} params - Parameters for the request.
 * @param {number} params.pageParam - The page number to fetch.
 * @returns {Promise<INotificationListResponse | undefined>} - The response data containing the notification list, or `undefined` if not available.
 */
export const getNotificationList = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<INotificationListResponse | undefined> => {
  const param: INotificationListRequest = {
    page: pageParam,
    limit: AppConstants.PAGE_LIST_SIZE,
  };
  const response = await api.post<ApiResponseType<INotificationListResponse>>(
    AppEndPoints.NotificationList,
    param,
  );
  return response?.data?.data;
};

/**
 * Sends a request to delete all notifications.
 *
 * This function sends a POST request to the endpoint responsible for deleting all notifications.
 * It does not require any additional parameters and returns the response from the server.
 *
 * @returns {Promise<ApiResponseType<any>>} - The response data indicating the result of the delete operation.
 */
export const notificationDeleteAll = async (): Promise<
  ApiResponseType<any>
> => {
  const response = await api.post<ApiResponseType<any>>(
    `${AppEndPoints.NotificationDeleteAll}`,
  );
  return response?.data;
};

/**
 * Sends a request to delete a specific notification.
 *
 * This function sends a POST request to the endpoint responsible for deleting a single notification.
 * It requires a parameter with the details of the notification to be deleted.
 *
 * @param {INotificationDeleteReq} param - The request payload containing the notification ID or other details needed for deletion.
 * @returns {Promise<ApiResponseType<any>>} - The response data indicating the result of the delete operation.
 */
export const deleteNotificationRequest = async (
  param: INotificationDeleteReq,
): Promise<ApiResponseType<any>> => {
  const response = await api.post<ApiResponseType<any>>(
    `${AppEndPoints.NotificationDelete}`,
    param,
  );
  return response?.data;
};
/**
 * Sends a request to notification count.
 *
 * This function sends a POST request to the endpoint responsible for deleting all notifications.
 * It does not require any additional parameters and returns the response from the server.
 *
 * @returns {Promise<INotificationUnReadResponse>} - The response data indicating the result of the delete operation.
 */
export const unReadNotification = async (): Promise<
  INotificationUnReadResponse | undefined
> => {
  const response = await api.post<ApiResponseType<INotificationUnReadResponse>>(
    `${AppEndPoints.NotificationUnRead}`,
  );
  return response?.data?.data;
};
/**
 * @returns {Promise<INotificationToggleResponse>} - The response data indicating the result of the toggle operation.
 */
export const toggleNotificationState = async (
  param: INotificationToggleRequest,
): Promise<INotificationToggleResponse | undefined> => {
  const response = await api.post<ApiResponseType<INotificationToggleResponse>>(
    `${AppEndPoints.NotificationOnOff}`,
    param,
  );
  return response?.data?.data;
};
