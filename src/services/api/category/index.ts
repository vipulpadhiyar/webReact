import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import {
  ICategoryListReq,
  addCategoryRequestParams,
  categoryListDT,
  categoryView,
  updateCategoryRequestParams
} from './type';

export const categoryAPI = {
  // Category List
  async getCategoryListAPI(data: ICategoryListReq): Promise<categoryListDT> {
    return apiInstance
      .post(ApiEndPoints.category.categoryList, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },

  //Category Details

  async getCategoryView(_id: string | undefined): Promise<categoryView> {
    return apiInstance
      .post(ApiEndPoints.category.categoryView, { _id })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  async addCategoryDetails(data: addCategoryRequestParams): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.category.categoryCreate, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  async updateCategoryDetails(data: updateCategoryRequestParams): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.category.categoryUpdate, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  async uploadImg(data: any): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.category.categoryImageUpload, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },

  async deleteCategory(_id: string | undefined): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.category.categoryDelete, { _id })
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async activeInActive(_id: string | undefined): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.category.categoryActiveInActive, { _id })
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  }
};
