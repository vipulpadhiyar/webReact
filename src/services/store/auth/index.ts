import { create } from 'zustand';

import apiInstance from 'services/api';

import { LocalStorageKeys } from 'utils/constants';

import { IUserData } from './types';

export type IAuthStore = {
  isLoading: boolean;
  isLoggedIn: boolean;
  userData: IUserData;
  isSuperAdmin?: boolean;
};

interface IAuthAction {
  actions: {
    loaderChange: (status: IAuthStore['isLoading']) => void;
    authSuccess: (payload: { data: IUserData }) => void;
    authFail: () => void;
  };
}

export const authStore = create<IAuthStore & IAuthAction>((set) => ({
  // initial state
  isLoading: false,
  isLoggedIn: false,
  userData: {} as IUserData,

  // Actions
  actions: {
    loaderChange: (status) => set((state) => ({ ...state, isLoading: status })),
    authSuccess: (payload) =>
      set((state) => {
        apiInstance.defaults.headers.common['Authorization'] = `Bearer ${payload.data.accessToken}`;
        localStorage.setItem(LocalStorageKeys.authToken, JSON.stringify(payload.data.accessToken));
        localStorage.setItem(LocalStorageKeys.user, JSON.stringify(payload.data));
        return {
          ...state,
          userData: payload.data,
          isLoggedIn: true
        };
      }),
    authFail: () =>
      set((state) => {
        delete apiInstance.defaults.headers.common['Authorization'];
        localStorage.removeItem(LocalStorageKeys.authToken);
        localStorage.removeItem(LocalStorageKeys.user);
        return {
          ...state,
          userData: {} as IUserData,
          isLoggedIn: false
        };
      })
  }
}));
