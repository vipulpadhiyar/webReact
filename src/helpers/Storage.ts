import {MMKV} from 'react-native-mmkv';

import {AppEnvironment, AppStorageKeys} from '~/constants';

/* This code snippet is creating a new instance of the `MMKV` class from the `react-native-mmkv`
library and exporting it as `storage`. The `MMKV` class is used for key-value storage in React
Native applications. */
export const storage = new MMKV({
  id: AppEnvironment.secure.storage_id,
  encryptionKey: AppEnvironment.secure.storage_key,
});

/**
 * The function `getAccessToken` retrieves the access token from storage in TypeScript.
 * @returns The `getAccessToken` function is returning a string or `undefined`.
 */
const getAccessToken = (): string | undefined => {
  return storage.getString(AppStorageKeys.ACCESS_TOKEN);
};

/**
 * The function `getDeviceToken` retrieves the device token from storage, returning it as a string or
 * undefined.
 * @returns The `getDeviceToken` function is returning a string value or `undefined`.
 */
const getDeviceToken = (): string | undefined => {
  return storage.getString(AppStorageKeys.DEVICE_TOKEN);
};

/**
 * The function `getUserData` retrieves user data from storage and returns it as a `LoginResponseType`
 * object or `null`.
 * @returns The `getUserData` function returns either a `LoginResponseType` object or `null`.
 */
const getUserData = (): SignInResponseType | UserProfileResponse | null => {
  const userData = storage.getString(AppStorageKeys.USER_DATA);
  if (userData) {
    return JSON.parse(userData);
  }
  return null;
};

/**
 * The function `setAccessToken` stores a given string value in the app storage using a specific key.
 * @param {string} value - A string value that represents the access token to be set.
 */
const setAccessToken = (value: string) => {
  storage.set(AppStorageKeys.ACCESS_TOKEN, value);
};

/**
 * The function `setDeviceToken` stores a device token value in the storage using a specific key.
 * @param {string} value - The `value` parameter in the `setDeviceToken` function is a string that
 * represents the device token that you want to store in the app's storage.
 */
const setDeviceToken = (value: string) => {
  storage.set(AppStorageKeys.DEVICE_TOKEN, value);
};

/**
 * The function `setUserData` stores the user data in local storage after converting it to a JSON
 * string.
 * @param {LoginResponseType} value - The `value` parameter in the `setUserData` function is of type
 * `LoginResponseType`, which is the type of data that will be stored in the user data.
 */
const setUserData = (
  value: SignInResponseType | SignUpResponseType | UserProfileResponse,
) => {
  storage.set(AppStorageKeys.USER_DATA, JSON.stringify(value));
};

/**
 * The function `setLoginData` stores the login data in local storage after converting it to a JSON
 * string.
 * @param {SignInFormParamsType} value - The `value` parameter in the `setLoginData` function is of
 * type `SignInFormParamsType`, which is used to store the login data in the application storage.
 */

const setLoginData = (value: SignInFormParamsType) => {
  storage.set(AppStorageKeys.LOGIN_DATA, JSON.stringify(value));
};

/**
 * The function `getLoginData` retrieves and parses login data stored in the app storage.
 * @returns The `getLoginData` function returns the parsed JSON data stored in the `loginData` variable
 * if it exists, otherwise it returns `null`.
 */
const getLoginData = () => {
  const loginData = storage.getString(AppStorageKeys.LOGIN_DATA);
  if (loginData) {
    return JSON.parse(loginData);
  }
  return null;
};

/**
 * The function `clearStorage` clears all items from the storage.
 */
const clearStorage = () => {
  storage.clearAll();
};

export const Storage = {
  getAccessToken,
  getDeviceToken,
  getUserData,
  setAccessToken,
  setDeviceToken,
  setUserData,
  setLoginData,
  getLoginData,
  clearStorage,
};
