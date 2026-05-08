import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import { createSeoForm, seoForm } from './type';

export const seoAPI = {
  async getSeoView(type: string | undefined): Promise<seoForm> {
    return apiInstance
      .post(ApiEndPoints.seo.seoHybridManagementView, { type })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  // Category List
  async updateSeo(data: createSeoForm): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.seo.seoHybridManagementUpdate, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  }
};
