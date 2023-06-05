import { create } from 'zustand';

const useBoxesStore = create((set) => ({
  boxes: [],
  setBoxes: (newBoxes) => set({ boxes: newBoxes }),
}));

export default useBoxesStore;
