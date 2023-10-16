"use client";

import { Button } from "@/shadcn-ui/ui/button";
import { Companion, Message } from "@prisma/client";
import { useRouter } from "next/navigation";
import {
  LuChevronLeft,
  LuFileEdit,
  LuMessageSquare,
  LuMoreVertical,
  LuTrash,
} from "react-icons/lu";
import BotAvatar from "./BotAvatar";
import { useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shadcn-ui/ui/dropdown-menu";
import { useToast } from "@/shadcn-ui/ui/use-toast";
import axios from "axios";

interface ChatHeaderProps {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

export default function ChatHeader({ companion }: ChatHeaderProps) {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();

  const deleteHandler = async () => {
    try {
      await axios.delete(`/api/companion/${companion.id}`);

      toast({
        description: `Companion ${companion.name} deleted successfully!`,
      });

      router.refresh();
      router.push("/");
    } catch (error) {
      toast({
        description: "Something went wrong!",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="flex w-full justify-between items-center border-b border-primary/10 pb-4 ">
      <section className="flex gap-x-2 items-center">
        <Button onClick={() => router.back()} size={"icon"} variant={"ghost"}>
          <LuChevronLeft className="h-8 w-8" />
        </Button>

        <BotAvatar src={companion.src} />
        <div className="flex flex-col gap-y-1">
          <section className="flex items-center gap-x-2">
            <p className="font-bold">{companion.name}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <LuMessageSquare className={"w-3 h-3 mr-1"} />
              {companion._count.messages}
            </div>
          </section>
          <p className="text-xs text-muted-foreground ">
            created by {companion.userName}
          </p>
        </div>
      </section>
      {user?.id === companion.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant={"secondary"} size={"icon"}>
              <LuMoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => router.push(`/companion/${companion.id}`)}
            >
              <LuFileEdit className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={deleteHandler}>
              <LuTrash className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}
