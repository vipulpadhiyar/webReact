import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import { ICategoryListReq } from '../category/type';
import { addReviewForms, reviewListDT, reviewView } from './type';

export const reviewAPI = {
  // Category List
  async getReviewListApi(data: ICategoryListReq): Promise<reviewListDT> {
    return apiInstance
      .post(ApiEndPoints.review.reviewList, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },

  async deleteReview(_id: string | undefined): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.review.reviewDelete, { _id })
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async addReviewDetails(data: addReviewForms): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.review.reviewCreate, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async updateReviewDetails(data: addReviewForms): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.review.reviewUpdate, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async getReviewView(_id: string | undefined): Promise<reviewView> {
    return apiInstance
      .post(ApiEndPoints.review.reviewView, { _id })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
};
