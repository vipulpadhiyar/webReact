import {api} from '~/api';
import {AppEndPoints} from '~/constants';

/**
 * This function is used to call the file upload api using axios
 *
 * @param {FileUploadRequestType} params - Request param for the file upload api.
 *
 * @returns {Promise<FileResponseItemType[] | undefined>} - Return promise with response of the api.
 */
export const fileUploadApi = async (
  params: FileUploadRequestType,
): Promise<FileResponseItemType | undefined> => {
  let formData = new FormData();
  formData.append('moduleName', params.moduleName);
  formData.append('file', params.file);

  const response = await api.post<ApiResponseType<FileResponseItemType>>(
    `${AppEndPoints.UploadFile}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response?.data?.data;
};
