export interface CreateRoomParams {
  name: string;
  description?: string;
}

export interface CreateRoomData {
  id: number;
  code: string;
  create_user_id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface RoomData {
  id: number;
  code: string;
  create_user_id: number;
  name: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

export interface DeleteRoomParams {
  id: number;
}
