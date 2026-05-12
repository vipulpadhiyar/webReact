import { faqList } from '../category/type';

export interface cityCategoryList {
  categoryName: string;
  cityAreaName: string;
  cityName: string;
  convertedForSort: string;
  createdDate: string;
  isActive: boolean;
  serviceCount: number;
  _id: string;
}
export interface cityCategoryView {
  categoryName: string;
  cityAreaName: string;
  cityName: string;
  createdDate: string;
  faq: faqList[];
  isActive: boolean;
  serviceCount: number;
  _id: string;
  categoryId?: string;
  serviceIds?: string[];
  cityAreaId?: string;
  serviceNames: string[];
  cityId: string;
}

export interface cityListCategoryDT {
  list: cityCategoryList[];
  total_records: number;
}
export interface cityViewAreaDT {
  data: cityAreaList[];
}
export interface cityAreaRequestParma {
  cityId: string;
  name: string;
  faq?: faqList[];
  aboutArea: string;
}
export interface cityCategoryForm {
  cityId: string;
  cityAreaId?: string;
  categoryId: string;
  serviceIds: string;
  faq: faqList[];
}
export interface addCityCategoryForm {
  cityId: string;
  cityAreaId?: string;
  categoryId: string;
  serviceIds: any;
  faq?: faqList[];
  _id?: string;
}
