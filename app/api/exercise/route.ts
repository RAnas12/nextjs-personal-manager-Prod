import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = await fetch(
    "https://wger.de/api/v2/exercise/?language=2&limit=400",
    {
      cache: "force-cache",
      headers: {
        Authorization: process.env.WGER_API_KEY + "",
      },
    }
  );
  if (!response)
    NextResponse.json({ message: "Error, no exercise find" }, { status: 400 });
  const { results } = await response.json();
  return NextResponse.json({ results });
}

export async function POST(request: NextRequest) {
  const { workoutId, exerciseApiId, name, category } = await request.json();
  if (!exerciseApiId || !workoutId || !name || !category) {
    return NextResponse.json(
      {
        message: "The exercice do not have all data",
      },
      { status: 400 }
    );
  }
  const exercice = await prisma.exercise.create({
    data: {
      apiId: String(exerciseApiId),
      workoutId: String(workoutId),
      name: String(name),
      category: String(category),
    },
  });
  return NextResponse.json(exercice.id);
}

export async function PUT(request: NextRequest) {
  let { exerciceId, set, rep, weight, breakTimeBetweenSet } =
    await request.json();

  if (!exerciceId) {
    return NextResponse.json(
      {
        message: "The exercice do not have all data",
      },
      { status: 400 }
    );
  }
  if (!set) set = 0;
  if (!rep) rep = 0;
  if (!weight) weight = 0;
  if (!breakTimeBetweenSet) breakTimeBetweenSet = 0;

  const exercice = await prisma.exercise.update({
    where: {
      id: String(exerciceId),
    },
    data: {
      set: Number(set),
      rep: Number(rep),
      breakTimeBetweenSet: Number(breakTimeBetweenSet),
      weight: parseFloat(weight),
    },
  });
  return NextResponse.json(exercice);
}
