export interface couponView {
  categoryId: string;
  couponCode: string;
  discount: string;
  discountType: string;
  fullName: string;
  minimumAmount: string;
  usageLimit: string;
  userId: string;
  validateDate: string;
  _id: string;
  categoryName: string[];
  userPhoneNum: string[];
  totalAmountDiscount: boolean;
  userUsageLimit: string;
}
export interface couponListDT {
  list: couponView[];
  total_records: number;
}
export interface addCouponForms {
  couponCode: string;
  minimumAmount: string;
  discountType: string;
  discount: string;
  validateDate?: string;
  usageLimit: string;
  userId: string;
  categoryId: string;
  _id?: string;
  totalAmountDiscount?: boolean;
  userUsageLimit: string;
}

export interface customerView {
  adminFullName: string;
  rating: string;
  review: string;
  reviewerId: string;
  status: string;
  vendorFullName: string;
  vendorId: string;
  _id: string;
}
export interface customerListDT {
  list: customerView[];
  total_records: number;
}
