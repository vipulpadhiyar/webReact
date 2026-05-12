export interface subServiceList {
  aboutSubService: string;
  commission: string;
  convertedForSort: string;
  createdDate: string;
  image: string;
  isActive: boolean;
  name: string;
  price: string;
  serviceName: string;
  _id: string;
}
export interface subServiceView {
  aboutSubService: string;
  commission: string;
  convertedForSort: string;
  createdDate: string;
  image: string;
  subServiceDetailImage: string;
  isActive: boolean;
  name: string;
  price: string;
  serviceName: string;
  _id: string;
  serviceId: string;
  gst?: string;
  rating?: string;
  totalNumberOfRating?: string;
  subServiceDetails?: any;
  faq?: any;
  howItWork?: any;
}

export interface listServiceDetails {
  _id: string;
  name: string;
}
export interface listServiceDt {
  list: categoryList[];
  total_records: number;
}
export interface subServiceListDT {
  list: subServiceList[];
  total_records: number;
}
export interface addSubServiceForm {
  name: string;
  serviceId: string;
  price: string;
  commission: string;
  aboutSubService: string;
  image?: string;
  subServiceDetailImage?: string;
  _id?: string;
  gst?: string;
  rating?: string;
  totalNumberOfRating?: string;
  subServiceDetails?: any;
  howItWork?: any;
  faq?: any;
}
