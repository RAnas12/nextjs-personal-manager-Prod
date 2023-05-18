import "@/app/globals.css";
import CreateWorkout from "./createWorkout";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { Workout } from "@prisma/client";
import WorkoutCard from "./workoutCard";
import { getWorkoutsOfUserById } from "./getData";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) throw Error("not connected");
  const { id }: any = session.user;

  const res = await getWorkoutsOfUserById();

  const workouts: Workout[] = res;
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <CreateWorkout userId={id}></CreateWorkout>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
        {workouts.map((workout) => (
          <div className="max-w-xs min-w-fit rounded-md overflow-hidden shadow-lg bg-color-base">
            <WorkoutCard
              workout={workout}
              isPageDetailProp={false}
            ></WorkoutCard>
          </div>
        ))}
      </div>
    </main>
  );
}
