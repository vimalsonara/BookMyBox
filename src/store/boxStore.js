import { create } from 'zustand';

const useBoxesStore = create((set) => ({
  boxes: localStorage.getItem('boxes')
    ? JSON.parse(localStorage.getItem('boxes'))
    : [],
  setBoxes: (newBoxes) => {
    set({ boxes: newBoxes });
    localStorage.setItem('boxes', JSON.stringify(newBoxes));
  },
  clearBoxes: () => {
    set({ boxes: [] });
    localStorage.removeItem('boxes');
  },
}));

export default useBoxesStore;
