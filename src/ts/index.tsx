import { StackNavigationProp } from "@react-navigation/stack";
import Animated from "react-native-reanimated";

export interface ExerciseStore {
  exercises: Array<Object>;
  addExercise: Function;
  removeExercise: Function;
  clearExercises: Function;
  completeExercise: Function;
}

export interface ExerciseQuery {
  data: Object;
  i: Function;
  j: Function;
}

export interface RouteData {
  data: any;
}

export type Exercise = {
  difficult: string;
  equipment: string;
  instructions: string;
  muscle: string;
  completed: boolean;
  type: string;
  name: string;
  sets: string | number;
  reps: string | number;
  exerciseId: string;
  day: string;
};

type RootStackParamList = {
  search: undefined;
  info: { data: any };
  home: undefined;
  days: undefined;
};

export type SearchNavigationProp = StackNavigationProp<
  RootStackParamList,
  "search"
>;
export type InfoNavigationProp = StackNavigationProp<
  RootStackParamList,
  "info"
>;
export type HomeNavigationProp = StackNavigationProp<
  RootStackParamList,
  "home"
>;
export type DaysNavigationProp = StackNavigationProp<
  RootStackParamList,
  "days"
>;

export interface ParallaxStyles {
  transform: [{ translateX: any }, { translateY: any }, { rotateY: any }];
}

export interface DateInfo {
  date: number;
  day: number;
  month: number;
  year: number;
  dayName: string;
  monthName: string;
}
