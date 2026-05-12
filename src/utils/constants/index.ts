import { ROUTES } from './routes';

// Env variables
export const API_BASE = import.meta.env.VITE_REACT_APP_API_BASE;
export const APP_NAME = import.meta.env.VITE_REACT_APP_NAME;
export const STATIC_TOKEN = import.meta.env.VITE_REACT_APP_STATIC_TOKEN;
export const VITE_REACT_APP_IMAGE_URL = import.meta.env.VITE_REACT_APP_IMAGE_URL;
export const VITE_REACT_APP_IMAGE_URL_TEMP = import.meta.env.VITE_REACT_APP_IMAGE_URL_TEMP;
export const VITE_REACT_APP_KYC_URL = import.meta.env.VITE_REACT_APP_KYC_URL;
export const VITE_REACT_APP_GOOGLE_GEOCODER_API_KEY = import.meta.env
  .VITE_REACT_APP_GOOGLE_GEOCODER_API_KEY;

// Local Storage Variables
export const LocalStorageKeys = {
  user: `user${APP_NAME}`,
  authToken: `authToken${APP_NAME}`
};

export const uploadImageEnum = {
  category: 'category',
  subCategory: 'subCategory',
  subService: 'subService',
  service: 'service',
  city: 'city',
  jsonImage: 'jsonImage',
  vendor: 'vendor',
  cms: 'cms',
  customer: 'user',
  subAdmin: 'admin',
  video: 'video',
  bookingRequest: 'bookingRequest',
  homePageBanner: 'homePageBanner'
};
export const seoTypeEnum = {
  all: 'all',
  city: 'city',
  category: 'category',
  cityArea: 'cityArea',
  cityCategory: 'cityCategory',
  categoryService: 'categoryService',
  cityAreaCategory: 'cityAreaCategory',
  cityCategoryService: 'cityCategoryService',
  cityAreaCategoryService: 'cityAreaCategoryService'
};
export const seoTypeTitleEnum = {
  all: 'Hybrid Content',
  city: 'Hybrid City Content',
  category: 'Hybrid Category Content',
  cityArea: 'Hybrid City Area Content',
  cityAreaCategory: 'Hybrid City Area Category Content',
  cityAreaCategoryService: 'Hybrid City Area Category Service Content',
  cityCategory: 'Hybrid City Category Content',
  cityCategoryService: 'Hybrid City Category service Content',
  categoryService: 'Hybrid Category Service Content'
};
export const cmsTypeEnum = {
  faq: 'faq',
  contactsUs: 'contactsUs',
  training: 'training'
};

export const duration = {
  time_five_minit: 5 * 60 * 1000
};
export const fieldLength = {
  minimumName: 2,
  maximumName: 50,
  minimumAbout: 10,
  maximumAbout: 5000
};

export enum UserType {
  WEB = 'web'
}

export enum BookingRequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accept',
  COMPLETE = 'complete',
  CANCEL = 'cancel',
  VENDOR_NOT_FOUND = 'vendor_not_found'
}

export enum BookingRequestVendorStatus {
  PENDING = 'pending',
  ACCEPTED = 'accept',
  START = 'start',
  DIRECTION = 'direction',
  REACHED = 'reached',
  COMPLETE = 'complete',
  CANCEL = 'cancel',
  VENDOR_NOT_FOUND = 'vendor_not_found'
}

export const enum BookingType {
  INSTANT = 'INSTANT',
  SCHEDULE = 'SCHEDULE'
}

export const userRole = [
  {
    name: 'Customer',
    _id: 'user'
  },
  {
    name: 'Vendor',
    _id: 'vendor'
  }
];

export const UserRoleFaq = {
  USER: 'user',
  VENDOR: 'vendor'
};

export const updateBookingStatusArr = [
  { value: 'pending', label: 'Pending' },
  { value: 'accept', label: 'Accept' },
  { value: 'complete', label: 'Completed' },
  { value: 'cancel', label: 'Cancel' },
  { value: 'vendor_not_found', label: 'Vendor Not Found' }
];

export const updateBookingVendorStatusArr = [
  { value: 'pending', label: 'Pending' },
  { value: 'accept', label: 'Booking Accepted' },
  { value: 'start', label: 'Work is in progress' },
  { value: 'direction', label: 'On The Way' },
  { value: 'reached', label: 'Reached' },
  { value: 'complete', label: 'Completed' },
  { value: 'cancel', label: 'Cancel' },
  { value: 'vendor_not_found', label: 'Vendor Not Found' }
];

