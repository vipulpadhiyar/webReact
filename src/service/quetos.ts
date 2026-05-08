import {api} from '~/api';
import {AppConstants, AppEndPoints} from '~/constants';
/* *
 * Fetches the list of quetos from the API with pagination
 *
 * @param {object} params - The parameters for the API request
 * @param {number} params.pageParam - The current page number for pagination
 * @returns {Promise<QuetosListResponse | undefined>} - The response data from the API
 * */
export const getQuetosListApi = async ({
  pageParam,
  search,
}: {
  pageParam: number;
  search?: string;
}): Promise<QuetosListResponse | undefined> => {
  const param: IQuetosListRequest = {
    page: pageParam,
    limit: AppConstants.PAGE_LIST_SIZE,
    search, // Add search to the request parameters
  };
  const response = await api.post<ApiResponseType<QuetosListResponse>>(
    AppEndPoints.QuotationPending,
    param,
  );
  return response?.data?.data;
};
/* *
 * Fetches the list of quetos from the API with pagination
 *
 * @param {object} params - The parameters for the API request
 * @param {number} params.pageParam - The current page number for pagination
 * @returns {Promise<QuetosListResponse | undefined>} - The response data from the API
 * */
export const getQuetosDeclineListApi = async ({
  pageParam,
  search,
}: {
  pageParam: number;
  search?: string;
}): Promise<QuetosDeclineResponse | undefined> => {
  const param: IQuetosListRequest = {
    page: pageParam,
    limit: AppConstants.PAGE_LIST_SIZE,
    search,
  };
  const response = await api.post<ApiResponseType<QuetosDeclineResponse>>(
    AppEndPoints.QuotationDecline,
    param,
  );
  return response?.data?.data;
};
/* *
 * Fetches the list of quetos from the API with pagination
 *
 * @param {object} params - The parameters for the API request
 * @param {number} params.pageParam - The current page number for pagination
 * @returns {Promise<QuetosListResponse | undefined>} - The response data from the API
 * */
export const getQuetosReceivedListApi = async ({
  pageParam,
  search,
}: {
  pageParam: number;
  search?: string;
}): Promise<QuetosReceivedResponse | undefined> => {
  const param: IQuetosListRequest = {
    page: pageParam,
    limit: AppConstants.PAGE_LIST_SIZE,
    search,
  };
  const response = await api.post<ApiResponseType<QuetosReceivedResponse>>(
    AppEndPoints.QuotationReceived,
    param,
  );
  return response?.data?.data;
};

/**
 * The function `getQuetosDetailsApi` makes an asynchronous POST request to a specific endpoint with a
 * parameter and returns the data from the response.
 */
export const getQuetosDetailsApi = async (
  param: IQuetosDetailReq,
): Promise<TripDetailsResponse | undefined> => {
  const response = await api.post<ApiResponseType<TripDetailsResponse>>(
    `${AppEndPoints.QuotationDetails}`,
    param,
  );
  return response.data.data;
};

/**
 * The function `acceptQuotationRequest` sends a POST request to a specific endpoint with a parameter
 * and returns the response data.
 */
export const acceptQuotationRequest = async (
  param: IQuetosDetailReq,
): Promise<ApiResponseType<any> | undefined> => {
  const response = await api.post<ApiResponseType<any>>(
    `${AppEndPoints.QuotationAccept}`,
    param,
  );
  return response.data;
};
/**
 * The function `declineQuotationRequest` sends a POST request to reject a quotation request using the
 * provided parameters.
 * @param {IQuetosDetailReq} param - The `param` parameter in the `declineQuotationRequest` function is
 * of type `IQuetosDetailReq`, which likely contains details or information related to a quotation
 * request that needs to be declined. This parameter is used to send the necessary data to the API
 * endpoint for rejecting the quotation
 * @returns The function `declineQuotationRequest` is returning the data from the response of the API
 * post request.
 */
export const declineQuotationRequest = async (
  param: IQuetosDetailReq,
): Promise<ApiResponseType<any> | undefined> => {
  const response = await api.post<ApiResponseType<any>>(
    `${AppEndPoints.QuotationReject}`,
    param,
  );
  return response.data;
};
/**
 * This function sends a POST request to reject all quotation requests using the provided parameter.
 * @param {IQuetosDetailReq} param - The `param` parameter in the `declineAllQuotationRequest` function
 * is of type `IQuetosDetailReq`, which is likely an interface or type defining the structure of the
 * request data needed for rejecting all quotation requests. This parameter is used to send the
 * necessary information to the API
 * @returns The function `declineAllQuotationRequest` is returning the data from the response of the
 * API post request.
 */
export const declineAllQuotationRequest = async (
  param: IQuetosDetailReq,
): Promise<ApiResponseType<any> | undefined> => {
  const response = await api.post<ApiResponseType<any>>(
    `${AppEndPoints.QuotationRejectAll}`,
    param,
  );
  return response.data;
};
/**
 * This function sends a POST request to reject all quotation requests using the provided parameter.
 * @param {IQuetosDetailReq} param - The `param` parameter in the `reSubmitQuotationRequest` function
 * is of type `IQuetosDetailReq`, which is likely an interface or type defining the structure of the
 * request data needed for rejecting all quotation requests. This parameter is used to send the
 * necessary information to the API
 * @returns The function `reSubmitQuotationRequest` is returning the data from the response of the
 * API post request.
 */
export const reSubmitQuotationRequest = async (
  param: IQuetosDetailReq,
): Promise<ApiResponseType<any> | undefined> => {
  const response = await api.post<ApiResponseType<any>>(
    `${AppEndPoints.QuotationReSubmit}`,
    param,
  );
  return response.data;
};
