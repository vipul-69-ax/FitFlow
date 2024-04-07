import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useStateStore = create(
  persist(
    (set) => ({
      state: false,
      setState: async (s) => {
        try {
          set(s);
        } catch (err) {
        }
      },
    }),
    {
      name: "state-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useStateStore
