import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { id } = params;
  if (!id)
    return NextResponse.json(
      { message: "error while trying to delete" },
      { status: 400 }
    );

  const result = await prisma.exercise.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json({ message: "sucessfully deleted" });
}
