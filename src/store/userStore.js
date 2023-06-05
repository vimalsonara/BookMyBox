import { create } from 'zustand';

const useUserStore = create((set) => ({
  userDetails: null,
  setUserDetails: (userDetails) => set({ userDetails }),
}));

export default useUserStore;
