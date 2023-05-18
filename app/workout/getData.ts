import { prisma } from "@/lib/prisma";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Exercise, Workout } from "@prisma/client";

export const getWorkoutsOfUserById = async () => {
  const session = await getServerSession(authOptions);
  if (!session) throw Error("not connected");

  const { id }: any = session.user;
  const res = await prisma.workout.findMany({
    where: {
      userId: id,
    },
  });
  const workouts: Workout[] = res;

  return workouts;
};

export const getWorkoutById = async (workoutId: string) => {
  const res = await prisma.workout.findUnique({
    where: {
      id: workoutId,
    },
  });
  if (!res) throw Error("aucun workout trouver");

  const workout: Workout = res;
  return workout;
};
export const getExercisesByWorkoutId = async (workoutId: string) => {
  const res = await prisma.exercise.findMany({
    where: {
      workoutId: workoutId,
    },
  });
  if (!res) throw Error("aucun workout trouver");

  const exercises: Exercise[] = res;
  return exercises;
};
