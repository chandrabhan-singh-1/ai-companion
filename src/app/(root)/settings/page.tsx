import React from "react";
import { checkSubscription } from "@/lib/subscription";
import SubscriptionBtn from "@/components/SubscriptionBtn";
import { Separator } from "@/shadcn-ui/ui/separator";

const SettingsPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div className="h-full p-4 space-y-3 ml-2">
      <h1 className="text-2xl font-medium">Settings</h1>
      <Separator />
      <section className="text-muted-foreground text-md ml-2">
        {isPro
          ? "You are currently on a PRO plan."
          : "You are currently on a FREE plan."}
      </section>
      <SubscriptionBtn isPro={isPro} />
    </div>
  );
};

export default SettingsPage;
