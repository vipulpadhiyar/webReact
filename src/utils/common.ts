import {Alert, Linking} from 'react-native';

import {AppConstants, AppEnvironment} from '~/constants';
import {Bucket} from '~/enums/fileUpload';
import {translate as t} from '~/localization';

import {showError} from './toast';

/**
 * The function `isDev` returns a boolean value indicating whether the code is running in a development
 * environment.
 * @returns A boolean value representing whether the code is running in a development environment or
 * not.
 */
export const isDev = (): boolean => {
  return __DEV__;
};

/**
 * The function `isJest` checks if the environment is set to 'test' for Jest testing in TypeScript.
 * @returns The function `isJest` returns a boolean value indicating whether the environment variable
 * `NODE_ENV` is set to `'test'`.
 */
export const isJest = (): boolean => {
  return process.env.NODE_ENV === 'test';
};

/**
 * The `log` function logs a message and an optional value to the console if the environment is in
 * development mode.
 * @param {any} [message] - The `message` parameter is a string or any value that you want to log to
 * the console. It is optional, so you can choose to provide it or not when calling the `log` function.
 * @param {any} [value] - The `value` parameter in the `log` function is an optional parameter that
 * represents the value you want to log along with the message. If provided, it will be displayed in
 * the console output. If not provided, an empty string will be displayed instead.
 */
export const log = (message?: any, ...optionalParams: any[]) => {
  if (isDev()) {
    console.log(message, ...optionalParams);
  }
};

/**
 * This util function is to display error log if the environment is in development mode.
 * @param {string} message - The `message` parameter is a string or any value that you want to log to
 * the console. It is optional, so you can choose to provide it or not when calling the `log` function.
 * @param {any[]} [optionalParams] - The `value` parameter in the `log` function is an optional parameter that
 * represents the value you want to log along with the message. If provided, it will be displayed in
 * the console output. If not provided, an empty string will be displayed instead.
 */
export const errorLog = (message?: any, ...optionalParams: any[]) => {
  if (isDev()) {
    console.error(message, ...optionalParams);
  }
};

/**
 * The function `noInternetAlert` displays a snackbar message prompting the user to check their
 * internet connection.
 */
export const noInternetAlert = () => {
  showError(t('PLEASE_CHECK_YOUR_INTERNET_CONNECTION'));
};

/**
 * The `keyExtractorHandler` function returns the index as a string for use as a key in a list.
 * @param {any} _ - The underscore (_) parameter in the keyExtractorHandler function is a placeholder
 * for the item being processed in the list. It is a convention in some programming languages to use an
 * underscore as a placeholder for unused variables or parameters. In this case, the item itself is not
 * being used in the key extraction logic,
 * @param {number} index - The `index` parameter represents the index of the item being processed in an
 * array or list. It is a numeric value indicating the position of the item within the array.
 * @returns The `index` converted to a string value is being returned.
 */
export const keyExtractorHandler = (_: any, index: number): string => {
  return index?.toString();
};

/**
 * The function `openSettings` is an asynchronous function that opens the settings page.
 */
export const openSettings = async (): Promise<void> => {
  await Linking.openSettings();
};

/**
 * The function `OpenSettingAlert` displays an alert with a message and two buttons, one for canceling
 * and one for opening the settings.
 * @param {string} type - The `type` parameter is a string that represents the type of permission that
 * the user needs to allow. It is used to customize the alert message displayed to the user.
 */
export const OpenSettingAlert = async (message: string): Promise<void> => {
  Alert.alert(t('AllowPermission'), message, [
    {
      text: 'Cancel',
      onPress: () => {},
      style: 'cancel',
    },
    {
      text: 'Settings',
      onPress: openSettings,
      style: 'default',
    },
  ]);
};

/**
 * The function `isResponseSuccess` checks if a given status code indicates a successful response (200
 * or 201).
 * @param {number} statusCode - The `statusCode` parameter in the `isResponseSuccess` function is a
 * number that represents the HTTP status code of a response. The function checks if the status code is
 * either 200 or 201, which are commonly used to indicate a successful response. If the status code is
 * 200 or
 * @returns The function `isResponseSuccess` returns a boolean value - `true` if the `statusCode` is
 * 200 or 201, and `false` otherwise.
 */
export const isResponseSuccess = (statusCode: number) => {
  if (statusCode === 200 || statusCode === 201) {
    return true;
  } else {
    return false;
  }
};

/**
 * The `openCall` function in TypeScript is used to initiate a phone call with a specified mobile
 * number based on the platform OS.
 * @param {string} mobileNumber - The `mobileNumber` parameter is a string that represents the phone
 * number that the user wants to call.
 */
export const openCall = async (mobileNumber: string) => {
  let updatedMobileString = '';
  if (AppConstants.PLATFORM_OS === 'android') {
    updatedMobileString = `tel:${mobileNumber}`;
  } else {
    updatedMobileString = `telprompt:${mobileNumber}`;
  }
  try {
    await Linking.openURL(updatedMobileString);
  } catch (err) {
    log('Error :- ', err);
    showError(JSON.stringify(err));
  }
};

/**
 * The function `openUrl` in TypeScript ensures that a given URL starts with 'http://' or 'https://'
 * and then attempts to open the URL using `Linking.openURL`, handling any errors by logging and
 * showing a snackbar message.
 * @param {string} url - The `url` parameter is a string that represents the URL that you want to open.
 * The function `openUrl` takes this URL as input and ensures that it starts with either 'http://' or
 * 'https://'. If the URL doesn't start with these protocols, it appends 'https://'
 */
export const openUrl = async (url: string) => {
  let tempUrl = url;
  if (!(tempUrl?.startsWith('http://') || tempUrl?.startsWith('https://'))) {
    tempUrl = `https://${tempUrl}`;
  }
  try {
    await Linking.openURL(tempUrl);
  } catch (err) {
    log('Error :- ', err);
    showError(JSON.stringify(err));
  }
};

/**
 * The function `isFalsyValue` checks if a given parameter is a falsy value in TypeScript.
 * @param {any} param - The `isFalsyValue` function checks if the `param` passed to it is a falsy
 * value. It returns `true` if the `param` is `null`, `undefined`, `false`, an empty string `''`, or
 * the number `0`.
 * @returns The function `isFalsyValue` returns a boolean value indicating whether the input parameter
 * `param` is a falsy value.
 */
export const isFalsyValue = (param: any): boolean => {
  return (
    param === null ||
    param === undefined ||
    param === false ||
    param === '' ||
    param === 0
  );
};

/*
 * Function to check if the HTTPS status is 'OK'.
 */
export const isHttpsStatusOk = (status: string) => status === 'OK';

/**
 * Function to capitalize the first letter of each word in a string
 *
 * @param {string} text - The input text to be capitalized
 * @returns {string} - The capitalized text
 */
export const capitalizeFirstLetter = (text: string) => {
  if (!text) {
    return '';
  }

  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
/**
 *
 * @param uri
 * @param bucket
 * @description This function is used to complete the url of the image
 * @example completeUrl('image.png', Bucket.USER) => https://example.com/user/image.png
 * @returns
 */
export const completeUrl = (uri: string, bucket: Bucket) => {
  if (uri.startsWith('http')) {
    return uri;
  } else {
    let mediaUrl = AppEnvironment.secure.media_url;
    let url = mediaUrl + bucket + '/' + uri;
    return url;
  }
};
