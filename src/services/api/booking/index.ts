import { IApiSuccess } from 'utils/Types';
import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import { ICategoryListReq } from '../category/type';
import { VendorListRes, bookingListDT, bookingView } from './type';

export const bookingAPI = {
  // Category List
  async getBookingList(data: ICategoryListReq): Promise<bookingListDT> {
    return apiInstance
      .post(ApiEndPoints.booking.bookingList, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },

  async getBookingView(_id: string | undefined): Promise<bookingView> {
    return apiInstance
      .post(ApiEndPoints.booking.bookingView, { _id })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  async bookingStatusUpdate(data: { _id: string; status: string }): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.booking.bookingUpdate, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  async findNearByVendors(data: { _id: string; isRandomVendor: boolean }): Promise<VendorListRes> {
    return apiInstance
      .post(ApiEndPoints.booking.findNearByVendors, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error;
      });
  },

  async sendBidToVendor(data: {
    _id: string;
    passVendor: string[] | [];
    isRandomVendor: boolean;
  }): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.booking.sendManualBid, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  async exportBookingExcel(data: ICategoryListReq): Promise<IApiSuccess<{ URL: string }>> {
    return apiInstance
      .post(ApiEndPoints.booking.exportBooking, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  }
};
