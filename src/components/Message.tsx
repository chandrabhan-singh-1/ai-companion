import { cn } from "@/lib/utils";
import { BeatLoader } from "react-spinners";
import { useToast } from "@/shadcn-ui/ui/use-toast";
import { useTheme } from "next-themes";
import BotAvatar from "./BotAvatar";
import UserAvatar from "./UserAvatar";
import { Button } from "@/shadcn-ui/ui/button";
import { LuCopy } from "react-icons/lu";

export interface MessageProps {
  role: "system" | "user";
  content?: string;
  isLoading?: boolean;
  src?: string;
}

const Message = ({ role, content, isLoading, src }: MessageProps) => {
  const { toast } = useToast();
  const { theme } = useTheme();

  const onCopy = () => {
    if (!content) {
      return;
    }

    navigator.clipboard.writeText(content);
    toast({
      description: "Message copied to clipboard!",
    });
  };

  return (
    <div
      className={cn(
        `group flex items-start gap-x-3 py-4 w-full`,
        role === "user" && "justify-end"
      )}
    >
      {role !== "user" && src && <BotAvatar src={src} />}
      <div className="rounded-md px-4 py-2 max-w-sm bg-primary/10 ">
        {isLoading ? (
          <BeatLoader size={5} color={theme === "light" ? "black" : "white"} />
        ) : (
          content
        )}
      </div>
      {role === "user" && <UserAvatar />}
      {role !== "user" && !isLoading && (
        <Button
          onClick={onCopy}
          size={"icon"}
          variant={"ghost"}
          className="opacity-0 group-hover:opacity-100 transition"
        >
          <LuCopy className={"w-4 h-4"} />
        </Button>
      )}
    </div>
  );
};

export default Message;
