import {api} from '~/api';
import {AppConstants, AppEndPoints} from '~/constants';
import {log} from '~/utils';

export const getHorseListPaginationApi = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<HorseListResponseType | undefined> => {
  const param: HorseListRequestType = {
    page: pageParam,
    limit: AppConstants.PAGE_LIST_SIZE,
    search: '',
    sortOrder: '',
    sortBy: '',
  };
  const response = await api.post<ApiResponseType<HorseListResponseType>>(
    AppEndPoints.ListHorse,
    param,
  );
  return response?.data?.data;
};

export const addHorseApi = async (
  param: AddHorseRequest,
): Promise<AddHorseResponse | undefined> => {
  const response = await api.post<ApiResponseType<AddHorseResponse>>(
    `${AppEndPoints.AddHorse}`,
    param,
  );
  return response?.data?.data;
};

export const editHorseApi = async (
  param: EditHorseRequest,
): Promise<EditHorseResponse | undefined> => {
  const response = await api.post<ApiResponseType<EditHorseResponse>>(
    `${AppEndPoints.EditHorse}`,
    param,
  );
  return response?.data?.data;
};

export const deleteHorseApi = async (
  param: DeleteHorseRequest,
): Promise<DeleteHorseResponse | undefined> => {
  const response = await api.post<ApiResponseType<DeleteHorseResponse>>(
    `${AppEndPoints.DeleteHorse}`,
    param,
  );
  return response?.data?.data;
};

/**
 * Fetches a list of horses based on the provided trip parameters.
 *
 * @param param - The parameters for the horse list request. Contains:
 *   - lastPickUpDate: Optional date of the last pick-up.
 *   - pickUpDate: Date of the pick-up.
 *   - lastReturnDate: Optional date of the last return.
 *   - tripType: Type of trip (e.g., one-way, round-trip).
 *   - returnDate: Optional date of the return.
 *   - tripId: Optional trip ID.
 *
 * @returns A promise that resolves to the response containing the horse list, or undefined if the request fails.
 * @throws An error if the request fails or an issue occurs.
 */
export const getHorseListForTrip = async (
  param: HorseListTripRequestType,
): Promise<HorseListTripResponseType | undefined> => {
  try {
    const payload: HorseListTripRequestType = {
      lastPickUpDate: param.lastPickUpDate,
      pickUpDate: param.pickUpDate,
      lastReturnDate: param.lastReturnDate ?? undefined,
      tripType: param.tripType,
      returnDate: param.returnDate ?? undefined,
    };
    if (param?.tripId) {
      payload.tripId = param?.tripId;
    }

    const response = await api.post<ApiResponseType<HorseListTripResponseType>>(
      AppEndPoints.ListHorseTrip,
      payload,
    );

    return response.data?.data;
  } catch (error) {
    // Handle errors as needed
    log('Error fetching horse list:', error);
    throw error; // Rethrow or handle the error as needed
  }
};
