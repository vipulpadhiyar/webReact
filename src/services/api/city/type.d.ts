// City Management
import { faqList } from '../category/type';

export interface cityList {
  _id: string;
  image: string;
  name: string;
  description: string;
  cityAreaCount: number;
  isActive: true;
  createdAt: string;
}
export interface cityListView {
  _id: string;
  image: string;
  name: string;
  description: string;
  cityAreaCount: number;
  isActive: true;
  createdAt: string;
  aboutCity: string;
  faq: faqList[];
  showInTop: boolean;
  enableBooking: boolean;
}

export interface cityListDT {
  list: cityList[];
  total_records: number;
}

export interface faqAddReq {
  question: string;
  answer: string;
}
export interface cityAddRequest {
  image: string;
  name: string;
  description: string;
  faq: faqAddReq[];
  aboutCity: string;
  showInTop: boolean;
  enableBooking: boolean;
}
export interface cityViewRequest {
  _id: string;
}
export interface cityUpdateRequest {
  _id: string;
  image: string;
  name: string;
  description: string;
  faq: faqAddReq[];
  aboutCity: string;
  showInTop: boolean;
  enableBooking: boolean;
}

// City Area Management

export interface cityAreaAddRequest {
  image: string;
  cityName: string;
  cityId: string;
  cityAreaDesc: string;
}
export interface cityAreaList {
  _id: string;
  image: string;
  cityName: string;
  cityAreaName: string;
  cityAreaDesc: string;
  isActive: boolean;
  createdAt: string;
}

export interface cityAreaListDT {
  data: cityAreaList[];
}

export interface cityAreaViewRequest {
  _id: string;
}
export interface cityAreaUpdateRequest {
  _id: string;
  image: string;
  cityName: string;
  cityId: string;
  cityAreaDesc: string;
}

// City Category Management

export interface cityCategoryAddRequest {
  cityId: string;
  cityAreaId: string;
  categoryId: string;
  serviceIds: [];
}
export interface cityCategoryList {
  _id: string;
  image: string;
  cityName: string;
  serviceCount: number;
  cityAreaName: string;
  categoryName: string;
  isActive: true;
  createdAt: string;
}
export interface cityCategoryListDT {
  data: cityCategoryList[];
}
export interface cityCategoryViewRequest {
  _id: string;
}
export interface cityCategoryUpdateRequest {
  _id: string;
  cityId: string;
  cityAreaId: string;
  categoryId: string;
  serviceIds: [];
}

export interface addCityForm {
  city: string;
  aboutCity: string;
  exampleRadio: string;
  faq: faqList[];
}
export interface addCityRequestParams {
  name: string;
  faq: faqList[];
  aboutCity: string;
  image: string;
  showInTop: boolean;
  enableBooking: boolean;
  _id?: string;
  faq?: faqList[];
  lat?: number;
  lng?: number;
}
