import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
//todo add user verif
/*
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { id } = params;
  console.log(id);
  const workout = await prisma.workout.findUnique({
    where: {
      id: id,
    },
    include: {
      Exercises: true,
    },
  });

  return NextResponse.json({ workout });
}*/

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { id } = params;

  if (!id)
    return NextResponse.json({ message: "error while trying to delete" });

  const result = await prisma.workout.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json({ message: "sucessfully deleted" });
}
