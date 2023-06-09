import {
  CreateRoomData,
  CreateRoomParams,
  DeleteRoomParams,
  GetRoomByCodeParams,
  RoomData
} from './types';

import axiosInstance from 'services/common/instance';

export const getAllRoomService = async ():
  Promise<RoomData[]> => {
  const res = await axiosInstance.get('room/list');
  return res.data.data;
};

export const getRoomByCodeService = async (params: GetRoomByCodeParams):
  Promise<RoomData> => {
  const res = await axiosInstance.get(`room/detail/${params.code}`);
  return res.data.data;
};

export const createRoomService = async (params: CreateRoomParams):
  Promise<CreateRoomData> => {
  const res = await axiosInstance.post('room/create', params);
  return res.data.data;
};

export const deleteRoomService = async (params: DeleteRoomParams):
  Promise<void> => {
  await axiosInstance.delete(`room/delete/${params.id}`);
};
