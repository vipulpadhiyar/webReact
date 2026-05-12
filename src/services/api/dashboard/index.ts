import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import { IDashboardCountRes } from './type';

export const dashboardApi = {
  // Category List
  async getDashboardCount(): Promise<IDashboardCountRes> {
    return apiInstance
      .post(ApiEndPoints.dashboard.dashboard)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
};
