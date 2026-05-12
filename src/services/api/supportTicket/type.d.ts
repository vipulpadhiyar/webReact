export interface vendorPaymentView {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  countryCode: string;
  amount: 22.5;
  isFlag: true;
}
export interface vendorPaymentListDT {
  list: vendorPaymentView[];
  total_records: number;
}
export interface vendorPaymentViewDetails {
  amount: number;
  bookingDetails: [
    {
      bookingNumber: number;
      finalAmt: number;
      NDTotal: number;
      vendorShare: number;
      paymentMethod: string;
    }
  ];
  countryCode: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  totalCompletedService: number;
  transactionId: string;
  transactionStatus: string;
  _id: string;
  settle: { _id: string; amount: number; isPaidByAdmin: boolean; settleDate: string }[];
}
export interface serviceDetailsList {
  image: string;
  name: string;
  price: string;
  quantity: 2;
  _id: string;
}
