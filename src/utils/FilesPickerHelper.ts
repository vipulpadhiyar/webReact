import {Platform} from 'react-native';
import {
  Asset,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {PERMISSIONS} from 'react-native-permissions';

import {translate} from '~/localization';
import {OpenSettingAlert} from '~/utils';

import {PermissionUtils} from './permissions';

export const commonPickerOption: ImageLibraryOptions = {
  mediaType: 'photo',
  quality: 0.8,
  includeBase64: Platform.OS === 'android',
};

/*
 * Defines default options for selecting images from the gallery
 */
export const selectImageFromGallery = (
  options: ImageLibraryOptions,
): Promise<FileType[]> => {
  return new Promise(async (resolve, reject) => {
    const hasPhotoPermission = await checkPhotoPermission();
    if (hasPhotoPermission) {
      const result: ImagePickerResponse = await launchImageLibrary({
        ...commonPickerOption,
        ...options,
      });
      if (result?.assets && result.assets.length > 0) {
        const fileList: FileType[] = result.assets.map((item: Asset) => {
          const file: FileType = {
            ...item,
            uri:
              Platform.OS === 'ios'
                ? String(item?.uri).replace('file://', '') ?? ''
                : item?.uri ?? '',
            type: item?.type ?? '',
            name: item?.fileName ?? '',
          };
          return file;
        });
        if (fileList && fileList.length > 0) {
          resolve(fileList);
        } else {
          reject(new Error('No image selected'));
        }
      } else {
        reject(new Error('No image selected'));
      }
    } else {
      reject(new Error('No image selected'));
      OpenSettingAlert(translate('RequiurePhotoAccess'));
    }
  });
};

/*
 * Allows selection of images from the device gallery
 */
export const captureImageFromCamera = (
  options: ImageLibraryOptions,
): Promise<FileType[]> => {
  return new Promise(async (resolve, reject) => {
    const hasCameraPermission = await checkCameraPermission();
    if (hasCameraPermission) {
      const result: ImagePickerResponse = await launchCamera({
        ...commonPickerOption,
        ...options,
      });
      if (result?.assets && result.assets.length > 0) {
        const fileList: FileType[] = result.assets.map((item: Asset) => {
          const file: FileType = {
            ...item,
            uri:
              Platform.OS === 'ios'
                ? String(item?.uri).replace('file://', '') ?? ''
                : item?.uri ?? '',
            type: item?.type ?? '',
            name: item?.fileName ?? '',
          };
          return file;
        });
        if (fileList && fileList.length > 0) {
          resolve(fileList);
        } else {
          reject(new Error('No image selected'));
        }
      } else {
        reject(new Error('No image selected'));
      }
    } else {
      reject(new Error('No image selected'));
      OpenSettingAlert(translate('RequiureCameraAccess'));
    }
  });
};

/*
 *Checks camera permission and returns a boolean indicating if it's granted
 */
const checkCameraPermission = async (): Promise<boolean> => {
  const cameraPermission = await PermissionUtils.requestSinglePermissionHandler(
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.CAMERA
      : PERMISSIONS.IOS.CAMERA,
  );
  return cameraPermission;
};
/*
 *Checks photo permission and returns a boolean indicating if it's granted
 */
const checkPhotoPermission = async (): Promise<boolean> => {
  const cameraPermission = await PermissionUtils.requestSinglePermissionHandler(
    Platform.OS === 'android'
      ? Platform.Version <= 30
        ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
      : PERMISSIONS.IOS.PHOTO_LIBRARY,
  );
  return cameraPermission;
};
