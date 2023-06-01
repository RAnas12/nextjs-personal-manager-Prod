import "@/app/globals.css";
import { Exercise, Workout } from "@prisma/client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getExercisesByWorkoutId, getWorkoutById } from "../getData";
import WorkoutCard from "../workoutCard";
import ExerciseCard from "./exerciseCard";
import AddExercise from "./addExercise";

export default async function Home({ params }: { params: Params }) {
  //todo check to create a class with fetch data
  const { id } = params;

  const workout: Workout = await getWorkoutById(id);
  const exercises: Exercise[] = await getExercisesByWorkoutId(id);
  return (
    <main className="min-h-screen pt-24 px-4">
      <div className="flex justify-between h-12 rounded-md overflow-hidden shadow-lg bg-color-base">
        <WorkoutCard workout={workout} isPageDetailProp={true}></WorkoutCard>
      </div>
      <div className="mt-4">
        <AddExercise
          workoutId={id}
          exercisesInWorkout={exercises}
        ></AddExercise>
      </div>
      <div className="flex flex-col">
        {exercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise}></ExerciseCard>
        ))}
      </div>
    </main>
  );
}
