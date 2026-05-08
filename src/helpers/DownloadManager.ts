import {Platform} from 'react-native';
import RNFS from 'react-native-fs';
import RNFetchBlob, {RNFetchBlobConfig} from 'rn-fetch-blob';

import {getFileNameByPath} from '~/constants/app.folder.paths';
import {log} from '~/utils';

export type DownloadResultProps = {
  destinationPath: string;
};

// config from rn RN fetch blob.
const {config} = RNFetchBlob;

/**
 * This helper function is used to download the file and provide you the progress.
 *
 * @description We have separate code for Android and iOS to track the progress.
 * @param {string} url - File URL.
 * @param {string} destinationPath - Destination path where the file will be downloaded.
 * @param {function} onProgress - Callback function that provides download progress. Optional.
 * @returns
 */
export const downloadFile = (
  url: string,
  destinationPath: string,
  onProgress?: (progress: number) => void,
) => {
  // Return promise
  return new Promise<DownloadResultProps>((resolve, reject) => {
    log('Downloading starts', url);

    const fileName = getFileNameByPath(url);
    const filePath = `${destinationPath}/${fileName}`;

    if (Platform.OS === 'ios') {
      // Config options instance.
      const configOptions: RNFetchBlobConfig = {
        fileCache: true,
        path: filePath,
      };

      // Download file
      config(configOptions)
        .fetch('GET', url)
        .progress((received, total) => {
          // Calculate the progress and set in callback
          if (onProgress) {
            const downloadProgress = (received / total) * 100;
            const progress = Math.floor(downloadProgress);
            onProgress?.(progress);
            log('Downloading onProgress', progress);
          }
        })
        .then((res: any) => {
          // Download finished
          log('Downloading completed', res);
          resolve({destinationPath: filePath});
        })
        .catch(error => {
          // Something went wrong in downloading.
          log('Downloading error', error);
          reject(error);
        });
    } else {
      // Config options instance.
      const configOptions: RNFS.DownloadFileOptions = {
        fromUrl: url,
        toFile: filePath,
        progressInterval: 500,
        progress: res => {
          // Calculate the progress and set in callback
          if (onProgress) {
            const downloadProgress =
              (res.bytesWritten / res.contentLength) * 100;
            const progress = Math.floor(downloadProgress);
            onProgress?.(progress);
            log('Downloading onProgress', progress);
          }
        },
      };

      //   Download File
      RNFS.downloadFile(configOptions)
        .promise.then((res: any) => {
          // Download finished
          log('Downloading completed', res);
          resolve({destinationPath: filePath});
        })
        .catch(error => {
          // Something went wrong in downloading.
          log('Downloading error', error);
          reject(error);
        });
    }
  });
};
