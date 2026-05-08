import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import { ICategoryListReq } from '../category/type';
import {
  deleteFaq,
  editTrainingForm,
  requestPayloadGetFaq,
  trainingList,
  trainingListListDT
} from './type';

export const trainingAPI = {
  // Category List
  async getTrainingListApi(data: ICategoryListReq): Promise<trainingList> {
    return apiInstance
      .post(ApiEndPoints.cms.trainingList, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },

  async getTrainingView(data: requestPayloadGetFaq): Promise<trainingListListDT> {
    return apiInstance
      .post(ApiEndPoints.cms.getFaq, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  async addTraining(data: editTrainingForm): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.cms.addCMS, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async updateTraining(data: editTrainingForm): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.cms.addCMS, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async deleteTraining(data: deleteFaq): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.cms.deleteCms, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async activeInActive(data: deleteFaq): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.cms.activeInActiveCms, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  }
};
