export interface UserData {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface RegisterUserParams {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserParams {
  username: string;
  password: string;
}

export interface LoginUserData {
  user: UserData;
  token: string;
}
