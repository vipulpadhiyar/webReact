import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

/**
 * The function `getAndroidApiLevel` returns the Android API level as a number.
 * @returns The function `getAndroidApiLevel` returns the Android API level as a number. If
 * `Platform.Version` is a string, it converts it to a number using the unary plus operator (`+`).
 * Otherwise, it returns `Platform.Version` as is.
 */
const getAndroidApiLevel = (): number => {
  return typeof Platform.Version === 'string'
    ? +Platform.Version
    : Platform.Version;
};

/**
 * The function `getDeviceId` returns the device ID using DeviceInfo or 'not found' if not available.
 * @returns The function `getDeviceId` is returning the device ID obtained from
 * `DeviceInfo.getDeviceId()`. If the device ID is not found, it will return the string 'not found'.
 */
const getDeviceId = (): string => {
  return DeviceInfo.getDeviceId() ?? 'not found';
};

export const DeviceUtils = {
  getAndroidApiLevel,
  getDeviceId,
};
