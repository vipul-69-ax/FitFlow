import { StackNavigationProp } from "@react-navigation/stack";
import Animated from "react-native-reanimated";
import { z } from "zod";
import { ExerciseSchema } from "../zod";

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
export interface InfoRouteData {
  data: any;
  day: any;
}

export type Exercise = z.infer<typeof ExerciseSchema>;

type RootStackParamList = {
  search: { data: any };
  info: { data: any; day: any };
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

export type User = {
  name: string;
  age: number;
  height: number;
};

export type State = {
  user: User;
  setUser: Function;
  setName: Function;
  setAge: Function;
  setHeight: Function;
};

export type Actions = {
  setUser: (user: User) => void;
  setName: (name: string) => void;
  setAge: (age: number) => void;
  setHeight: (height: number) => void;
};

export type StateStore = {
  state: boolean;
  setState: Function;
};
