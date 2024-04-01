import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: {
        name: "",
        age: 0,
        height: 0,
      },

      setUser: async (user) => {
        try {
          set({ user });
        } catch (error) {
          console.error("Error setting user:", error);
        }
      },

      setName: async (name) => {
        try {
          set((state) => ({ user: { ...state.user, name } }));
        } catch (error) {
          console.error("Error setting name:", error);
        }
      },

      setAge: async (age) => {
        try {
          set((state) => ({ user: { ...state.user, age } }));
        } catch (error) {
          console.error("Error setting age:", error);
        }
      },

      setHeight: async (height) => {
        try {
          set((state) => ({ user: { ...state.user, height } }));
        } catch (error) {
          console.error("Error setting height:", error);
        }
      },

      clearUser: () => {
        try {
          set({ user: { name: "", age: 0, height: 0 } });
        } catch (error) {
          console.error("Error clearing user:", error);
        }
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useUserStore;
