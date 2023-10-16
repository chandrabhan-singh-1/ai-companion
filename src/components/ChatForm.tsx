import React, { ChangeEvent, FormEvent } from "react";
import { ChatRequestOptions } from "ai";
import { Input } from "@/shadcn-ui/ui/input";
import { Button } from "@/shadcn-ui/ui/button";
import { LuSendHorizonal } from "react-icons/lu";

interface ChatFormProps {
  isLoading: boolean;
  input: string;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
}

const ChatForm = ({
  input,
  isLoading,
  onSubmit,
  handleInputChange,
}: ChatFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="border-t border-primary/10 py-4 flex items-center gap-x-2"
    >
      <Input
        disabled={isLoading}
        value={input}
        onChange={handleInputChange}
        placeholder={"Type a message..."}
        className="rounded-lg bg-primary/10"
      />
      <Button disabled={isLoading} variant={"ghost"}>
        <LuSendHorizonal className="h-6 w-6" />
      </Button>
    </form>
  );
};

export default ChatForm;
