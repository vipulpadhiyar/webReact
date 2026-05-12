export interface reviewView {
  adminFullName: string;
  rating: string;
  review: string;
  reviewerId: string;
  status: string;
  vendorFullName: string;
  vendorId: string;
  _id: string;
}
export interface reviewListDT {
  list: reviewView[];
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
export interface addReviewForms {
  vendorId: string;
  review: string;
  rating: string;
  _id?: string;
}
