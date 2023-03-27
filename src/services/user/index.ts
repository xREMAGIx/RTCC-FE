import { LoginUserData, LoginUserParams, RegisterUserParams } from './types';

import axiosInstance from 'services/common/instance';

export const registerUserService = async (params: RegisterUserParams):
  Promise<void> => {
  await axiosInstance.post('user/create', params);
};

export const loginUserService = async (params: LoginUserParams):
  Promise<LoginUserData> => {
  const res = await axiosInstance.post('user/login', params);
  return res.data.data;
};
