import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import {
  ICategoryListReq,
  addSubCategoryRequestParams,
  subCategoryList,
  subCategoryListDT
} from './type';

export const subCategoryAPI = {
  // Category List
  async getSubCategoryListAPI(data: ICategoryListReq): Promise<subCategoryListDT> {
    return apiInstance
      .post(ApiEndPoints.subCategory.subCategoryList, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },

  //Category Details

  async getSubCategoryView(_id: string | undefined): Promise<subCategoryList> {
    return apiInstance
      .post(ApiEndPoints.subCategory.subCategoryView, { _id })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  async addSubCategoryDetails(data: addSubCategoryRequestParams): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.subCategory.subCategoryCreate, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  async updateSubCategoryDetails(data: addSubCategoryRequestParams): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.subCategory.subCategoryUpdate, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  async deleteSubCategory(_id: string | undefined): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.subCategory.subCategoryDelete, { _id })
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async activeInActive(_id: string | undefined): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.subCategory.subCategoryActiveInActive, { _id })
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  async deleteBannerMedia(data: { media: string; thumbnail?: string }): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.subCategory.bannerImageDelete, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  }
};
