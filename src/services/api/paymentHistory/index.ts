import { IApiSuccess } from 'utils/Types';
import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import { ICategoryListReq } from '../category/type';

export const paymentHistoryApi = {
  // Category List
  async getPaymentHistoryList(data: any): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.paymentHistory.paymentHistoryList, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },

  async getPaymentHistoryView(_id: string | undefined): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.paymentHistory.paymentHistoryView, { _id })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },

  async exportPaymentHistoryExcel(data: ICategoryListReq): Promise<IApiSuccess<{ URL: string }>> {
    return apiInstance
      .post(ApiEndPoints.paymentHistory.exportPaymentHistory, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  }
};
