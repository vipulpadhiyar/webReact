import axios from 'axios';

import {translate as t} from '~/localization';
import {isHttpsStatusOk} from '~/utils';
import {getPlaceAutoCompleteUrl, getPlaceDetailsUrl} from '~/utils/urlUtils';
/*
 * use for getting location address autocomplete suggestion based on search text.
 */
export const getAutoCompleteAddress = async (
  text: string,
): Promise<Prediction[]> => {
  try {
    const requestUrl = getPlaceAutoCompleteUrl(text);
    const response = await axios.post<AutoCompleteResponseType>(requestUrl);
    if (isHttpsStatusOk(response?.data?.status)) {
      return response.data?.predictions ?? [];
    } else {
      throw new Error(response?.data?.error_message);
    }
  } catch (err: any) {
    throw new Error(err?.message ?? t('SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN'));
  }
};

/*
 * use for getting location address detail using placeId.
 */
export const getAddressDetailByPlaceId = async (
  placeId: string,
): Promise<AddressDetailObj | undefined> => {
  try {
    const requestUrl = getPlaceDetailsUrl(placeId);
    const response = await axios.post<AddressDetailsResponseType>(requestUrl);
    if (isHttpsStatusOk(response?.data?.status)) {
      return response?.data?.result;
    } else {
      throw new Error(response?.data?.error_message);
    }
  } catch (err: any) {
    throw new Error(err?.message ?? t('SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN'));
  }
};
