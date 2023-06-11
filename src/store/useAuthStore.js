import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: JSON.parse(localStorage.getItem('Authenticated')) || false,
  userDetails: JSON.parse(localStorage.getItem('userDetails')) || null,

  login: (user) => {
    set({ isAuthenticated: true, userDetails: user });
    localStorage.setItem('Authenticated', JSON.stringify(true));
    localStorage.setItem('userDetails', JSON.stringify(user));
  },
  logout: () => {
    set({ isAuthenticated: false, userDetails: null });
    localStorage.removeItem('userDetails');
    localStorage.removeItem('Authenticated');
  },
}));

export default useAuthStore;
