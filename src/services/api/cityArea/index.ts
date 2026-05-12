import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import { ICategoryListReq } from '../category/type';
import { cityAreaList, cityAreaRequestParma, cityListAreaDT } from './type';

export const cityAreaAPI = {
  // Category List
  async getCityArea(data: ICategoryListReq): Promise<cityListAreaDT> {
    return apiInstance
      .post(ApiEndPoints.cityArea.cityAreaList, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },

  async deleteCityArea(_id: string | undefined): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.cityArea.cityAreaDelete, { _id })
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async activeInActiveCityArea(_id: string | undefined): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.cityArea.cityAreaActiveInActive, { _id })
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async getCityAreaView(_id: string | undefined): Promise<cityAreaList> {
    return apiInstance
      .post(ApiEndPoints.cityArea.cityAreaView, { _id })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  async addCityArea(data: cityAreaRequestParma): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.cityArea.cityAreaCreate, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async updateCityArea(data: cityAreaRequestParma): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.cityArea.cityAreaUpdate, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  }
};
