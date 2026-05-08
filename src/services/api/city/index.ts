import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import { ICategoryListReq } from '../category/type';
import { addCityRequestParams, cityListDT, cityListView } from './type';

export const cityAPI = {
  // Category List
  async getCityListApi(data: ICategoryListReq): Promise<cityListDT> {
    return apiInstance
      .post(ApiEndPoints.city.cityList, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },

  async deleteCity(_id: string | undefined): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.city.cityDelete, { _id })
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async activeInActiveCity(_id: string | undefined): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.city.cityActiveInActive, { _id })
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async getCityView(_id: string | undefined): Promise<cityListView> {
    return apiInstance
      .post(ApiEndPoints.city.cityView, { _id })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  async addCityDetails(data: addCityRequestParams): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.city.cityCreate, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async updateCityDetails(data: addCityRequestParams): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.city.cityUpdate, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  }
};
