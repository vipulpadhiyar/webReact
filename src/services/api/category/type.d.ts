import { ICommonPagination } from 'utils/Types';

export interface categoryList {
  aboutCategory: string;
  convertedForSort: string;
  createdDate: string;
  image: string;
  isActive: boolean;
  name: string;
  subCategoryCount: number;
  _id: string;
  rating: string;
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
  featureImage: string;
  aboutCategory: string;
  subCategoryCount: string;
  rating: string;
  showInTop: boolean;
  faq: faqList[];
  isOneKmAlgorithm: boolean;
}

export interface categoryListDT {
  list: categoryList[];
  total_records: number;
}
export interface categoryAddRequest {
  image: string;
  name: string;
  description: string;
}
export interface categoryViewRequest {
  _id: string;
}
export interface categoryUpdateRequest {
  _id: string;
  name: string;
  description: string;
  image: string;
}

export interface addForm {
  category: string;
  aboutCategory: string;
  name?: string;
  faq?: faqList[];
  rating?: string;
}
export interface ICategoryListReq extends ICommonPagination {}

//Add Category req params
export interface addCategoryRequestParams {
  name: string;
  faq?: faqList[];
  aboutCategory: string | undefined;
  image: string;
  featureImage?: string;
  showInTop: boolean;
  id?: string;
  rating?: string;
  isOneKmAlgorithm: boolean;
}

//Update Category req params
export interface updateCategoryRequestParams {
  _id: string;
  name: string;
  faq?: faqList[];
  aboutCategory: string | undefined;
  image: string;
  showInTop: boolean;
  featureImage?: string;
  rating?: string;
  isOneKmAlgorithm: boolean;
}
