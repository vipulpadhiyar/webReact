import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import { ICategoryListReq } from '../category/type';
import { addSubServiceForm, listServiceDt, subServiceListDT, subServiceView } from './type';

export const subServiceAPI = {
  // Category List
  async getSubServiceListApi(data: ICategoryListReq): Promise<subServiceListDT> {
    return apiInstance
      .post(ApiEndPoints.subService.subServiceList, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  async listService(): Promise<listServiceDt> {
    return apiInstance
      .post(ApiEndPoints.subService.listService)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },

  async deleteSubService(_id: string | undefined): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.subService.subServiceDelete, { _id })
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async activeInActiveSubService(_id: string | undefined): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.subService.subServiceActiveInActive, { _id })
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async addSubServiceDetails(data: addSubServiceForm): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.subService.subServiceCreate, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async updateSubServiceDetails(data: addSubServiceForm): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.subService.subServiceUpdate, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async getSubServiceView(_id: string | undefined): Promise<subServiceView> {
    return apiInstance
      .post(ApiEndPoints.subService.subServiceView, { _id })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
};
