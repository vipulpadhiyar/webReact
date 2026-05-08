import {api} from '~/api';
import {AppConstants, AppEndPoints} from '~/constants';
import {Role} from '~/enums';

/**
 * This function is used to call the get list api using axios.
 *
 * @param {pageParam, type} param - Request params for the list api.
 * @returns
 */

export const getFaqListPaginationApi = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<FaqResponseType | undefined> => {
  const param: FaqRequestType = {
    role: Role.HO,
    page: pageParam,
    limit: AppConstants.PAGE_LIST_SIZE,
  };

  const response = await api.post<ApiResponseType<FaqResponseType>>(
    `${AppEndPoints.FaqList}`,
    param,
  );
  return response?.data.data;
};