export const filterByPaymentStatus = [
  { value: 'pending', label: 'Pending' },
  { value: 'complete', label: 'Completed' }
];

export const filterByStatus = [
  { value: 'pending', label: 'Pending' },
  { value: 'complete', label: 'Completed' },
  { value: 'cancel', label: 'Cancel' },
  { value: 'accept', label: 'Accept' },
  { value: 'vendor_not_found', label: 'Vendor Not Found' }
];

export const defaultValue = {
  commission: '10'
};

export enum SubAdminRole {
  ALL = 'ALL',
  DASHBOARD = 'DASHBOARD',
  SERVICE = 'SERVICE',
  CITY = 'CITY',
  SEO = 'SEO',
  CMS = 'CMS',
  REVIEW = 'REVIEW',
  COUPON = 'COUPON',
  BOOKING = 'BOOKING',
  VENDOR = 'VENDOR',
  CUSTOMER = 'CUSTOMER',
  VENDOR_PAYMENT = 'VENDOR_PAYMENT',
  PAYMENT_HISTORY = 'PAYMENT_HISTORY',
  SUPPORT_TICKET = 'SUPPORT_TICKET',
  ANALYTICS = 'ANALYTICS'
}

export const checkBoxOptions = [
  { _id: 12, label: 'Dashboard Management', value: SubAdminRole.DASHBOARD },
  { _id: 1, label: 'Booking Management', value: SubAdminRole.BOOKING },
  { _id: 2, label: 'City Management', value: SubAdminRole.CITY },
  { _id: 3, label: 'CMS Management', value: SubAdminRole.CMS },
  { _id: 4, label: 'Coupon Management', value: SubAdminRole.COUPON },
  { _id: 5, label: 'Customer Management', value: SubAdminRole.CUSTOMER },
  { _id: 6, label: 'Payment History Management', value: SubAdminRole.PAYMENT_HISTORY },
  { _id: 7, label: 'Review Management', value: SubAdminRole.REVIEW },
  { _id: 8, label: 'SEO Management', value: SubAdminRole.SEO },
  {
    _id: 9,
    label: 'Service Management (Category,Sub-Category,Service,Sub-Service)',
    value: SubAdminRole.SERVICE
  },
  { _id: 10, label: 'Vendor Management', value: SubAdminRole.VENDOR },
  { _id: 11, label: 'Vendor Payment Management', value: SubAdminRole.VENDOR_PAYMENT },
  { _id: 13, label: 'Support Ticket Management', value: SubAdminRole.SUPPORT_TICKET },
  { _id: 14, label: 'Analytics', value: SubAdminRole.ANALYTICS }
];

