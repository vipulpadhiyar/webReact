import axios, {InternalAxiosRequestConfig} from 'axios';

import {AppEnvironment} from '~/constants';
import {processDecryption, processEncryption} from '~/encryption';
import {logoutNavigation, Storage} from '~/helpers';
import {translate} from '~/localization';
import {isResponseSuccess, log} from '~/utils';

const encryptionOn = AppEnvironment.secure.encryption_on;

type EncryptedRequestType = {
  encoded: string;
};

/**
 * Bypass from encrypted requests
 */
const bypassUrl: string[] = [];

/**
 * Created axios instance to make API call
 */
export const api = axios.create({
  baseURL: AppEnvironment.secure.base_url,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/**
 * Handle axios request
 */
api.interceptors.request.use(request => {
  const token = Storage.getAccessToken();
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  } else {
    request.headers.Authorization = '';
  }
  log(
    `API request -> ${request.url}`,
    'request',
    JSON.stringify(request),
    'data',
    request.data,
    token,
  );
  // Encrypt the request payload if request method is not get
  if (shouldRequestEncrypt(request)) {
    // Encrypt the request data and get encrypted string.
    const encryptedRequestString = processEncryption(
      JSON.stringify(request.data),
    );

    // Make encrypted request object.
    const encryptedRequest: EncryptedRequestType = {
      encoded: encryptedRequestString,
    };

    log('Interceptor encrypted request :-', encryptedRequest);

    // Set encrypted request object to request data.
    request.data = encryptedRequest;
  }

  return request;
});

/**
 * Handle axios response and error
 */
api.interceptors.response.use(
  response => {
    log(
      `API Response -> ${response.config.url}`,
      JSON.stringify(response.data),
    );

    if (encryptionOn === 'true') {
      const data = response.data;
      const innerData = data.data;

      // Decrypt the response.
      const processedData = processDecryption(innerData);

      // Assign the decrypted response to instance.
      response.data.data = JSON.parse(processedData);
    }

    return response;
  },
  async error => {
    // Got error.
    log(`API Error -> ${error.config.url}`, JSON.stringify(error));
    const status: number = error?.response?.status;
    if (!isResponseSuccess(status)) {
      return await handleServerErrors(error);
    }
    return await Promise.reject(parseServerErrorText(error));
  },
);

/**
 * Handle server errors.
 *
 * @param {any} error - HTTP error from the api response.
 * @returns
 */
const handleServerErrors = async (error: any): Promise<Error> => {
  const status = error?.response?.status;
  switch (status) {
    /* In the code snippet provided, the `case 401:` block is handling a specific HTTP status code of 401
which corresponds to the "Unauthorized" error. */
    case 401:
      logoutNavigation();
      return await Promise.reject(parseServerErrorText(error));
    /* The `case 403:` block in the `handleServerErrors` function is handling a specific HTTP status
   code of 403, which corresponds to the "Forbidden" error. */
    case 403:
      logoutNavigation();
      return await Promise.reject(parseServerErrorText(error));

    // If status code is 502 then it would be the bad gateway error
    case 502:
      return await Promise.reject(translate('bad_gateway_error'));

    // If none of above then simply throw the error which we got.
    default:
      return await Promise.reject(parseServerErrorText(error));
  }
};

const parseServerErrorText = (error: any): string => {
  log('parseServerErrorText', error);
  return error?.response?.data.message || error?.message;
};

/**
 * Should request encrypt
 * @param {InternalAxiosRequestConfig<any>} request - Request
 * @returns - Flag that request should encrypt.
 */
const shouldRequestEncrypt = (request: InternalAxiosRequestConfig<any>) => {
  return (
    request.method !== 'get' &&
    encryptionOn === 'true' &&
    !bypassUrl.includes(request.url ?? '')
  );
};
