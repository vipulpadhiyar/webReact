import {useInfiniteQuery, useMutation, useQuery} from '@tanstack/react-query';

import {MutationQueryKeys, QueryKeys} from '~/constants';
import {
  acceptQuotationRequest,
  declineAllQuotationRequest,
  declineQuotationRequest,
  getQuetosDeclineListApi,
  getQuetosDetailsApi,
  getQuetosListApi,
  getQuetosReceivedListApi,
  reSubmitQuotationRequest,
} from '~/service/quetos';
import {getNextPageParamUtilForPagination} from '~/utils';

/* *
 * Custom hook to fetch quetos list with infinite scrolling support
 *
 * @param {boolean} enabled - Flag to enable or disable the query
 * @returns {UseInfiniteQueryResult<QuetosListResponse>} - The result of the useInfiniteQuery hook
 * */
export const useGetQuetosListApiAction = (
  enabled: boolean,
  searchText: string,
) =>
  useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [QueryKeys.quetosListPending, searchText], // Include searchText in the queryKey
    queryFn: ({pageParam = 1}) =>
      getQuetosListApi({pageParam, search: searchText}),
    getNextPageParam: getNextPageParamUtilForPagination,
    enabled: enabled,
    retry: false,
  });
/* *
 * Custom hook to fetch quetos list with infinite scrolling support
 *
 * @param {boolean} enabled - Flag to enable or disable the query
 * @returns {UseInfiniteQueryResult<QuetosListResponse>} - The result of the useInfiniteQuery hook
 * */
export const useGetQuetosListDeclineApiAction = (
  enabled: boolean,
  searchText: string,
) =>
  useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [QueryKeys.quetosListDecline, searchText],
    queryFn: ({pageParam = 1}) =>
      getQuetosDeclineListApi({pageParam, search: searchText}),
    getNextPageParam: getNextPageParamUtilForPagination,
    enabled: enabled,
    retry: false,
  });
/* *
 * Custom hook to fetch quetos list with infinite scrolling support
 *
 * @param {boolean} enabled - Flag to enable or disable the query
 * @returns {UseInfiniteQueryResult<QuetosListResponse>} - The result of the useInfiniteQuery hook
 * */
export const useGetQuetosListReceivedApiAction = (
  enabled: boolean,
  searchText: string,
) =>
  useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [QueryKeys.quetosListReceived, searchText],
    queryFn: ({pageParam = 1}) =>
      getQuetosReceivedListApi({pageParam, search: searchText}),
    getNextPageParam: getNextPageParamUtilForPagination,
    enabled: enabled,
    retry: false,
  });

/**
 * The function `useQuetosDetailsApiAction` is a TypeScript function that uses a query to fetch details
 * for a specific quote based on the provided ID.
 */
export const useQuetosDetailsApiAction = (
  id: string,
  enabled: boolean = true,
) =>
  useQuery({
    queryKey: [QueryKeys.quetosDetails, id],
    queryFn: () => getQuetosDetailsApi({_id: id}),
    retry: false,
    enabled: enabled,
  });

/**
 * The useDeleteBookingRequest function is a custom hook that handles a mutation request to delete a
 * booking.
 */
export const useAcceptQuotationRequest = () =>
  useMutation({
    mutationKey: [MutationQueryKeys.acceptQuotation],
    mutationFn: (param: IQuetosDetailReq) => acceptQuotationRequest(param),
    networkMode: 'always',
    retry: false,
  });
/**
 * The useDeleteBookingRequest function is a custom hook that handles a mutation request to delete a
 * booking.
 */
export const useDeclineQuotationRequest = () =>
  useMutation({
    mutationKey: [MutationQueryKeys.rejectQuotation],
    mutationFn: (param: IQuetosDetailReq) => declineQuotationRequest(param),
    networkMode: 'always',
    retry: false,
  });
/**
 * The useDeclineQuotationRequest function is a TypeScript hook that handles a mutation to decline a
 * quotation request.
 */
export const useDeclineAllQuotationRequest = () =>
  useMutation({
    mutationKey: [MutationQueryKeys.rejectAllQuotation],
    mutationFn: (param: IQuetosDetailReq) => declineAllQuotationRequest(param),
    networkMode: 'always',
    retry: false,
  });
/**
 * The useReSubmitQuotationRequest function is a TypeScript hook that handles a mutation to decline a
 * quotation request.
 */
export const useReSubmitQuotationRequest = () =>
  useMutation({
    mutationKey: [MutationQueryKeys.rejectAllQuotation],
    mutationFn: (param: IQuetosDetailReq) => reSubmitQuotationRequest(param),
    networkMode: 'always',
    retry: false,
  });