// Api Endpoint
export const ApiEndPoints = {
  auth: {
    signIn: `auth/login`,
    signUp: `admin/signup`,
    signOut: `auth/logout`
  },
  user: {
    userList: `admin/user/list`
  },
  dashboard: {
    dashboard: `admin/dashboard`
  },
  analytics: {
    vendorDutyAnalytics: `admin/bookingManagement/bookingAnalytics`,
    vendorLeadsAnalytics: `admin/bookingManagement/leadAnalytics`,
    exportVendorDuty: 'admin/bookingManagement/exportExcelBookingAnalytics',
    exportVendorLeads: 'admin/bookingManagement/exportExcelLeadAnalytics'
  },
  supportTicket: {
    supportTicketList: `common/supportTicket/list`
  },
  category: {
    categoryList: '/admin/categoryManagement/list',
    categoryView: '/admin/categoryManagement/view',
    categoryCreate: '/admin/categoryManagement/create',
    categoryUpdate: '/admin/categoryManagement/update',
    categoryDelete: '/admin/categoryManagement/delete',
    categoryActiveInActive: '/admin/categoryManagement/activeInActive',
    categoryImageUpload: '/file-upload/uploadMultipleFile'
  },
  subAdmin: {
    subAdminList: '/admin/sub-admin/list',
    subAdminAdd: '/admin/sub-admin/create',
    subAdminActiveInActive: 'admin/sub-admin/changeStatus',
    deleteSubAdmin: '/admin/sub-admin/delete',
    subAdminView: '/admin/sub-admin/view',
    subAdminUpdate: '/admin/sub-admin/update',
    resendPassword: '/admin/sub-admin/resendPassword'
  },
  video: {
    videoList: '/admin/video-management/list',
    videoAdd: '/admin/video-management/create',
    videoActiveInActive: 'admin/video-management/changeStatus',
    deleteVideo: '/admin/video-management/delete',
    videoView: '/admin/video-management/view',
    videoUpdate: '/admin/video-management/update',
    videoUpload: '/file-upload/uploadVideo'
  },
  homeBanner: {
    homeBannerList: '/admin/homePageBanner/list',
    homeBannerAdd: '/admin/homePageBanner/create',
    homeBannerActiveInActive: 'admin/homePageBanner/changeStatus',
    deleteHomeBanner: '/admin/homePageBanner/delete',
    homeBannerView: '/admin/homePageBanner/view',
    homeBannerUpdate: '/admin/homePageBanner/update'
  },
  service: {
    serviceList: '/admin/serviceManagement/list',
    serviceView: '/admin/serviceManagement/view',
    serviceDelete: '/admin/serviceManagement/delete',
    serviceActiveInActive: '/admin/serviceManagement/activeInActive',
    serviceCreate: '/admin/serviceManagement/create',
    serviceUpdate: '/admin/serviceManagement/update'
  },
  city: {
    cityList: '/admin/cityManagement/list',
    cityView: '/admin/cityManagement/view',
    cityDelete: '/admin/cityManagement/delete',
    cityActiveInActive: '/admin/cityManagement/activeInActive',
    cityCreate: '/admin/cityManagement/create',
    cityUpdate: '/admin/cityManagement/update'
  },
  cityArea: {
    cityAreaList: '/admin/cityAreaManagement/list',
    cityAreaView: '/admin/cityAreaManagement/view',
    cityAreaDelete: '/admin/cityAreaManagement/delete',
    cityAreaActiveInActive: '/admin/cityAreaManagement/activeInActive',
    cityAreaCreate: '/admin/cityAreaManagement/create',
    cityAreaUpdate: '/admin/cityAreaManagement/Update'
  },
  cityCategory: {
    cityCategoryList: '/admin/cityCategoryManagement/list',
    cityCategoryView: '/admin/cityCategoryManagement/view',
    cityCategoryDelete: '/admin/cityCategoryManagement/delete',
    cityCategoryActiveInActive: '/admin/cityCategoryManagement/activeInActive',
    cityCategoryCreate: '/admin/cityCategoryManagement/create',
    cityCategoryUpdate: '/admin/cityCategoryManagement/update'
  },
  cms: {
    addCMS: '/admin/cmsManagement/create',
    getCMS: '/admin/cmsManagement/getCms',
    faqList: '/admin/cmsManagement/faqList',
    getFaq: '/admin/cmsManagement/getCms',
    deleteCms: '/admin/cmsManagement/deleteCms',
    activeInActiveCms: '/admin/cmsManagement/activeInActiveCms',

    // Contact us
    getContactUsList: '/admin/cmsManagement/contactUsList',

    // training
    trainingList: '/admin/cmsManagement/trainingList'
  },
  password: {
    changePassword: '/auth/changePassword',
    resetPassword: '/auth/resetPassword',
    forgetPassword: '/auth/forgotPassword'
  },
  seo: {
    seoHybridManagementView: '/admin/seoHybridManagement/view',
    seoHybridManagementCreate: '/admin/seoHybridManagement/create',
    seoHybridManagementUpdate: '/admin/seoHybridManagement/update'
  },
  subCategory: {
    subCategoryList: '/admin/subCategoryManagement/list',
    subCategoryView: '/admin/subCategoryManagement/view',
    subCategoryCreate: '/admin/subCategoryManagement/create',
    subCategoryUpdate: '/admin/subCategoryManagement/update',
    subCategoryDelete: '/admin/subCategoryManagement/delete',
    subCategoryActiveInActive: '/admin/subCategoryManagement/activeInActive',
    bannerImageDelete: '/admin/subCategoryManagement/deleteBannerMedia'
  },
  subService: {
    subServiceList: '/admin/subServiceManagement/list',
    subServiceView: '/admin/subServiceManagement/view',
    subServiceDelete: '/admin/subServiceManagement/delete',
    subServiceActiveInActive: '/admin/subServiceManagement/activeInActive',
    subServiceCreate: '/admin/subServiceManagement/create',
    subServiceUpdate: '/admin/subServiceManagement/update',
    listService: '/admin/subServiceManagement/listService'
  },
  vendor: {
    vendorList: '/admin/vendorManagement/list',
    vendorView: '/admin/vendorManagement/view',
    vendorDelete: '/admin/vendorManagement/delete',
    vendorActiveInActive: '/admin/vendorManagement/activeInActive',
    vendorCreate: '/admin/vendorManagement/create',
    vendorUpdate: '/admin/vendorManagement/update',
    checkPhoneNumber: '/admin/vendorManagement/checkPhoneNumber',
    sendOtpFromAadhaarNumber: '/admin/vendorManagement/sendOtpFromAadhaarNumber',
    aadhaarNumberOtpVerify: '/admin/vendorManagement/aadhaarNumberOtpVerify',
    exportVendor: '/admin/vendorManagement/exportExcel',
    googleVerifyCode: 'admin/vendorManagement/verifyToken',
    restoreDeletedVendor: 'admin/vendorManagement/restoreDeletedVendor'
  },
  booking: {
    bookingList: '/admin/bookingManagement/list',
    bookingView: '/admin/bookingManagement/view',
    bookingUpdate: 'admin/bookingManagement/updateStatus',
    findNearByVendors: 'admin/bookingManagement/nearByVendorList',
    sendManualBid: 'admin/bookingManagement/sendManualBid',
    exportBooking: '/admin/bookingManagement/exportExcel'
  },
  paymentHistory: {
    paymentHistoryList: '/admin/vendorPaymentManagement/paymentHistoryList',
    paymentHistoryView: '/admin/vendorPaymentManagement/paymentHistoryView',
    exportPaymentHistory: '/admin/vendorPaymentManagement/exportExcelPaymentHistory'
  },
  vendorPayment: {
    vendorPaymentList: '/admin/vendorPaymentManagement/list',
    vendorPaymentView: '/admin/vendorPaymentManagement/view',
    vendorPaymentPay: '/admin/vendorPaymentManagement/payout',
    exportVendorPayment: '/admin/vendorPaymentManagement/exportExcelVendorPayment',
    makeOutStandingZero: '/admin/vendorPaymentManagement/makeOutstandingZero'
  },
  customer: {
    customerList: '/admin/customerManagement/list',
    customerView: '/admin/customerManagement/view',
    customerActiveInActive: '/admin/customerManagement/activeInActive',
    customerDelete: `/admin/customerManagement/delete`
  },
  review: {
    reviewList: '/admin/reviewManagement/list',
    reviewView: '/admin/reviewManagement/view',
    reviewCreate: '/admin/reviewManagement/create',
    reviewUpdate: '/admin/reviewManagement/update',
    reviewDelete: '/admin/reviewManagement/delete',
    reviewActiveInActive: '/admin/reviewManagement/activeInActive'
  },
  coupon: {
    couponList: '/admin/couponManagement/list',
    couponView: '/admin/couponManagement/view',
    couponCreate: '/admin/couponManagement/create',
    couponUpdate: '/admin/couponManagement/update',
    couponDelete: '/admin/couponManagement/delete',
    couponActiveInActive: '/admin/couponManagement/activeInActive',
    customerList: '/admin/customerManagement/list'
  }
};

