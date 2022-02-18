import create from 'zustand';

const useStore = create((set) => ({
  outlets: [],
  categories: [],
  regions: [],
  features: [],
  setData: (outlets, categories, regions, features) =>
    set({ outlets, categories, regions, features }),
}));

export default useStore;
