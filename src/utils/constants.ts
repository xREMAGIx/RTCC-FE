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
};

export type ConstantRoutesCodes = keyof typeof ROUTES;
