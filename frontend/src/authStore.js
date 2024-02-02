import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token: null,
  user: null,
  login: (token, user) => set({ token, user }),
  logout: () =>
    new Promise((resolve) => set({ token: null, user: null }, resolve)),
}));

export default useAuthStore;
