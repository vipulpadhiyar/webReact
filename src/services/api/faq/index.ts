import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import { ICategoryListReq } from '../category/type';
import { deleteFaq, editFaqForm, faqListDT, faqListResponse, requestPayloadGetFaq } from './type';

export const faqAPI = {
  // Category List
  async getFaqListApi(data: ICategoryListReq): Promise<faqListResponse> {
    return apiInstance
      .post(ApiEndPoints.cms.faqList, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },

  async getFaqView(data: requestPayloadGetFaq): Promise<faqListDT> {
    return apiInstance
      .post(ApiEndPoints.cms.getFaq, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  async addFaq(data: editFaqForm): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.cms.addCMS, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async updateFaq(data: editFaqForm): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.cms.addCMS, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async deleteFaq(data: deleteFaq): Promise<any> {
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
