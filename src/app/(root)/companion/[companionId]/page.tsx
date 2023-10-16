import CompanionForm from "@/components/CompanionForm";
import prismaDB from "@/lib/prismaDB";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import React from "react";

interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
}

const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {
  // TODO: Check Subscription

  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await prismaDB.companion.findUnique({
    where: {
      id: params.companionId,
      userId,
    },
  });

  const categories = await prismaDB.category.findMany();

  return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionIdPage;
