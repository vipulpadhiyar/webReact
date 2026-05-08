import RNFetchBlob from 'rn-fetch-blob';

// Root path of device with folder app name.
export const ROOT_PATH = `${RNFetchBlob.fs.dirs.DocumentDir}/AppName`;

// Sub path of device with sub folder of root path.
export const SUB_PATH = `${ROOT_PATH}/SubFolder`;

/**
 * Get File name with extension by path
 * @param {string} path - File path.
 * @returns
 */
export const getFileNameByPath = (path: string) => {
  const segments = path.split('/');
  const lastSegment = segments[segments.length - 1];
  return lastSegment;
};
