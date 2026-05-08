import { faqList } from '../category/type';

export interface serviceList {
  aboutService: string;
  categoryName: string;
  commission: string;
  convertedForSort: string;
  createdDate: string;
  image: string;
  isActive: boolean;
  isHasSubService: boolean;
  name: string;
  price: string;
  subCategoryName: string;
  subServiceCount: number;
  _id: string;
}
export interface serviceView {
  _id: string;
  name: string;
  price: string;
  commission: string;
  description: string;
  image: string;
  serviceDetailImage: string;
  categoryName: string;
  isActive: boolean;
  createdAt: string;
  faq: faqList[];
  aboutService: string;
  categoryId: string;
  subCategoryId: string;
  subCategoryName: string;
  isHasSubService: boolean;
  gst?: string;
  rating?: string;
  totalNumberOfRating?: string;
  serviceDetails?: any;
  howItWork?: any;
}

export interface serviceListDT {
  list: categoryList[];
  total_records: number;
}

export interface serviceAddRequest {
  image: string;
  name: string;
  description: string;
  price: string;
  commission: string;
  categoryId: string;
}
export interface serviceViewRequest {
  _id: string;
}
export interface serviceUpdateRequest {
  _id: string;
  name: string;
  price: string;
  commission: string;
  description: string;
  image: string;
  categoryId: string;
}

export interface addServiceForm {
  _id?: string;
  name: string;
  categoryId?: string;
  price: string;
  commission: string;
  faq?: faqList[];
  aboutService: string;
  image: string;
  serviceDetailImage: string;
  subCategoryId?: string;
  isHasSubService?: boolean;
  gst?: string;
  rating?: string;
  totalNumberOfRating?: string;
  serviceDetails?: any;
  howItWork?: any;
}

export interface serviceFrom {
  service: string;
  category: string;
  servicePrice: string;
  serviceCommission: string;
  aboutService: string;
  subCategoryId?: string;
  faq: faqList[];
  gst?: string;
  rating?: string;
  totalNumberOfRating?: string;
  serviceDetails?: any;
  howItWork?: any;
}
