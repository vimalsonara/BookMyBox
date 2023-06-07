import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  userDetails: null,

  login: (user) => set({ isAuthenticated: true, userDetails: user }),
  logout: () => set({ isAuthenticated: false, userDetails: null }),
}));

export default useAuthStore;
