import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  userDetails: null,

  login: (user) => set({ isAuthenticated: true, userDetails: user }),
  logout: () => set({ isAuthenticated: false, userDetails: null }),
}));

// Load state from localStorage on initialization
const storedState = JSON.parse(localStorage.getItem('user'));
if (storedState) {
  useAuthStore.setState(storedState);
}

// Save state to localStorage whenever it changes
useAuthStore.subscribe(
  (state) => {
    localStorage.setItem('user', JSON.stringify(state));
  },
  (state) => state // Only save specific parts of the state if needed
);

export default useAuthStore;
