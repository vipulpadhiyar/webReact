import {api} from '~/api';
import {AppEndPoints} from '~/constants';

/**
 * This function is used to call the Profile api using axios
 *
 * @returns {Promise<CMSResponseType | undefined>} - Return promise with response of the api.
 */
export const myProfileApi = async (): Promise<
  UserProfileResponse | undefined
> => {
  const response = await api.post<ApiResponseType<UserProfileResponse>>(
    `${AppEndPoints.ViewProfile}`,
  );
  return response?.data?.data;
};

export const editMyProfileApi = async (
  param: EditProfileFormParamsType,
): Promise<EditProfileResponseType | undefined> => {
  const response = await api.post<ApiResponseType<EditProfileResponseType>>(
    `${AppEndPoints.EditProfile}`,
    param,
  );
  return response?.data;
};

export const ChangePasswordApi = async (
  param: ChangePasswordFormParamsType,
): Promise<ChangePasswordResponseType | undefined> => {
  const response = await api.post<ApiResponseType<ChangePasswordResponseType>>(
    `${AppEndPoints.ChangePassword}`,
    param,
  );
  return response?.data;
};

export const logOutApi = async (): Promise<any> => {
  const response = await api.post<ApiResponseType<any>>(
    `${AppEndPoints.LogOut}`,
  );
  return response?.data;
};

export const getTermsPrivacyApi = async (
  param: CMSTermsPrivacyRequest,
): Promise<ChangePasswordResponseType | undefined> => {
  const response = await api.post<ApiResponseType<CMSTermsPrivacyResponse>>(
    `${AppEndPoints.TermsOrPrivacy}`,
    param,
  );
  return response?.data;
};
