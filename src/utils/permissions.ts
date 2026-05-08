import {
  check,
  type Permission,
  request,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';

import {log} from './common';

/**
 * The function `requestHandler` is an asynchronous function that takes a `permission` parameter of
 * type `Permission` and returns a promise that resolves to a boolean value indicating whether the
 * permission was granted or not.
 * @param {Permission} permission - The `permission` parameter is of type `Permission`. It represents
 * the permission that is being requested.
 * @returns The function `requestHandler` returns a boolean value.
 */
const requestHandler = async (permission: Permission): Promise<boolean> => {
  let CheckFlag = false;
  try {
    const result = await request(permission);
    if (result === RESULTS.LIMITED || result === RESULTS.GRANTED) {
      CheckFlag = true;
    }
  } catch (err) {
    log('Error in Request :- ', err);
  }
  return CheckFlag;
};

/**
 * The function `requestSinglePermissionHandler` is an asynchronous function that checks the status of
 * a permission and handles the request for that permission if necessary.
 * @param {Permission} Permission - The `Permission` parameter is the permission that you want to
 * request or check. It is of type `Permission`, which is likely an enum or a string representing a
 * specific permission.
 * @returns a boolean value.
 */
const requestSinglePermissionHandler = async (
  Permission: Permission,
): Promise<boolean> => {
  let CheckFlag = false;
  await check(Permission)
    .then(async result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          CheckFlag = await requestHandler(Permission);
          break;
        case RESULTS.DENIED:
          CheckFlag = await requestHandler(Permission);
          break;
        case RESULTS.LIMITED:
          CheckFlag = true;
          break;
        case RESULTS.GRANTED:
          CheckFlag = true;
          break;
        case RESULTS.BLOCKED:
          CheckFlag = await requestHandler(Permission);
          break;
      }
    })
    .catch((error: Error) => {
      log('Error in check Permission : ', error.message);
    });
  return CheckFlag;
};

const requestMultiplePermissionHandler = async (
  Permissions: Permission[],
): Promise<MultiplePermissionResType[]> => {
  const response = await requestMultiple(Permissions);
  return Permissions.map(obj => {
    return {
      Permission: Object.keys(response).find(
        key => key === obj,
      ) as LibPermissionType,
      status:
        response[obj] === RESULTS.GRANTED || response[obj] === RESULTS.LIMITED,
    };
  });
};

export const PermissionUtils = {
  requestMultiplePermissionHandler,
  requestSinglePermissionHandler,
};
