import { IApiSuccess } from 'utils/Types';
import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import { ICategoryListReq } from '../category/type';
import { IPayReqParam, vendorPaymentListDT, vendorPaymentViewDetails } from './type';

export const vendorPaymentAPI = {
  // Category List
  async getVendorPaymentList(data: ICategoryListReq): Promise<vendorPaymentListDT> {
    return apiInstance
      .post(ApiEndPoints.vendorPayment.vendorPaymentList, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },

  async getVendorPaymentView(_id: string | undefined): Promise<vendorPaymentViewDetails> {
    return apiInstance
      .post(ApiEndPoints.vendorPayment.vendorPaymentView, { _id })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  async payNowToRender(data: IPayReqParam): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.vendorPayment.vendorPaymentPay, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  async exportVendorPaymentExcel(data: ICategoryListReq): Promise<IApiSuccess<{ URL: string }>> {
    return apiInstance
      .post(ApiEndPoints.vendorPayment.exportVendorPayment, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  async makeOutStandingZero(data: { _id: string[] }): Promise<IApiSuccess<{ result: boolean }>> {
    return apiInstance
      .post(ApiEndPoints.vendorPayment.makeOutStandingZero, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  }
};
