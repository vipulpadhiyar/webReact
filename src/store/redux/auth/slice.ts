// serviceDetailsSlice.ts
import {createSlice} from '@reduxjs/toolkit';

export interface IAuthSlice {}

const initialState: IAuthSlice = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // set service details list.
  },
});

export default authSlice.reducer;
export const serviceDetailsSliceAction = authSlice.actions;
