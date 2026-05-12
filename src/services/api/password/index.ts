import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import {
  changePasswordRequestParams,
  forgetPasswordRequestParams,
  resetPasswordRequestParams
} from './type';

export const passwordAPI = {
  // Category List
  async changaPasswordAPI(data: changePasswordRequestParams): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.password.changePassword, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async resetPasswordAPI(data: resetPasswordRequestParams): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.password.resetPassword, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },
  async forgetPassword(data: forgetPasswordRequestParams): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.password.forgetPassword, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  }
};
