import { IHomeBannerListArg } from 'services/hooks/homeBanner/types';

import { IApiSuccess } from 'utils/Types';
import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import { IGetDetailsHomeBanner, IGetHomeBannerListRes, IUpdateHomeBannerReq } from './type';

export const homeBannerApi = {
  async getHomeBannerList(data: IHomeBannerListArg): Promise<IGetHomeBannerListRes> {
    return apiInstance
      .post(ApiEndPoints.homeBanner.homeBannerList, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },

  async addHomeBannerAction(data: {
    name: string;
    image: string;
  }): Promise<IApiSuccess<Record<string, any>>> {
    return apiInstance
      .post(ApiEndPoints.homeBanner.homeBannerAdd, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  async getHomeBannerView(_id: string | undefined): Promise<IGetDetailsHomeBanner> {
    return apiInstance
      .post(ApiEndPoints.homeBanner.homeBannerView, { _id })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },

  async activeInActiveHomeBanner(
    _id: string | undefined
  ): Promise<IApiSuccess<Record<string, any>>> {
    return apiInstance
      .post(ApiEndPoints.homeBanner.homeBannerActiveInActive, { _id })
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  async updateHomeBannerDetails(
    data: IUpdateHomeBannerReq
  ): Promise<IApiSuccess<Record<string, any>>> {
    return apiInstance
      .post(ApiEndPoints.homeBanner.homeBannerUpdate, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  async deleteHomeBannerAction(_id: string | undefined): Promise<IApiSuccess<Record<string, any>>> {
    return apiInstance
      .post(ApiEndPoints.homeBanner.deleteHomeBanner, { _id })
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  }
};
