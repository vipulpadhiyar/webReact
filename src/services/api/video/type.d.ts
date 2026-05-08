export interface IGetVideoListRes {
  list: IGetVideoListResList[];
  total_records: number;
}

export interface IGetVideoListResList {
  _id: string;
  thumbnail: string;
  name: string;
  video: string;
  isActive: boolean;
  createdAt: string;
  convertedForSort: string;
}

export interface IGetDetailsVideo {
  _id: string;
  name: string;
  video: string;
  thumbnail: string;
  isActive: boolean;
  createdAt: string;
}

export interface IUpdateVideoReq {
  _id: string;
  name: string;
  thumbnail: string;
  video: string;
}
