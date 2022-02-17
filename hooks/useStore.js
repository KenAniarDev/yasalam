import create from "zustand";

const useStore = create((set) => ({
   outlets: [],
   categories: [],
   setOutlets: (outlets) =>
      set((state) => ({
         ...state,
         outlets,
      })),
   setCategories: (categories) =>
      set((state) => ({
         ...state,
         categories,
      })),
}));

export default useStore;
