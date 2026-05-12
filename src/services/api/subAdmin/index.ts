import { ISubAdminListArg } from 'services/hooks/subAdmin/types';

import { IApiSuccess } from 'utils/Types';
import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import {
  IAddSubAdminReq,
  IGetSubAdminDetailsResList,
  IGetSubAdminListRes,
  IUpdateSubAdminReq
} from './type';

export const subAdminApi = {
  async getSubAdminListAPI(data: ISubAdminListArg): Promise<IGetSubAdminListRes> {
    return apiInstance
      .post(ApiEndPoints.subAdmin.subAdminList, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },

  async addSubAdmin(data: IAddSubAdminReq): Promise<IApiSuccess<Record<string, any>>> {
    return apiInstance
      .post(ApiEndPoints.subAdmin.subAdminAdd, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  async getSubAdminView(_id: string | undefined): Promise<IGetSubAdminDetailsResList> {
    return apiInstance
      .post(ApiEndPoints.subAdmin.subAdminView, { _id })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },

  async activeInActiveSub(_id: string | undefined): Promise<IApiSuccess<Record<string, any>>> {
    return apiInstance
      .post(ApiEndPoints.subAdmin.subAdminActiveInActive, { _id })
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  async updateSubAdminDetails(data: IUpdateSubAdminReq): Promise<IApiSuccess<Record<string, any>>> {
    return apiInstance
      .post(ApiEndPoints.subAdmin.subAdminUpdate, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  async deleteSubAdminAction(_id: string | undefined): Promise<IApiSuccess<Record<string, any>>> {
    return apiInstance
      .post(ApiEndPoints.subAdmin.deleteSubAdmin, { _id })
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  async resendPasswordAction(_id: string | undefined): Promise<IApiSuccess<Record<string, any>>> {
    return apiInstance
      .post(ApiEndPoints.subAdmin.resendPassword, { _id })
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  }
};
