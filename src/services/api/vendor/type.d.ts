export interface Experience {
  name: string;
  value: string;
}

export interface staticJson {
  totalExperience: Experience[];
  pastWorkingExperience: Experience[];
  bankList: Experience[];
  spokenLanguage: Experience[];
  availability: Experience[];
  kycOptions: Experience[];
  businessType: Experience[];
}

export interface Address {
  state: string;
  city: string;
  pinCode: string;
  addressLine1: string;
  addressLine2: string;
}

export interface BusinessDetails {
  ownerName: string;
  businessName: string;
  primaryBusinessCategory: any;
  primaryBusinessSubService: string[];
  secondaryBusinessCategory: string[];
  secondaryBusinessSubService: string[];
  isShop: boolean;
  businessImage: string;
  businessType: string;
}
export interface BusinessDetailsView {
  ownerName: string;
  businessName: string;
  primaryBusinessCategory: any;
  serviceArea: [
    {
      _id: string;
      name: string;
    }
  ];
  serviceCity: { _id: string; name: string };
  primaryBusinessSubService: [
    {
      _id: string;
      categoryId: string;
      name: string;
    }
  ];
  secondaryBusinessCategory: [
    {
      _id: string;
      name: string;
    }
  ];
  secondaryBusinessSubService: [
    {
      _id: string;
      name: string;
    }
  ];
  isShop: boolean;
  businessImage: string;
  businessType: string;
}

export interface AccountDetails {
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  IFSCCode: string;
  kyc: string;
  aadhaarNumber: string;
  aadhaarFrontImage: string;
  aadhaarBackImage: string;
  panNumber?: string;
}

export interface Location {
  coordinates: string[];
}

export interface addVendorForm {
  _id?: string;
  firstName: string;
  lastName: string;
  signUpStep?: number;
  profilePicture: string;
  countryCode: string;
  phoneNumber: string;
  totalExperience: string;
  pastWorkingExperience: string;
  totalRating: string;
  ratedYou: string;
  reviewYou: string;
  isAllTimeAvailable: boolean;
  interestedPaidLead: boolean;
  spokenLanguages: string[];
  address: Address;
  businessDetails: BusinessDetails;
  accountDetails: AccountDetails;
  location: Location;
  isOnline: boolean;
  fcmToken?: string;
  deviceId?: string;
}
export interface vendorView {
  _id?: string;
  firstName: string;
  lastName: string;
  signUpStep?: number;
  profilePicture: string;
  countryCode: string;
  phoneNumber: string;
  totalExperience: string;
  pastWorkingExperience: string;
  totalRating: string;
  ratedYou: string;
  reviewYou: string;
  isAllTimeAvailable: boolean;
  interestedPaidLead: boolean;
  spokenLanguages: string[];
  address: Address;
  businessDetails: BusinessDetailsView;
  accountDetails: AccountDetails;
  location: Location;
  isOnline: boolean;
  fcmToken?: string;
  deviceId?: string;
  lastOpenAppDate: string;
  lastLoginDate: string;
  lastLocationUpdateDate: string;
}
export interface checkPhoneNumberReq {
  phoneNumber: string;
  countryCode: string;
}
export interface sentAadhaarReqForm {
  aadhaarNumber: string;
}
export interface otpVerifyReqForm {
  otp: string;
  refId: string;
  accessToken: string;
}

export interface vendorList {
  _id: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  phoneNumber: string;
  isActive: boolean;
  createdDate: string;
  totalSubCategoryCount: number;
  convertedForSort: string;
  userFullName: string;
  isDeleted: boolean;
}

export interface vendorlistDt {
  list: vendorList[];
  total_records: number;
}
