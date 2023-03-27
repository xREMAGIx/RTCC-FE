export const DEFAULT_QUERY_OPTION = {
  retry: 0,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
};

export const ROUTES = {
  HOME: 'home',
  LOGIN: 'login',
  WELCOME: 'welcome',
  ROOM: 'room',
  REGISTER: 'register',
};

export type ConstantRoutesCodes = keyof typeof ROUTES;

export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const PHONE_REGEX = /^0[1-9]\d{8}$/;

export const TOAST_SUCCESS_MESSAGE = {
  LOGIN: 'Login successfully!',
  REGISTER: 'Register successfully!'
};

export const TOAST_ERROR_MESSAGE = {
  INVALID: 'Error! Please recheck info!',
  GENERAL: 'Error! Please retry again!'
};
