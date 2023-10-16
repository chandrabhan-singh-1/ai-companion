import prismaDB from "@/lib/prismaDB";
import { checkSubscription } from "@/lib/subscription";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user = await currentUser();

    const { src, name, description, instructions, seed, categoryId } = body;

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

    const companion = await prismaDB.companion.create({
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
    console.log("Companion POST Error", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
