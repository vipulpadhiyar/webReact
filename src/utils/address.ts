import axios from 'axios';

import {translate as t} from '~/localization';

import {showError} from './toast';
import {getPlaceDetailsFromLatLng} from './urlUtils';

/* This function `getZipCode` retrieves the postal code (zip code) for a given latitude and longitude.
 * It makes an API call to get place details and extracts the postal code from the response.
 * If no postal code is found, it shows an error message.
 */
export async function getZipCode(
  lat: number,
  lon: number,
): Promise<string | null> {
  const url = getPlaceDetailsFromLatLng(lat, lon);
  try {
    /* Making a GET request to the generated URL to get place details. */
    const response = await axios.get(url);
    const data: GeocodeResponse = response.data;
    let pincode: string | null = null;

    /* Looping through the results to find the postal code. */
    for (const result of data.results) {
      for (const component of result.address_components) {
        if (component.types.includes('postal_code')) {
          pincode = component.long_name;
          break;
        }
      }
      if (pincode) {
        break;
      }
    }

    /* If no postal code is found, show an error message. */
    if (!pincode) {
      showError(t('ZIP_CODE_NOT_FOUND'));
    }
    return pincode;
  } catch (error) {
    return null;
  }
}

/* The `generateAddressObj` function creates an address object from detailed address information.
 * It extracts relevant address components such as city, state, country, and postal code.
 * It also handles the case where the postal code is not directly available and retrieves it using the `getZipCode` function.
 */
export const generateAddressObj = async (
  obj: AddressDetailObj,
  description: string,
): Promise<Address> => {
  let updatedAddressData: Address = {
    city: '',
    address: '',
    state: '',
    lat: 0,
    lng: 0,
    country: '',
    pincode: '',
  };

  /* Checking if the address components are available. */
  if (obj?.address_components && obj?.address_components?.length > 0) {
    for (const component of obj.address_components) {
      const types = component.types;

      /* Matching the component types to extract the relevant address information. */
      if (types?.length > 0) {
        if (types.includes('locality')) {
          updatedAddressData.city = component?.long_name ?? '';
        } else if (types.includes('country')) {
          updatedAddressData.country = component?.long_name ?? '';
        } else if (types.includes('administrative_area_level_1')) {
          updatedAddressData.state = component?.long_name ?? '';
        } else if (types.includes('postal_code')) {
          if (component?.short_name) {
            updatedAddressData.pincode = component?.short_name ?? '';
          } else {
            const result = await getZipCode(
              obj?.geometry.location.lat,
              obj?.geometry.location.lng,
            );
            updatedAddressData.pincode = result ?? '';
          }
        } else {
          const result = await getZipCode(
            obj?.geometry.location.lat,
            obj?.geometry.location.lng,
          );
          updatedAddressData.pincode = result ?? '';
        }
      }
    }

    /* Setting the latitude and longitude if available. */
    if (obj?.geometry?.location) {
      updatedAddressData.lat = obj?.geometry?.location?.lat;
      updatedAddressData.lng = obj?.geometry?.location.lng;
    }

    /* Setting the address name. */
    updatedAddressData.address = description ?? obj?.name ?? '';
  }
  return updatedAddressData;
};
