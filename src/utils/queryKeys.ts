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
  register: () => [...roomKeys.all, 'register'],
};
