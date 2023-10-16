import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { checkSubscription } from "@/lib/subscription";
import React from "react";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const isPro = await checkSubscription();
  return (
    <div className="h-full">
      <Navbar isPro={isPro} />
      <div className="hidden md:flex mt-16 w-16 flex-col p-0 justify-center fixed items-center inset-y-0">
        <Sidebar isPro={isPro} />
      </div>
      <main className="md:pl-16 pt-16 h-full">{children}</main>
    </div>
  );
};

export default RootLayout;
