"use client";
import { prisma } from "@/lib/prisma";
import { Workout } from "@prisma/client";
import { error } from "console";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WorkoutCard({
  workout,
  isPageDetailProp,
}: {
  workout: Workout;
  isPageDetailProp: boolean;
}) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [workoutName, setWorkoutName] = useState(workout.name);
  const inputClassname = isUpdating ? "max-h-full max-h" : "unmodifiable";

  const classCss = isPageDetailProp ? "flex" : "";
  const deleteWorkout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/workout/${workout.id}`, {
      method: "DELETE",
    });
    router.refresh();
  };
  const detailWorkout = async () => {
    router.push("/workout/" + workout.id);
  };
  const handleUpdateName = () => {
    if (!isUpdating) {
      setIsUpdating(true);
      return;
    }
    if (workout.name == workoutName) {
      setIsUpdating(false);
      return;
    }
    updateWorkout();
  };
  const updateWorkout = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/workout`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: workout.id, name: workoutName }),
    });
    //todo manage error
    if (res.status != 200) {
      throw Error("Error while trying to update");
    }
    setIsUpdating(false);
  };
  return (
    <>
      <div className={isPageDetailProp ? "flex" : ""}>
        <img
          className={isPageDetailProp ? "h-full" : "w-full"}
          src="/Workout-img-01.png"
          alt="Sunset in the mountains"
        />
        <div className="px-2 pt-2 flex content-center">
          <input
            onChange={(e) => setWorkoutName(e.target.value)}
            className={inputClassname}
            name="name"
            disabled={!isUpdating}
            value={workoutName}
          ></input>
          <button onClick={handleUpdateName}>
            {isUpdating ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-3 h-3"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-3 h-3"
              >
                <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
              </svg>
            )}
          </button>
          {/* <div className="font-bold text-xl mb-2">{workout.name}</div> */}
        </div>
      </div>

      <div className="flex justify-between px-2">
        <button onClick={deleteWorkout} className="btn-delete">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {isPageDetailProp ? null : (
          <button onClick={detailWorkout}>Access</button>
        )}
      </div>
    </>
  );
}
