"use client";
import { use, useEffect, useState } from "react";
import ExerciseApiCard from "./exerciseApiCard";
import { Exercise } from "@prisma/client";

export default function AddExercise({
  workoutId,
  exercisesInWorkout,
}: {
  workoutId: string;
  exercisesInWorkout: Exercise[];
}) {
  const [isAddingExercise, setIsAddingExercise] = useState(false);
  const [exercisesApi, setExercisesApi] = useState<ApiExerciseType[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [pageToSelect, setPageToSelect] = useState(0);

  useEffect(() => {
    if (isAddingExercise && isFirstLoading) {
      fetchExercises();
      setIsFirstLoading(false);
      return;
    }
  }, [isAddingExercise]);

  const fetchExercises = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/exercise`, {
      cache: "force-cache",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { results } = await res.json();
    fetchExercisesDetails(results);
    return;
  };

  const fetchExercisesDetails = async (results: []) => {
    const exercises = results.slice(0, 20);
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/exercise`, {
      cache: "force-cache",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    convertToCustomObject(results);
  };

  const convertToCustomObject = (jsonExercises: []): ApiExerciseType[] => {
    let tempExercisesArrayTyped: ApiExerciseType[] = [];
    let exercisesInWorkoutId: string[] = [];

    exercisesInWorkout.map((exercise) => {
      exercisesInWorkoutId.push(exercise.apiId);
    });
    console.log(exercisesInWorkoutId);
    //todo muscle category
    jsonExercises.map((exercise) => {
      if (!exercise["name"] && !exercise["id"]) return;
      if (exercisesInWorkoutId.includes(String(exercise["id"]))) {
        return;
      }

      let tempExerciseTyped: ApiExerciseType = {
        name: exercise["name"],
        apiId: exercise["id"],
      };

      if (exercise["category"])
        tempExerciseTyped.category = exercise["category"];
      if (exercise["description"])
        tempExerciseTyped.description = exercise["description"];
      tempExercisesArrayTyped.push(tempExerciseTyped);
    });
    setExercisesApi(tempExercisesArrayTyped);
    return tempExercisesArrayTyped;
  };

  function pagesBtnCalculation(): number[] {
    const nb = exercisesApi.length / 20;
    let res = [];
    for (let index = 0; index < nb; index++) {
      res.push(index);
    }
    return res;
  }

  const pagesBtn: number[] = pagesBtnCalculation();

  return (
    <>
      <div className="flex max-w-full overflow-hidden pt-2">
        <h1>Add Exercises </h1>
        <button
          className="mx-4"
          onClick={() => setIsAddingExercise(!isAddingExercise)}
        >
          {isAddingExercise ? "Close" : "Add exercise"}
        </button>

        {isAddingExercise
          ? //todo add limit
            pagesBtn.map((page) => (
              <button
                key={page}
                className={page == pageToSelect ? "bg-purple-800" : ""}
                onClick={() => setPageToSelect(page)}
              >
                {page + 1}
              </button>
            ))
          : null}
      </div>
      <div className="grid grid-cols-1  justify-items-center  gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {isAddingExercise
          ? exercisesApi
              .slice(pageToSelect * 20, pageToSelect * 20 + 20)
              .map((exercise) => (
                <ExerciseApiCard
                  key={exercise.apiId}
                  exercise={exercise}
                  workoutId={workoutId}
                ></ExerciseApiCard>
              ))
          : null}
      </div>
    </>
  );
}
