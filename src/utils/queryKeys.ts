export const userKeys = {
  all: ['users'],
  register: () => [...userKeys.all, 'register'],
};

export const roomKeys = {
  all: ['rooms'],
  register: () => [...roomKeys.all, 'register'],
};
