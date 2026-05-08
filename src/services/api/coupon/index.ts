import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import { ICategoryListReq } from '../category/type';
import { addCouponForms, couponListDT, couponView, customerListDT } from './type';

export const couponAPI = {
  // Category List
  async getCouponListApi(data: ICategoryListReq): Promise<couponListDT> {
    return apiInstance
      .post(ApiEndPoints.coupon.couponList, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },

  async deleteCoupon(_id: string | undefined): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.coupon.couponDelete, { _id })
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async addCouponDetails(data: addCouponForms): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.coupon.couponCreate, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async updateCouponDetails(data: addCouponForms): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.coupon.couponUpdate, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async getCouponView(_id: string | undefined): Promise<couponView> {
    return apiInstance
      .post(ApiEndPoints.coupon.couponView, { _id })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  async getCustomerListApi(data: ICategoryListReq): Promise<customerListDT> {
    return apiInstance
      .post(ApiEndPoints.coupon.customerList, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
};
