import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";
import { getDateInfo } from "../utils/helpers";
async function addToExercises(exercise, set) {
  return new Promise((resolve, reject) => {
    set((state) => ({
      exercises: [...state.exercises, exercise],
    }));
    resolve("Success");
  });
}

const useExerciseStore = create(
  persist(
    (set) => ({
      exercises: [],

      addExercise: async (exercise) => {
        console.log("Adding");
        try {
          await addToExercises(exercise, set);
        } catch (error) {
          console.error("Error adding exercise:", error);
        }
      },

      removeExercise: async (id) => {
        try {
          set((state) => ({
            exercises: state.exercises.filter((ex) => {
              const e = JSON.parse(ex);
              if (e == null || e == undefined) return;
              return e.exerciseId != id;
            }),
          }));
        } catch (error) {
          console.error("Error removing exercise:", error);
        }
      },
      completeExercise: async (id) => {
        try {
          set((state) => ({
            exercises: state.exercises.map((ex) => {
              const e = JSON.parse(ex);
              if (e == null || e == undefined) return ex;
              if (e.exerciseId === id) {
                return JSON.stringify({ ...e, completed: true });
              } else {
                return ex;
              }
            }),
          }));
        } catch (error) {
          console.error("Error removing exercise:", error);
        }
      },
      clearExercises: () => {
        try {
          set({ exercises: [] });
        } catch (error) {
          console.error("Error clearing exercises:", error);
        }
      },
    }),
    {
      name: "exercise-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useExerciseStore;
