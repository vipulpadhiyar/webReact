export interface bookingView {
  bookingNumber: number;
  categoryName: string;
  createdDate: string;
  customerFullName: string;
  isActive: string;
  paymentStatus: string;
  vendorFullName: string;
  _id: string;
  totalAmount: string;
  serviceDetails: string[];
  subServiceDetails: string[];
  userAddress: userAddress;
  service: serviceDetailsList[];
  customerPhoneNumber?: string;
  vendorPhoneNumber?: string;
  serviceCharge: string;
  subTotal: string;
  status: string;
  nightCharges: string;
  visitationFee: string;
  bookingType?: string;
  scheduleDate?: string;
  scheduleSlot?: string;
  vendorShare?: number;
  vendorTotal?: number;
  vendorEmail?: string;
  paymentMethod: string;
  customerEmail?: string;
  NDShare?: number;
  reason?: string;
  NDTotal?: number;
  rating?: string;
  couponCode?: string;
  discount?: number;
  uploadSelfieImage?: string;
  uploadWorkImage?: string[];
  serviceEndDate?: string;
  serviceStartDate?: string;
}
export interface bookingListDT {
  list: bookingView[];
  total_records: number;
}
export interface userAddress {
  address: string;
  city: string;
  state: string;
  type: string;
  zipCode: string;
  _id: string;
  addressLine1: string;
}
export interface serviceDetailsList {
  image: string;
  name: string;
  price: string;
  quantity: 2;
  _id: string;
}

export interface VendorListRes {
  list: VendorList[];
  total_records: number;
}

export interface VendorList {
  _id: string;
  location: Location;
  isOnline: boolean;
  createdDate: string;
  name: string;
  phoneNumber: string;
}

export interface Location {
  type: string;
  coordinates: number[];
}