export const sideBarItems = [
  {
    type: 'DASHBOARD',
    path: ROUTES.dashboard
  },
  {
    type: 'SERVICE',
    path: ROUTES.categoryManagement
  },
  {
    type: 'SERVICE',
    path: ROUTES.subCategoryManagement
  },
  {
    type: 'SERVICE',
    path: ROUTES.serviceManagement
  },
  {
    type: 'SERVICE',
    path: ROUTES.subServiceManagement
  },
  {
    type: 'CITY',
    path: ROUTES.cityManagement
  },
  {
    type: 'BOOKING',
    path: ROUTES.bookingManagement
  },
  {
    type: 'VENDOR_PAYMENT',
    path: ROUTES.vendorPaymentManagement
  },
  {
    type: 'PAYMENT_HISTORY',
    path: ROUTES.paymentHistoryManagement
  },
  {
    type: 'ALL',
    path: ROUTES.subAdminManagement
  },
  {
    type: 'VENDOR',
    path: ROUTES.vendorManagement
  },
  {
    type: 'CUSTOMER',
    path: ROUTES.customerManagement
  },
  {
    type: 'REVIEW',
    path: ROUTES.reviewManagement
  },
  {
    type: 'COUPON',
    path: ROUTES.couponManagement
  },
  {
    type: 'SEO',
    path: '/seo-management'
  },
  {
    type: 'CMS',
    path: '/cms-management'
  }
];
