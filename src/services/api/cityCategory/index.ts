import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import { ICategoryListReq } from '../category/type';
import { addCityCategoryForm, cityCategoryView, cityListCategoryDT } from './type';

export const cityCategoryAPI = {
  // Category List
  async getCityCategory(data: ICategoryListReq): Promise<cityListCategoryDT> {
    return apiInstance
      .post(ApiEndPoints.cityCategory.cityCategoryList, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },

  async deleteCityCategory(_id: string | undefined): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.cityCategory.cityCategoryDelete, { _id })
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async activeInActiveCityCategory(_id: string | undefined): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.cityCategory.cityCategoryActiveInActive, { _id })
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async getCityCategoryView(_id: string | undefined): Promise<cityCategoryView> {
    return apiInstance
      .post(ApiEndPoints.cityCategory.cityCategoryView, { _id })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  async addCityCAtegory(data: addCityCategoryForm): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.cityCategory.cityCategoryCreate, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async updateCityCAtegory(data: addCityCategoryForm): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.cityCategory.cityCategoryUpdate, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  }
};
