import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserData } from 'services/user/types';

interface AuthState {
  userInfo?: UserData;
}

const initialState: AuthState = {
};

export const authSlice = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    setUserInfo($state, action: PayloadAction<UserData>) {
      $state.userInfo = action.payload;
    },
    removeUserInfo($state) {
      $state.userInfo = undefined;
    },
  },
  extraReducers() { },
});

export const {
  setUserInfo,
  removeUserInfo,
} = authSlice.actions;

export default authSlice.reducer;
