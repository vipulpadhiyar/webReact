import {exists} from 'react-native-fs';
import {subscribe, unzip} from 'react-native-zip-archive';

import {AppRegex} from '~/constants';
import {SUB_PATH} from '~/constants/app.folder.paths';
import {log} from '~/utils';

export type UnZipResultProps = {
  destinationFolderPath: string;
};

const charset = 'UTF-8';

/**
 *
 * @param {string} filePath - Zip file path.
 * @param {string} destinationPath - Destination path where the file will be unzip. Optional.
 * @param {function} onProgress - Callback function that provides unzip progress. Optional.
 * @returns
 */
export const unzipFile = (
  filePath: string,
  destinationPath?: string,
  onProgress?: (progress: number) => void,
) => {
  return new Promise<UnZipResultProps>(async (resolve, reject) => {
    const isFilePathExists = await exists(filePath);
    log('Unzip starts', filePath, isFilePathExists);
    let unzipFolderPath;

    if (destinationPath) {
      // Unzip folder path will be destination path that comes in params
      unzipFolderPath = destinationPath;
    } else {
      // Make a folder of file name and that will be the default unzip folder path.
      unzipFolderPath = provideDefaultUnzipPath(filePath);
    }

    try {
      log('Unzip folder path', unzipFolderPath);

      let subscription = null;
      if (onProgress) {
        subscription = subscribe(({progress, filePathFolder}) => {
          // the filePath is always empty on iOS for zipping.
          console.log('filePath', filePathFolder);
          const progressPer = Math.floor(progress * 100);
          onProgress?.(progressPer);
          log('Unzip onProgress', progressPer);
        });
      }

      // Unzip the file.
      const result = await unzip(filePath, unzipFolderPath, charset);
      log('Unzip onSuccess', result);
      resolve({destinationFolderPath: result});
      subscription?.remove();
    } catch (error) {
      log('Unzip onError i', error);
      reject(error);
    }
  });
};

/**
 * This function will provide the default unzip path.
 *
 * @param {string} filePath - File path.
 * @returns
 */
const provideDefaultUnzipPath = (filePath: string) => {
  // Retrieve the file name without extension from file path.
  const fileNameWithoutExt = filePath.match(
    AppRegex.FILE_NAME_WITHOUT_EXT,
  )?.[0];

  // Make a folder of file name and that will be the default unzip folder path.
  return `${SUB_PATH}/${fileNameWithoutExt}`;
};
