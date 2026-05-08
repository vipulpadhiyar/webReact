import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { authStore } from 'services/store/auth';

import { API_BASE, STATIC_TOKEN } from 'utils/constants';

const apiInstance: AxiosInstance = axios.create({
  baseURL: API_BASE
});

export function setAxiosInterceptor() {
  apiInstance.interceptors.request.use(
    (config: any) => {
      authStore.getState().actions.loaderChange(true);

      config.headers['PUBLIC_SECRET'] = `${STATIC_TOKEN}`;
      return config;
    },
    (error: any) => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );

  // It's used to intercept all the axios api response
  apiInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Stop Loading
      authStore.getState().actions.loaderChange(false);
      return response.data;
    },
    (err) => {
      authStore.getState().actions.loaderChange(false);

      if (err.response) {
        if (err?.response?.data?.statusCode === 403) {
          authStore.getState().actions.authFail();
          return Promise.reject(err?.response?.data);
        } else {
          return Promise.reject(err?.response?.data);
        }
      } else if (err.request) {
        return Promise.reject({
          response: {
            data: {
              message: 'Something went wrong, Please try again later!!!'
            }
          }
        });
      }
    }
  );
}

export default apiInstance;
