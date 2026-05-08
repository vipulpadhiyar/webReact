import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import { ICategoryListReq } from '../category/type';
import { addServiceForm, serviceListDT, serviceView } from './type';

export const serviceAPI = {
  // Category List
  async getServiceListApi(data: ICategoryListReq): Promise<serviceListDT> {
    return apiInstance
      .post(ApiEndPoints.service.serviceList, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },

  async deleteService(_id: string | undefined): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.service.serviceDelete, { _id })
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async activeInActiveService(_id: string | undefined): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.service.serviceActiveInActive, { _id })
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async addServiceDetails(data: addServiceForm): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.service.serviceCreate, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async updateServiceDetails(data: addServiceForm): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.service.serviceUpdate, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async getServiceView(_id: string | undefined): Promise<serviceView> {
    return apiInstance
      .post(ApiEndPoints.service.serviceView, { _id })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
};
