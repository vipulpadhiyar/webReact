import { IVideoListArg } from 'services/hooks/video/types';

import { IApiSuccess } from 'utils/Types';
import { ApiEndPoints } from 'utils/constants';

import apiInstance from '..';
import { IGetDetailsVideo, IGetVideoListRes, IUpdateVideoReq } from './type';

export const videoApi = {
  async getVideoList(data: IVideoListArg): Promise<IGetVideoListRes> {
    return apiInstance
      .post(ApiEndPoints.video.videoList, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },

  async addVideoAction(data: {
    name: string;
    thumbnail: string;
    video: string;
  }): Promise<IApiSuccess<Record<string, any>>> {
    return apiInstance
      .post(ApiEndPoints.video.videoAdd, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  async getVideoView(_id: string | undefined): Promise<IGetDetailsVideo> {
    return apiInstance
      .post(ApiEndPoints.video.videoView, { _id })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },

  async activeInActiveVideo(_id: string | undefined): Promise<IApiSuccess<Record<string, any>>> {
    return apiInstance
      .post(ApiEndPoints.video.videoActiveInActive, { _id })
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  async uploadVideo(data: any): Promise<any> {
    return apiInstance
      .post(ApiEndPoints.video.videoUpload, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },

  async updateVideoDetails(data: IUpdateVideoReq): Promise<IApiSuccess<Record<string, any>>> {
    return apiInstance
      .post(ApiEndPoints.video.videoUpdate, data)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  },

  async deleteVideoAction(_id: string | undefined): Promise<IApiSuccess<Record<string, any>>> {
    return apiInstance
      .post(ApiEndPoints.video.deleteVideo, { _id })
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  }
};
