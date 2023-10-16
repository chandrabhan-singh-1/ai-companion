"use client";

import React, { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LuMenu, LuSparkles } from "react-icons/lu";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/shadcn-ui/ui/button";
import { ThemeToggler } from "./ThemeToggler";
import MobileSidebar from "./MobileSidebar";
import { useProModal } from "@/hooks/useProModal";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

interface NavbarProps {
  isPro: boolean;
}

const Navbar = ({ isPro }: NavbarProps) => {
  const [mounted, setMounted] = useState(false);

  const proModal = useProModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed h-16 w-full z-20 flex justify-between items-center py-2 px-3 border-b border-primary/20 bg-secondary">
      <div className="flex items-center ">
        <MobileSidebar isPro={isPro} />
        <Link href={"/"}>
          <h1
            className={cn(
              "block text-xl md:text-3xl font-bold text-primary",
              font.className
            )}
          >
            AI Companion
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3 ">
        <ThemeToggler />
        {!isPro && (
          <Button
            size={"sm"}
            variant={"premium"}
            onClick={proModal.onOpen}
            className="border-2"
          >
            Upgrade
            <LuSparkles className="h-4 w-4 fill-white text-white ml-2" />
          </Button>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
