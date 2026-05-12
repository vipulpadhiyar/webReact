export interface vendorPaymentView {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  countryCode: string;
  amount: number;
  isFlag: true;
}
export interface vendorPaymentListDT {
  list: vendorPaymentView[];
  total_records: number;
}
export interface vendorPaymentViewDetails {
  amount: number;
  accountDetails: {
    bankName: string;
    accountHolderName: string;
    accountNumber: string;
    IFSCCode: string;
    kyc: string;
    aadhaarNumber: string;
  };
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

export interface IPayReqParam {
  vendorId: string;
  amount: string;
}
