"use client";
import { useEffect, useState } from "react";
import { Exercise } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const [set, setSet] = useState(exercise.set);
  const [rep, setRep] = useState(exercise.rep);
  const [weight, setWeight] = useState(exercise.weight);
  const [isCompleted, setIscompleted] = useState(exercise.isCompleted);
  const [breakTime, setBreakTime] = useState("");
  const [breakTimeMin, setBreakTimeMin] = useState(0);
  const [breakTimeSec, setBreakTimeSec] = useState(0);

  const router = useRouter();
  let inputClassName = isUpdating ? "" : "unmodifiable";

  const removeExerciseFromWorkout = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/exercise/${exercise.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) throw Error("error while trying to add exercise");
    router.refresh();
  };

  useEffect(() => {
    const secondes = exercise.breakTimeBetweenSet % 60;
    const minutes = Math.floor(exercise.breakTimeBetweenSet / 60);
    setBreakTimeSec(secondes);
    setBreakTimeMin(minutes);
    setBreakTime(
      String(minutes).padStart(2, "0") + ":" + String(secondes).padStart(2, "0")
    );
  }, []);

  const handleUpdateName = async () => {
    let breaktimeInSeconde = breakTimeMin * 60 + breakTimeSec;
    if (!isUpdating) {
      setIsUpdating(!isUpdating);

      return;
    }
    // exerciceId, set, rep, weight, breakTimeBetweenSet
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/exercise`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        exerciceId: exercise.id,
        set: set,
        rep: rep,
        weight: weight,
        breakTimeBetweenSet: breaktimeInSeconde,
      }),
    });
    if (!res.ok) throw Error("error while trying to add exercise");
    setBreakTime(
      String(breakTimeMin).padStart(2, "0") +
        ":" +
        String(breakTimeSec).padStart(2, "0")
    );

    setIsUpdating(!isUpdating);
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

        <div className="px-2 pt-2">
          <p className="text-gray-700 text-base">N:{exercise.name}</p>
        </div>
        <div className="px-2 pt-2">
          <p className="text-gray-700 text-base">
            Categorie:{exercise.category}
          </p>
        </div>
        <div className="flex items-center px-2">
          <label className="w-2/5">Set:</label>
          <input
            className={inputClassName}
            disabled={isUpdating ? false : true}
            onChange={(e) => setSet(Number(e.target.value))}
            name="set"
            placeholder=""
            type="number"
            min={0}
            value={set}
          ></input>
        </div>
        <div className="flex items-center px-2">
          <label className="w-2/5">Rep:</label>
          <input
            className={inputClassName}
            disabled={isUpdating ? false : true}
            onChange={(e) => setRep(Number(e.target.value))}
            name="rep"
            placeholder=""
            type="number"
            min={0}
            value={rep}
          ></input>
        </div>
        <div className="flex items-center px-2">
          <label className="w-2/5">Weight:</label>
          <input
            className={inputClassName}
            disabled={isUpdating ? false : true}
            onChange={(e) => setWeight(e.target.value)}
            name="weight"
            placeholder=""
            type="number"
            min={0}
            step={0.25}
            value={weight}
          ></input>
        </div>

        <div className="flex items-center px-2">
          <label className="w-2/5">break time:</label>

          {isUpdating ? (
            <div className="flex w-full">
              <input
                type="number"
                onChange={(e) => setBreakTimeMin(Number(e.target.value))}
                name="breakTimeMin"
                placeholder="Min"
                min={0}
                max={59}
                value={breakTimeMin}
              ></input>
              <span className="w-fit text-xl text-slate-950 font-bold py-2">
                :
              </span>
              <input
                type="number"
                onChange={(e) => setBreakTimeSec(Number(e.target.value))}
                name="breakTimeSec"
                placeholder="Sec"
                min={0}
                max={60}
                value={breakTimeSec}
              ></input>
            </div>
          ) : (
            <span className="text-lg text-slate-950 font-semibold py-2">
              {breakTime}
            </span>
          )}
        </div>

        <div className="flex justify-between px-2">
          <button onClick={removeExerciseFromWorkout} className="btn-delete">
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
          <button onClick={() => setIscompleted(!isCompleted)}>
            {isCompleted ? "uncompleted" : "completed"}
          </button>
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
        </div>
      </div>
    </>
  );
}
