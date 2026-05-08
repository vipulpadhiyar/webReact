import {Platform} from 'react-native';
import {
  Asset,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {PERMISSIONS} from 'react-native-permissions';

import {translate} from '~/localization';

import {PermissionUtils} from './permissions';

const checkCameraPermission = async (): Promise<boolean> => {
  const cameraPermission = await PermissionUtils.requestSinglePermissionHandler(
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.CAMERA
      : PERMISSIONS.IOS.CAMERA,
  );
  return cameraPermission;
};

const commonPickerOption: ImageLibraryOptions = {
  mediaType: 'mixed',
  selectionLimit: 1,
};

const launchLibraryUtil = (
  options?: ImageLibraryOptions,
): Promise<FileType[]> => {
  return new Promise((resolve, reject) => {
    launchImageLibrary({
      ...commonPickerOption,
      ...options,
    })
      .then(result => {
        if (result?.assets && result.assets.length > 0) {
          const fileList: FileType[] = result.assets.map((item: Asset) => {
            const file: FileType = {
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
            reject(new Error('no image selected'));
          }
        } else {
          reject(new Error(translate('no image selected')));
        }
      })
      .catch((err: any) => {
        reject(new Error(err?.message ?? JSON.stringify(err)));
      });
  });
};

const launchCameraUtil = (
  options?: ImageLibraryOptions,
): Promise<FileType[]> => {
  return new Promise((resolve, reject) => {
    checkCameraPermission()
      .then(hasCameraPermission => {
        if (hasCameraPermission) {
          launchCamera({
            ...commonPickerOption,
            ...options,
          })
            .then(result => {
              if (result?.assets && result.assets.length > 0) {
                const fileList: FileType[] = result.assets.map(
                  (item: Asset) => {
                    const file: FileType = {
                      uri:
                        Platform.OS === 'ios'
                          ? String(item?.uri).replace('file://', '') ?? ''
                          : item?.uri ?? '',
                      type: item?.type ?? '',
                      name: item?.fileName ?? '',
                    };
                    return file;
                  },
                );
                if (fileList && fileList.length > 0) {
                  resolve(fileList);
                } else {
                  reject(new Error(translate('no image selected')));
                }
              } else {
                reject(new Error(translate('no image selected')));
              }
            })
            .catch((err: any) => {
              reject(new Error(err?.message ?? JSON.stringify(err)));
            });
        } else {
          reject(new Error(translate('permission denied')));
        }
      })
      .catch((err: any) => {
        reject(new Error(err?.message ?? JSON.stringify(err)));
      });
  });
};

export const FilePickerUtils = {
  launchCameraUtil,
  launchLibraryUtil,
};
