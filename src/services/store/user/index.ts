import { create } from 'zustand';

import { IUserObj } from './types';

export type IAuthStore = {
  userList: IUserObj[];
  userDetail: IUserObj;
};

interface IAuthAction {
  actions: {
    addUserList: (status: IUserObj[]) => void;
    addUserDetail: (payload: IUserObj) => void;
  };
}

export const userStore = create<IAuthStore & IAuthAction>((set) => ({
  // initial state
  userList: [],
  userDetail: {} as IUserObj,

  // Actions
  actions: {
    addUserList: (payload) =>
      set((state) => {
        return {
          ...state,
          userList: payload
        };
      }),
    addUserDetail: () =>
      set((state) => {
        return {
          ...state,
          userDetail: {} as IUserObj
        };
      })
  }
}));
