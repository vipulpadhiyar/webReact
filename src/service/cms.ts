import {api} from '~/api';
import {AppEndPoints} from '~/constants';

/**
 * This function is used to call the cms api using axios
 *
 * @returns {Promise<CMSResponseType | undefined>} - Return promise with response of the api.
 */
export const cmsApi = async (): Promise<CMSResponseType | undefined> => {
  const response = await api.get<ApiResponseType<CMSResponseType>>(
    `${AppEndPoints.CMS}`,
  );
  return response?.data?.data;
};
