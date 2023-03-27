import { LoginUserParams, RegisterUserParams } from './types';

import axiosInstance from 'services/common/instance';

export const registerUserService = async (params: RegisterUserParams):
  Promise<void> => {
  await axiosInstance.post('user/create', params);
};

export const loginUserService = async (params: LoginUserParams):
  Promise<void> => {
  await axiosInstance.post('pg/report/shift-end', params);
};
