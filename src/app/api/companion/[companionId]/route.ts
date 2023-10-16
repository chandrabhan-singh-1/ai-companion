import prismaDB from "@/lib/prismaDB";
import { checkSubscription } from "@/lib/subscription";
import { auth, currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { companionId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();

    const { src, name, description, instructions, seed, categoryId } = body;

    if (!params.companionId) {
      return new NextResponse("Companion ID required!", { status: 400 });
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      !src ||
      !name ||
      !description ||
      !instructions ||
      !seed ||
      !categoryId
    ) {
      return new NextResponse("Missing Required Fields!", { status: 400 });
    }

    // Checking for Subscription
    const isPro = await checkSubscription();
    if (!isPro) {
      return new NextResponse("Pro Subscription required!", { status: 403 });
    }

    const companion = await prismaDB.companion.update({
      where: {
        id: params.companionId,
        userId: user.id,
      },
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        description,
        instructions,
        seed,
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log("Companion PATCH Error", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { companionId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Internal Server Error", { status: 401 });
    }

    const companion = await prismaDB.companion.delete({
      where: {
        userId: userId,
        id: params.companionId,
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log("Companion DELETE Error", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
