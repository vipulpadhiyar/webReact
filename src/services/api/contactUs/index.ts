import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import { ICategoryListReq } from '../category/type';
import {
  contactUsList,
  contactUsListDT,
  deleteFaq,
  editContactUsForm,
  requestPayloadGetFaq
} from './type';

export const contactUsAPI = {
  // Category List
  async getContactUsAPI(data: ICategoryListReq): Promise<contactUsList> {
    return apiInstance
      .post(ApiEndPoints.cms.getContactUsList, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },

  async getContactUsView(data: requestPayloadGetFaq): Promise<contactUsListDT> {
    return apiInstance
      .post(ApiEndPoints.cms.getFaq, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  async updateContactUs(data: editContactUsForm): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.cms.addCMS, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async deleteContact(data: deleteFaq): Promise<any> {
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
