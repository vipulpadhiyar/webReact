import { ICommonPagination } from 'utils/Types';

export interface subCategoryList {
  _id: string;
  name: string;
  aboutSubCategory: string;
  image: string;
  isActive: boolean;
  createdDate: string;
  serviceCount: number;
  categoryName: string;
  categoryId: string;
  convertedForSort: string;
  bannerMedia?: { media: string; thumbnail?: string }[];
}
export interface faqList {
  question: string;
  answer: string;
}
export interface categoryView {
  _id: string;
  name: string;
  description: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  serviceCount: string;
  aboutCategory: string;
  showInTop: boolean;
  faq: faqList[];
}

export interface subCategoryListDT {
  list: subCategoryList[];
  total_records: number;
}

export interface ICategoryListReq extends ICommonPagination {}

//Add Category req params
export interface addSubCategoryRequestParams {
  name: string;
  categoryId: string;
  aboutSubCategory: string;
  image?: string;
  _id?: string;
  bannerMedia?: { media: string; thumbnail?: string }[];
  newBannerMedia?: { media: string; thumbnail?: string }[];
  removeBannerMedia?: { media: string; thumbnail?: string }[];
}
