import {useMutation} from '@tanstack/react-query';

import {MutationQueryKeys, QueryKeys} from '~/constants';
import {
  getAddressDetailByPlaceId,
  getAutoCompleteAddress,
} from '~/service/locationService';

/**
 * useAutoCompleteAddressListApiAction custom hook for fetching autocomplete address list.
 *
 * @param {string} text - The input text to query the address list.
 * @returns {object} - The result of the useQuery hook which includes the data, status, and other properties.
 */
export const useAutoCompleteAddressListApiAction = () =>
  useMutation({
    mutationKey: [QueryKeys.getAutoCompleteAddressList],
    mutationFn: (text: string) => getAutoCompleteAddress(text),
    retry: false,
  });

/**
 * useAddressDetailByPlaceIdApiAction custom hook for fetching autocomplete address list.
 *
 * @param {string} text - The input text to useMutation the address list.
 * @returns {object} - The result of the mutationKey hook which includes the data, status, and other properties.
 */
export const useAddressDetailByPlaceIdApiAction = () =>
  useMutation({
    mutationKey: [MutationQueryKeys.addressDetailMutate],
    mutationFn: (placeId: string) => getAddressDetailByPlaceId(placeId),
    networkMode: 'always',
    retry: false,
  });
