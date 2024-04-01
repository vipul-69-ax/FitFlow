import { z } from "zod";

export const ExerciseQuerySchema = z.string().min(2);
export const ExerciseSchema = z.object({
  difficulty: z.string(),
  equipment: z.string(),
  instructions: z.string().optional().nullable(),
  muscle: z.string(),
  completed: z.boolean(),
  type: z.string(),
  name: z.string(),
  sets: z.number().min(1),
  reps: z.number().min(1),
  exerciseId: z.string(),
  day: z.enum([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]),
});

export const UserSchema = z.object({
  name: z.string().min(1),
  age: z.number().min(10).max(100),
  height: z.number().max(250).min(10),
});
