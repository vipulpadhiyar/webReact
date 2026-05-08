import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import { ICategoryListReq } from '../category/type';
import { customerListDT, customerView } from './type';

export const customerAPI = {
  // Category List
  async getCustomerList(data: ICategoryListReq): Promise<customerListDT> {
    return apiInstance
      .post(ApiEndPoints.customer.customerList, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },

  async getCustomerView(_id: string | undefined): Promise<customerView> {
    return apiInstance
      .post(ApiEndPoints.customer.customerView, { _id })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  async activeInActiveCityCategory(_id: string | undefined): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.customer.customerActiveInActive, { _id })
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async deleteCustomerAction(_id: string | undefined): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.customer.customerDelete, { _id })
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  }
};
