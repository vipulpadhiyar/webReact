import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import { IUserListReq, IUserListRes } from './type';

export const userAPI = {
  // SignIn
  getUserList(data: IUserListReq): Promise<IUserListRes> {
    return apiInstance
      .post(ApiEndPoints.user.userList, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
};
