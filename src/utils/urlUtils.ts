import {AppEnvironment, GOOGLE_PLACES_ENDPOINTS} from '~/constants';

/*
 * Generates a Google Places autocomplete URL based on the input text.
 */
export const getPlaceAutoCompleteUrl = (text: string) => {
  // return `${GOOGLE_PLACES_ENDPOINTS.autoComplete}?input=${text}&key=${AppEnvironment.map_api_key}&language=en&components=country:us`;
  return `${GOOGLE_PLACES_ENDPOINTS.autoComplete}?input=${text}&key=${AppEnvironment.map_api_key}&language=en`;
};
/* This function `getPlaceDetailsUrl` generates a URL to fetch details of a place using its place ID.
 * It constructs the URL using the Google Places API endpoint for details, API key, place ID, and language parameter.
 */
export const getPlaceDetailsUrl = (placeId: string) => {
  return `${GOOGLE_PLACES_ENDPOINTS.details}?key=${AppEnvironment.map_api_key}&placeid=${placeId}&language=en`;
};

/* This function `getPlaceDetailsFromLatLng` generates a URL to fetch place details based on latitude and longitude.
 * It constructs the URL using the Google Places API endpoint for location-based address retrieval,
 * API key, latitude, and longitude parameters.
 */
export const getPlaceDetailsFromLatLng = (lat: number, lng: number) => {
  return `${GOOGLE_PLACES_ENDPOINTS.locationAddress}?latlng=${lat},${lng}&key=${AppEnvironment.map_api_key}`;
};
