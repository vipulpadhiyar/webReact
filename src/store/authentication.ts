import {useMutation, UseMutationOptions} from '@tanstack/react-query';

import {MutationQueryKeys} from '~/constants';
import {forgotPasswordApi, signInApi, signUpApi} from '~/service';

/**
 * The useSignInAction function is a TypeScript hook that handles sign-in functionality with
 * customizable mutation options.
 * @param [options] - The `options` parameter in the `useSignInAction` function is of type
 * `UseMutationOptions`. It specifies the configuration options for the mutation hook, such as the
 * expected response type, error type, request type, and any additional options that can be passed to
 * the `useMutation` hook.
 */
export const useSignInAction = (
  options?: UseMutationOptions<
    SignInResponseType | undefined,
    Error,
    SignInRequestType,
    unknown
  >,
) =>
  useMutation({
    mutationKey: [MutationQueryKeys.signInMutate],
    mutationFn: (param: SignInFormParamsType) => signInApi(param),
    networkMode: 'always',
    ...options,
  });

/**
 * The `useSignUpApiAction` function is a custom hook that handles sign-up API requests using
 * `useMutation` from React Query.
 * @param [options] - The `options` parameter in the `useSignUpApiAction` function is an optional
 * object that can be used to configure the behavior of the mutation hook. It can include various
 * options such as `onSuccess`, `onError`, `onSettled`, `onMutate`, `onError
 */
export const useSignUpApiAction = (
  options?: UseMutationOptions<
    SignUpResponseType | undefined,
    Error,
    SignUpRequestType,
    unknown
  >,
) =>
  useMutation({
    mutationKey: [MutationQueryKeys.signupMutate],
    mutationFn: (param: SignUpRequestType) => signUpApi(param),
    networkMode: 'always',
    ...options,
  });

/**
 * The useForgotPasswordAction function is a TypeScript hook that handles the logic for initiating a
 * forgot password request.
 * @param [options] - The `options` parameter in the `useForgotPasswordAction` function is of type
 * `UseMutationOptions`. It specifies the configuration options for the mutation operation, such as the
 * expected response type, error type, request type, and any additional options that can be passed to
 * the `useMutation` hook
 */
export const useForgotPasswordAction = (
  options?: UseMutationOptions<
    ForgotPasswordResponseType | undefined,
    Error,
    ForgotPasswordRequestType,
    unknown
  >,
) =>
  useMutation({
    mutationKey: [MutationQueryKeys.forgotPasswordMutate],
    mutationFn: (param: ForgotPasswordFormParamsType) =>
      forgotPasswordApi(param),
    networkMode: 'always',
    ...options,
  });
