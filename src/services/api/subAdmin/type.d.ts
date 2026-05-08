export interface IAddSubAdminReq {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
  access: string[] | [];
  countryCode?: string;
  phoneNumber?: string;
}
export interface IUpdateSubAdminReq {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  access: string[];
  countryCode: string;
  phoneNumber: string;
}

export interface IGetSubAdminListRes {
  list: IGetSubAdminListResList[];
  total_records: number;
}

export interface IGetSubAdminListResList {
  _id: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  profilePicture: string;
  access: string[];
  isActive: boolean;
  createdAt: string;
  fullName: string;
  convertedForSort: string;
}
export interface IGetSubAdminDetailsResList {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  countryCode: string;
  access: string[];
  phoneNumber: string;
  isActive: boolean;
  createdAt: string;
}
