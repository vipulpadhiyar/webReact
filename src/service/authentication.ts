import {api} from '~/api';
import {AppEndPoints} from '~/constants';

/**
 * The signInApi function sends a POST request to the signIn endpoint with the provided parameters and
 * returns the data from the response.
 * @param {SignInFormParamsType} param - The `param` parameter in the `signInApi` function is of type
 * `SignInFormParamsType`, which likely contains the necessary information for a user to sign in, such
 * as username and password. This parameter is used to make a POST request to the
 * `${AppEndPoints.SignIn}` endpoint in
 * @returns The function `signInApi` is returning a `Promise` that resolves to a `SignInResponseType`
 * or `undefined`.
 */
export const signInApi = async (
  param: SignInFormParamsType,
): Promise<SignInResponseType | undefined> => {
  const response = await api.post<ApiResponseType<SignInResponseType>>(
    `${AppEndPoints.SignIn}`,
    param,
  );
  return response?.data?.data;
};

/**
 * The signUpApi function is an asynchronous function that sends a POST request to the signup endpoint
 * and returns the data from the response.
 * @param {SignUpRequestType} param - The `param` parameter in the `signUpApi` function is of type
 * `SignUpRequestType`, which likely contains the data needed for a user to sign up, such as username,
 * email, password, etc.
 * @returns The `signUpApi` function is returning a `Promise` that resolves to a `SignUpResponseType`
 * or `undefined`.
 */

export const signUpApi = async (
  param: SignUpRequestType,
): Promise<SignUpResponseType | undefined> => {
  const response = await api.post<ApiResponseType<SignUpResponseType>>(
    `${AppEndPoints.SIGNUP}`,
    param,
  );
  return response?.data?.data;
};

/**
 * The `forgotPasswordApi` function sends a POST request to the Forgot Password endpoint with the
 * provided parameters and returns the response data.
 * @param {ForgotPasswordFormParamsType} param - The `param` parameter in the `forgotPasswordApi`
 * function is of type `ForgotPasswordFormParamsType`, which likely contains the necessary information
 * required for the forgot password functionality, such as the user's email or username. This parameter
 * is used to make a POST request to the `AppEndPoints
 * @returns The `forgotPasswordApi` function is returning a `Promise` that resolves to a
 * `ForgotPasswordResponseType` or `undefined`.
 */
export const forgotPasswordApi = async (
  param: ForgotPasswordFormParamsType,
): Promise<ForgotPasswordResponseType | undefined> => {
  const response = await api.post<ApiResponseType<ForgotPasswordResponseType>>(
    `${AppEndPoints.ForgotPassword}`,
    param,
  );
  return response?.data;
};
