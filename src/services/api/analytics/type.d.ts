export interface VendorDutyRes {
  list: VendorDutyList[];
  total_records: number;
}

export interface VendorDutyList {
  _id: string;
  bookingNumber: number;
  isActive: boolean;
  createdDate: string;
  acceptBookingTime: string;
  reachLocationTime: string;
  serviceStartDate: string;
  serviceEndDate: string;
  serviceCompleteTime: number;
  vendorFirstName: string;
  vendorLastName: string;
  vendorFullName: string;
  vendorPhoneNumber: string;
  userAddressId: string;
  city: string;
  categoryName: string;
  status: string;
  convertedForSort: string;
  differenceAcceptAndReach: number;
}

export interface VendorLeadAnalyticsRes {
  list: VendorLeadAnalyticsList[];
  total_records: number;
}

export interface VendorLeadAnalyticsList {
  _id: string;
  userId: string;
  bookingNumber: number;
  createdDate: string;
  address: string;
  allVendorLead: AllVendorLead[];
  ignoreService: any[];
  acceptService: any[];
  onlineVendor: OnlineVendor[];
  offlineVendor: OfflineVendor[];
  userPhoneNumber: string;
  status: string;
  acceptVendor: AcceptVendor;
  convertedForSort: string;
  vendorFullName: any;
  vendorPhoneNumber: any;
}

export interface AllVendorLead {
  status: string;
  second: number;
  isOnline: boolean;
  _id: string;
  vendorName: string;
}

export interface OnlineVendor {
  status: string;
  second: number;
  isOnline: boolean;
  _id: string;
  vendorName: string;
}

export interface OfflineVendor {
  status: string;
  second: number;
  isOnline: boolean;
  _id: string;
  vendorName: string;
}

export interface AcceptVendor {
  vendorName: any;
  vendorPhoneNumber: any;
}
