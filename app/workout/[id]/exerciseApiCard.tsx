"use client";
import { useState } from "react";

export default function ExerciseApiCard({
  exercise,
  workoutId,
}: {
  exercise: ApiExerciseType;
  workoutId: string;
}) {
  const [isAdded, setIsAdded] = useState(false);

  const handlerClick = async () => {
    console.log("click");
    if (isAdded) removeExerciseFromWorkout();
    else addExerciseToWorkout();
  };
  const removeExerciseFromWorkout = async () => {
    console.log("remove");
  };

  const addExerciseToWorkout = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/exercise`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workoutId: workoutId,
        exerciseApiId: exercise.apiId,
        name: exercise.name,
        category: exercise.category,
      }),
    });
    if (!res.ok) throw Error("error while trying to add exercise");
    setIsAdded(true);
  };

  return (
    <>
      <div className="min-w-min max-w-xs rounded-md overflow-hidden shadow-lg bg-color-secondary">
        <div className="">
          <img
            src="https://tecdn.b-cdn.net/img/new/fluid/city/113.webp"
            className="w-full rounded-md "
            alt="Louvre"
          ></img>
        </div>
        <div className="px-2 py-4">
          <p className="text-gray-700 text-base">{exercise.name}</p>
        </div>
        <div className="px-2 py-4">
          <p className="text-gray-700 text-base">{exercise.category}</p>
        </div>
        <div className="px-2 py-4">
          <p className="text-gray-700 text-base">Id: {exercise.apiId}</p>
        </div>

        <div className="flex justify-between px-2">
          <button onClick={handlerClick}>{isAdded ? "Remove" : "Add"}</button>
        </div>
      </div>
    </>
  );
}
