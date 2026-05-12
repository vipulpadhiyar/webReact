import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import { cmsForm, getCms } from './type';

export const cmsAPI = {
  // Category List
  async createCMSApi(data: cmsForm): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.cms.addCMS, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  async getCMSApi(data: getCms): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.cms.getCMS, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
};
