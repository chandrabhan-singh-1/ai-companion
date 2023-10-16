import { Sheet, SheetContent, SheetTrigger } from "@/shadcn-ui/ui/sheet";
import React from "react";
import { LuMenu } from "react-icons/lu";
import Sidebar from "./Sidebar";

export default function MobileSidebar({ isPro }: { isPro: boolean }) {
  return (
    <Sheet>
      <SheetTrigger>
        <LuMenu className="block md:hidden text-2xl md:text-3xl mr-2" />
      </SheetTrigger>
      <SheetContent side={"left"} className="px-2 bg-secondary pt-10 w-24">
        <Sidebar isPro={isPro} />
      </SheetContent>
    </Sheet>
  );
}
