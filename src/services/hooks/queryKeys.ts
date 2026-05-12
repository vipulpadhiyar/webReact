import { ICategoryListReq } from 'services/api/category/type';
import { requestPayloadGetFaq } from 'services/api/faq/type';
import { IUserListReq } from 'services/api/user/type';

import { IHomeBannerListArg } from './homeBanner/types';
import { ISubAdminListArg } from './subAdmin/types';
import { IVideoListArg } from './video/types';

export const userKeys = {
  all: ['user'],
  lists: () => [...userKeys.all, 'list'],
  list: (filters: IUserListReq) => [...userKeys.lists(), { filters }],
  details: () => [...userKeys.all, 'detail'],
  detail: (id: number) => [...userKeys.details(), id]
};

export const categoryKeys = {
  all: ['category'] as const,
  categoryList: (args: ICategoryListReq) => ['category', args],
  categoryView: (args: string | undefined) => ['category', args]
};
export const dashboardKeys = {
  all: ['dashboard'] as const,
  dashboard: () => ['dashboard']
};
export const vendorDutyAnalyticsKeys = {
  all: ['vendorAnalytics'] as const,
  vendorDutyAnalyticsList: (args: ICategoryListReq) => [
    'vendorAnalytics',
    'vendorDutyAnalytics',
    args
  ],
  vendorLeadsAnalyticsList: (args: ICategoryListReq) => [
    'vendorAnalytics',
    'vendorLeadsAnalytics',
    args
  ]
};
export const subCategoryKeys = {
  all: ['subCategory'] as const,
  subCategoryList: (args: ICategoryListReq) => ['subCategory', args],
  subCategoryView: (args: string | undefined) => ['subCategory', 'subCategoryView', args]
};
export const serviceKeys = {
  all: ['service'] as const,
  serviceList: (args: ICategoryListReq) => ['service', args],
  serviceView: (args: string | undefined) => ['service', args]
};
export const subServiceKeys = {
  all: ['subService'] as const,
  subServiceList: (args: ICategoryListReq) => ['subService', args],
  subServiceView: (args: string | undefined) => ['subService', args]
};
export const supportTicketKeys = {
  all: ['supportTicket'] as const,
  supportTicketList: (args: ICategoryListReq) => ['supportTicket', args]
};
export const cityKeys = {
  all: ['city'] as const,
  cityList: (args: ICategoryListReq) => ['city', args],
  cityView: (args: string | undefined) => ['city', args]
};
export const cityAreaKeys = {
  all: ['cityArea'] as const,
  cityAreaList: (args: ICategoryListReq) => ['cityArea', args],
  cityAreaView: (args: string | undefined) => ['cityArea', args]
};
export const cityCategoryKeys = {
  all: ['cityCategory'] as const,
  cityCategoryList: (args: ICategoryListReq) => ['cityCategory', args],
  cityCAtegoryView: (args: string | undefined) => ['cityCategory', args]
};
export const faqKeys = {
  all: ['faq'] as const,
  faqList: (args: ICategoryListReq) => ['faq', args],
  faqView: (args: requestPayloadGetFaq) => ['faq', args]
};
export const contactUsKeys = {
  all: ['contactUs'] as const,
  contactUsList: (args: ICategoryListReq) => ['contactUs', args],
  contactUsView: (args: requestPayloadGetFaq) => ['contactUs', args]
};
export const trainingKeys = {
  all: ['training'] as const,
  trainingList: (args: ICategoryListReq) => ['training', args],
  trainingView: (args: requestPayloadGetFaq) => ['training', args]
};
export const vendorKeys = {
  all: ['vendor'] as const,
  vendorList: (args: ICategoryListReq) => ['vendor', args],
  vendorView: (args: string | undefined) => ['vendorView', args]
};

export const bookingKeys = {
  all: ['booking'] as const,
  bookingList: (args: ICategoryListReq) => ['booking', args],
  bookingView: (args: string | undefined) => ['booking', args],
  bookingStatusUpdate: (data: any) => ['update-booking', data]
};
export const customerKeys = {
  all: ['customer'] as const,
  customerList: (args: ICategoryListReq) => ['customer', args],
  customerView: (args: string | undefined) => ['customer', args]
};
export const reviewKeys = {
  all: ['review'] as const,
  reviewList: (args: ICategoryListReq) => ['review', args],
  reviewView: (args: string | undefined) => ['review', args]
};
export const couponKey = {
  all: ['coupon'] as const,
  couponList: (args: ICategoryListReq) => ['coupon', args],
  couponView: (args: string | undefined) => ['coupon', args]
};
export const vendorPaymentKeys = {
  all: ['vendorPayment'] as const,
  vendorPaymentList: (args: ICategoryListReq) => ['vendorPayment', args],
  vendorPaymentView: (args: string | undefined) => ['vendorPayment', args]
};
export const paymentHistoryKeys = {
  all: ['paymentHistory'] as const,
  paymentHistoryList: (args: ICategoryListReq) => ['paymentHistory', args],
  paymentHistoryView: (args: string | undefined) => ['paymentHistory', args]
};

export const subAdminKeys = {
  all: ['subAdmin'] as const,
  subAdminList: (args: ISubAdminListArg) => ['subAdmin', args],
  subAdminView: (args: string | undefined) => ['subAdmin', args]
};

export const videoKeys = {
  all: ['video'] as const,
  videoList: (args: IVideoListArg) => ['video', args],
  videoView: (args: string | undefined) => ['video', args]
};

export const homeBannerKeys = {
  all: ['homeBanner'] as const,
  homeBannerList: (args: IHomeBannerListArg) => ['homeBanner', args],
  homeBannerView: (args: string | undefined) => ['homeBanner', args]
};
