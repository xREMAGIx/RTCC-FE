export const authKeys = {
  all: ['auth'],
  profile: (token: string) => [...authKeys.all, 'profile', token],
};

export const userKeys = {
  all: ['users'],
  login: () => [...userKeys.all, 'login'],
  register: () => [...userKeys.all, 'register'],
};

export const roomKeys = {
  all: ['rooms'],
  create: () => [...roomKeys.all, 'create'],
  delete: () => [...roomKeys.all, 'delete'],
  list: () => [...roomKeys.all, 'list'],
};
