"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateWorkout({ userId }: { userId: String }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [workoutName, setWorkoutName] = useState("");

  const createWorkout = async (event: any) => {
    event.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/workout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: workoutName, userId: userId }),
    });
    router.refresh();
  };
  const btnClass = showForm
    ? " ease-in duration-300 bg-gray-600  opacity-60 "
    : "ease-in duration-300";
  return (
    <>
      <button className={btnClass} onClick={() => setShowForm(true)}>
        Create a new workout
      </button>
      {showForm ? (
        <div className="relative w-8/12 my-6 mx-auto rounded-md bg-color-base">
          <button
            onClick={() => setShowForm(false)}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="authentication-modal"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <form onSubmit={createWorkout} className="shadow-xl  py-4 px-4">
            <div className="mb-4">
              <label className="font-bold text-xl mb-2">
                Name of the workout
              </label>
              <input
                onChange={(e) => setWorkoutName(e.target.value)}
                id="first"
                name="first"
                placeholder="Enter workout name"
              ></input>
            </div>
            <div className="flex items-center justify-between">
              <button>Create</button>

              <button onClick={() => setShowForm(false)} className="btn-delete">
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}
