import {useMutation, UseMutationOptions} from '@tanstack/react-query';

import {MutationQueryKeys} from '~/constants';
import {getHorseListForTrip} from '~/service/horse';
import {
  cancelTripApi,
  createFeedback,
  createTripAPI,
  editTripAPI,
  getTripDetailsApi,
  getTripListApi,
} from '~/service/trip';

/* The `useCreateTripApiAction` hook is a custom hook that uses the `useMutation` hook from React Query
 * to handle the mutation for creating a trip. It takes an optional parameter `options` that can be
 * used to configure the mutation.
 */
export const useCreateTripApiAction = (
  options?: UseMutationOptions<
    any | undefined,
    Error,
    CreateTripRequest,
    unknown
  >,
) =>
  useMutation({
    mutationKey: [MutationQueryKeys.createTripMutate],
    mutationFn: (param: CreateTripRequest) => createTripAPI(param),
    networkMode: 'always',
    ...options,
  });
/* The `useEditTripApiAction` hook is a custom hook that uses the `useMutation` hook from React Query
 * to handle the mutation for creating a trip. It takes an optional parameter `options` that can be
 * used to configure the mutation.
 */
export const useEditTripApiAction = (
  options?: UseMutationOptions<
    any | undefined,
    Error,
    CreateTripRequest,
    unknown
  >,
) =>
  useMutation({
    mutationKey: [MutationQueryKeys.editTripRequest],
    mutationFn: (param: CreateTripRequest) => editTripAPI(param),
    networkMode: 'always',
    ...options,
  });
/**
 *  @description API calls for trip list
 *  @function useListTripApiAction
 *  @param {TripListRequestType} param - The parameter for trip list API.
 *  @returns {Promise<TripListResponseType | undefined>} - The response from the API call.
 *
 */
export const useListTripApiAction = (
  options?: UseMutationOptions<
    TripListResponseType | undefined,
    Error,
    TripListRequestType,
    unknown
  >,
) =>
  useMutation({
    mutationKey: [MutationQueryKeys.getTrips],
    mutationFn: (param: TripListRequestType) => getTripListApi(param),
    networkMode: 'always',
    ...options,
  });

/**
 *  @description API calls for trip details
 *  @function useTripDetailApiAction
 *  @param {TripDetailRequestType} param - The parameter for trip details API.
 *  @returns {Promise<TripDetailResponseType | undefined>} - The response from the API call.
 *
 */
export const useTripDetailApiAction = (
  options?: UseMutationOptions<
    TripDetailResponseType | undefined,
    Error,
    TripDetailRequestType,
    unknown
  >,
) =>
  useMutation({
    mutationKey: [MutationQueryKeys.getTrips],
    mutationFn: (param: TripDetailRequestType) => getTripDetailsApi(param),
    networkMode: 'always',
    ...options,
  });
/**
 *  @description API calls for cancel trip
 *  @function useCancelTripApiAction
 *  @param {TripCancelRequestType} param - The parameter for cancel trip API.
 *  @returns {Promise<TripDetailResponseType | undefined>} - The response from the API call.
 *
 */
export const useCancelTripApiAction = (
  options?: UseMutationOptions<
    TripDetailResponseType | undefined,
    Error,
    TripCancelRequestType,
    unknown
  >,
) =>
  useMutation({
    mutationKey: [MutationQueryKeys.getTrips],
    mutationFn: (param: TripDetailRequestType) => cancelTripApi(param),
    networkMode: 'always',
    ...options,
  });

/**
 * Custom hook for performing a mutation to create feedback.
 *
 * @returns {UseMutationResult} - React Query's `UseMutationResult` object containing mutation state and functions.
 *
 * The hook uses the `useMutation` hook from React Query to handle the mutation logic.
 * It performs the `createFeedback` operation with the provided parameters and manages the mutation state.
 *
 * - `mutationKey` is used to uniquely identify the mutation for cache and query invalidation purposes.
 * - `mutationFn` specifies the function to be called for the mutation, in this case, `createFeedback`.
 * - `networkMode` is set to 'always', ensuring the mutation always performs a network request.
 */
export const useFeedbackApiAction = () =>
  useMutation({
    mutationKey: [MutationQueryKeys.getTrips],
    mutationFn: (param: CreateFeedbackRequest) => createFeedback(param),
    networkMode: 'always',
  });

/**
 * The function `useHorseListForTripApiAction` returns a hook for making a mutation request to fetch a
 * list of horses for a trip.
 */
export const useHorseListForTripApiAction = () =>
  useMutation({
    mutationKey: [MutationQueryKeys.HorseListForTrip], // Adjust this key according to your needs
    mutationFn: getHorseListForTrip,
    networkMode: 'always',
  });
