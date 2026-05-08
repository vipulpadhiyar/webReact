import { paymentHistoryApi } from 'services/api/paymentHistory';

import { duration } from 'utils/constants';

import useFetch from '..';
import { paymentHistoryKeys } from '../queryKeys';

export const usePaymentHistoryList = (args: any) => {
  return useFetch({
    queryKey: paymentHistoryKeys.paymentHistoryList(args),
    apiFunction: () => paymentHistoryApi.getPaymentHistoryList(args),
    queryOptions: { staleTime: duration.time_five_minit }
  });
};
export const usePaymentHistoryView = (_id: string | undefined) => {
  return useFetch({
    queryKey: paymentHistoryKeys.paymentHistoryView(_id),
    apiFunction: () => paymentHistoryApi.getPaymentHistoryView(_id),
    queryOptions: { staleTime: 0 }
  });
};
