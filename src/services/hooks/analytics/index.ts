import { analyticsApi } from 'services/api/analytics';
import { ICategoryListReq } from 'services/api/category/type';

import { duration } from 'utils/constants';

import useFetch from '..';
import { vendorDutyAnalyticsKeys } from '../queryKeys';

export const useVendorDutyAnalyticsList = (args: ICategoryListReq) => {
  return useFetch({
    queryKey: vendorDutyAnalyticsKeys.vendorDutyAnalyticsList(args),
    apiFunction: () => analyticsApi.getVendorDutyAnalytics(args),
    queryOptions: { staleTime: duration.time_five_minit }
  });
};

export const useVendorLeadsAnalyticsList = (args: ICategoryListReq) => {
  return useFetch({
    queryKey: vendorDutyAnalyticsKeys.vendorLeadsAnalyticsList(args),
    apiFunction: () => analyticsApi.getVendorLeadsAnalytics(args),
    queryOptions: { staleTime: duration.time_five_minit }
  });
};
