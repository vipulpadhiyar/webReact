import { IApiSuccess } from 'utils/Types';
import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import { ICategoryListReq } from '../category/type';
import { VendorDutyRes, VendorLeadAnalyticsRes } from './type';

export const analyticsApi = {
  // Vendor Duty Analytics List
  async getVendorDutyAnalytics(data: ICategoryListReq): Promise<VendorDutyRes> {
    return apiInstance
      .post(ApiEndPoints.analytics.vendorDutyAnalytics, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },

  async getVendorLeadsAnalytics(data: ICategoryListReq): Promise<VendorLeadAnalyticsRes> {
    return apiInstance
      .post(ApiEndPoints.analytics.vendorLeadsAnalytics, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },

  async exportVendorDutyExcel(data: ICategoryListReq): Promise<IApiSuccess<{ URL: string }>> {
    return apiInstance
      .post(ApiEndPoints.analytics.exportVendorDuty, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  async exportVendorLeadsExcel(data: ICategoryListReq): Promise<IApiSuccess<{ URL: string }>> {
    return apiInstance
      .post(ApiEndPoints.analytics.exportVendorLeads, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  }
};
