import {
  UndefinedInitialDataOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
} from '@tanstack/react-query';

import {MutationQueryKeys, QueryKeys} from '~/constants';
import {
  ChangePasswordApi,
  editMyProfileApi,
  getTermsPrivacyApi,
  logOutApi,
  myProfileApi,
} from '~/service/profile';

/**
 * Profile query
 *
 * @param options
 * @returns
 */
export const useMyProfileApiAction = (
  options?: UndefinedInitialDataOptions<
    UserProfileResponse | undefined,
    unknown,
    UserProfileResponse | undefined
  >,
) =>
  useQuery({
    queryKey: [QueryKeys.getUserProfile],
    queryFn: () => myProfileApi(),
    retry: false,
    ...options,
  });

export const useEditProfileAction = (
  options?: UseMutationOptions<
    EditProfileResponseType | undefined,
    Error,
    EditProfileRequest,
    unknown
  >,
) =>
  useMutation({
    mutationKey: [MutationQueryKeys.profileMutate],
    mutationFn: (param: EditProfileFormParamsType) => editMyProfileApi(param),
    networkMode: 'always',
    ...options,
  });

export const useChangePasswordAction = (
  options?: UseMutationOptions<
    ChangePasswordResponseType | undefined,
    Error,
    ChangePasswordRequestType,
    unknown
  >,
) =>
  useMutation({
    mutationKey: [MutationQueryKeys.changePasswordMutate],
    mutationFn: (param: ChangePasswordFormParamsType) =>
      ChangePasswordApi(param),
    networkMode: 'always',
    ...options,
  });

export const useLogOutAction = (
  options?: UseMutationOptions<any | undefined, Error>,
) =>
  useMutation({
    mutationKey: [MutationQueryKeys.logOutMutate],
    mutationFn: () => logOutApi(),
    networkMode: 'always',
    ...options,
  });

export const useGetTermsPrivacyAction = (
  options?: UseMutationOptions<
    CMSTermsPrivacyResponse | undefined,
    Error,
    CMSTermsPrivacyRequest,
    unknown
  >,
) =>
  useMutation({
    mutationKey: [MutationQueryKeys.changePasswordMutate],
    mutationFn: (param: CMSTermsPrivacyRequest) => getTermsPrivacyApi(param),
    networkMode: 'always',
    ...options,
  });
