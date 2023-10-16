"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { LuHome, LuPlus, LuSettings } from "react-icons/lu";
import { useProModal } from "@/hooks/useProModal";

const routes = [
  {
    icon: LuHome,
    label: "Home",
    href: "/",
    pro: false,
  },
  {
    icon: LuPlus,
    label: "Create",
    href: "/companion/new",
    pro: true,
  },
  {
    icon: LuSettings,
    label: "Settings",
    href: "/settings",
    pro: false,
  },
];

interface SidebarProps {
  isPro: boolean;
}

const Sidebar = ({ isPro }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const proModal = useProModal();

  const onNavigate = (url: string, isProtected: boolean) => {
    if (isProtected && !isPro) {
      return proModal.onOpen();
    }

    return router.push(url);
  };

  return (
    <main className="space-y-4 flex flex-col justify-center items-center h-full text-primary bg-secondary mx-auto">
      <section className="flex p-1  flex-1 justify-items-center">
        <section className=" space-y-2">
          {routes.map((route) => (
            <article
              key={route.href}
              onClick={() => onNavigate(route.href, route.pro)}
              className={cn(
                "text-muted-foreground text-sm group flex p-2 w-16 justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                pathname === route.href && "bg-primary/10 text-primary"
              )}
            >
              <div className="flex flex-col gap-y-2 items-center m-auto flex-1 ">
                <route.icon className="h-5 w-5" />
                {route.label}
              </div>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
};

export default Sidebar;
