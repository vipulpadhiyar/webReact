export interface customerView {
  _id: string;
  countryCode: string;
  phoneNumber: string;
  isActive: boolean;
  createdAt: string;
  fullName: string;
  bookingReqCount: number;
  email: string;
  profilePicture: string;
}
export interface customerListDT {
  list: customerView[];
  total_records: number;
}
export interface userAddress {
  address: string;
  city: string;
  state: string;
  type: string;
  zipCode: string;
  _id: string;
}
export interface serviceDetailsList {
  image: string;
  name: string;
  price: string;
  quantity: 2;
  _id: string;
}
