export interface IGetHomeBannerListRes {
  list: IGetHomeBannerListResList[];
  total_records: number;
}

export interface IGetHomeBannerListResList {
  _id: string;
  name: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  convertedForSort: string;
}

export interface IGetDetailsHomeBanner {
  _id: string;
  name: string;
  image: string;
  isActive: boolean;
  createdAt: string;
}

export interface IUpdateHomeBannerReq {
  _id: string;
  name: string;
  image: string;
}
