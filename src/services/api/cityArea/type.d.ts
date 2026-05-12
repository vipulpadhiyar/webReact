import { faqList } from '../category/type';

export interface cityAreaList {
  cityAreaDesc: string;
  cityAreaName: string;
  cityName: string;
  convertedForSort: string;
  createdDate: string;
  isActive: boolean;
  _id: string;
  image: string;
  faq: faqList[];
  cityId?: string;
}
export interface cityListAreaView {
  _id: string;
  image: string;
  name: string;
  description: string;
  cityAreaCount: number;
  isActive: true;
  createdAt: string;
  aboutCity: string;
  faq: faqList[];
}

export interface cityListAreaDT {
  list: cityAreaList[];
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
  image?: string;
  _id?: string;
  faq?: faqList[];
  lat?: number;
  lng?: number;
  postalCode?: string;
}
