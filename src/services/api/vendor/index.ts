import { IApiSuccess } from 'utils/Types';
import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import { ICategoryListReq } from '../category/type';
import {
  addVendorForm,
  checkPhoneNumberReq,
  otpVerifyReqForm,
  sentAadhaarReqForm,
  vendorView,
  vendorlistDt
} from './type';

export const vendorAPI = {
  // Category List
  async getVendorListApi(data: ICategoryListReq): Promise<vendorlistDt> {
    return apiInstance
      .post(ApiEndPoints.vendor.vendorList, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  async addVenderDetails(data: addVendorForm): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.vendor.vendorCreate, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async updateVenderDetails(data: addVendorForm): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.vendor.vendorUpdate, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async checkPhoneNumber(data: checkPhoneNumberReq): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.vendor.checkPhoneNumber, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async sendOtpFromAadhaarNumber(data: sentAadhaarReqForm): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.vendor.sendOtpFromAadhaarNumber, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async aadhaarNumberOtpVerify(data: otpVerifyReqForm): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.vendor.aadhaarNumberOtpVerify, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async activeInActiveVendor(_id: string | undefined): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.vendor.vendorActiveInActive, { _id })
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async deleteVendorAction(_id: string | undefined): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.vendor.vendorDelete, { _id })
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async getVendorView(_id: string | undefined): Promise<vendorView> {
    return apiInstance
      .post(ApiEndPoints.vendor.vendorView, { _id })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  async exportVendorExcel(data: ICategoryListReq): Promise<IApiSuccess<{ URL: string }>> {
    return apiInstance
      .post(ApiEndPoints.vendor.exportVendor, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async googleVerifyCode(data: { verificationCode: string }): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.vendor.googleVerifyCode, { verificationCode: data?.verificationCode })
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  async restoreDeletedVendor(data: { _id: string }): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.vendor.restoreDeletedVendor, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  }
};
