import {api} from '~/api';
import {AppEndPoints} from '~/constants';

/* This function `createTripAPI` makes an API call to create a trip.
 * It takes a `CreateTripRequest` parameter and returns a Promise that resolves to the API response data.
 * If the response is successful, it returns the data from the API response.
 */
export const createTripAPI = async (
  param: CreateTripRequest,
): Promise<any | undefined> => {
  const response = await api.post<ApiResponseType<any>>(
    `${AppEndPoints.CREATE_TRIP}`,
    param,
  );
  return response?.data?.data;
};
/* This function `editTripAPI` makes an API call to create a trip.
 * It takes a `CreateTripRequest` parameter and returns a Promise that resolves to the API response data.
 * If the response is successful, it returns the data from the API response.
 */
export const editTripAPI = async (
  param: CreateTripRequest,
): Promise<ApiResponseType<any> | undefined> => {
  const response = await api.post<ApiResponseType<any>>(
    `${AppEndPoints.EditTrip}`,
    param,
  );
  return response?.data?.data;
};
/**
 *  @description API calls for trip list
 *  @function getTripListApi
 *  @param {TripListRequestType} param - The parameter for trip list API.
 *  @returns {Promise<TripListResponseType | undefined>} - The response from the API call.
 *
 */
export const getTripListApi = async (
  param: TripListRequestType,
): Promise<TripListResponseType | undefined> => {
  const response = await api.post<ApiResponseType<TripListResponseType>>(
    AppEndPoints.ListTrip,
    param,
  );
  return response?.data?.data;
};
/**
 *  @description API calls for trip details
 *  @function getTripDetailsApi
 *  @param {TripDetailRequestType} param - The parameter for trip details API.
 *  @returns {Promise<TripDetailResponseType | undefined>} - The response from the API call.
 *
 */
export const getTripDetailsApi = async (
  param: TripDetailRequestType,
): Promise<TripDetailResponseType | undefined> => {
  const response = await api.post<ApiResponseType<TripDetailResponseType>>(
    AppEndPoints.ViewTrip,
    param,
  );
  return response?.data?.data;
};
/**
 *  @description API calls for cancel trip
 *  @function cancelTripApi
 *  @param {TripCancelRequestType} param - The parameter for cancel trip API.
 *  @returns {Promise<TripDetailResponseType | undefined>} - The response from the API call.
 *
 */
export const cancelTripApi = async (
  param: TripCancelRequestType,
): Promise<TripDetailResponseType | undefined> => {
  const response = await api.post<ApiResponseType<TripDetailResponseType>>(
    AppEndPoints.CancelTrip,
    param,
  );
  return response?.data?.data;
};

/**
 * Sends a request to create feedback for a trip.
 *
 * @param {CreateFeedbackRequest} param - The payload containing feedback details including rating, review, and tripId.
 *
 * @returns {Promise<ApiResponseType<any> | undefined>} - A promise that resolves to the API response data of type `ApiResponseType<any>`, or `undefined` if the response data is not available.
 */
export const createFeedback = async (
  param: CreateFeedbackRequest,
): Promise<ApiResponseType<any> | undefined> => {
  const response = await api.post<ApiResponseType<any>>(
    AppEndPoints.TripReview,
    param,
  );
  return response?.data;
};
