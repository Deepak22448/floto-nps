"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleStop, Send } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { Messages } from "./messages";
import { useEffect } from "react";
import { ChatHeader } from "./chat-header";

interface ChatInterfaceProps {
  npsScore: number;
}

export function Chat({ npsScore }: ChatInterfaceProps) {
  const {
    messages,
    error,
    reload,
    handleInputChange,
    input,
    handleSubmit,
    InputIcon,
    status,
    stop,
  } = useChatInterface({ npsScore });
  return (
    <div className="flex flex-col min-w-0 h-dvh bg-background">
      <ChatHeader npsScore={npsScore} />
      <Messages messages={messages} error={error} retry={reload} />
      <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
        <Input value={input} onChange={handleInputChange} />
        <Button
          type="submit"
          onClick={status === "ready" ? handleSubmit : stop}
          className="flex-shrink-0"
        >
          <InputIcon className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
}

const useChatInterface = ({
  npsScore,
}: Pick<ChatInterfaceProps, "npsScore">) => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    stop,
    error,
    append,
    reload,
  } = useChat({
    body: {
      npsScore,
    },
    onError(error) {
      console.log(error);
    },
  });

  useEffect(() => {
    // send initial message.
    append({
      role: "user",
      content: `NPS Score: ${npsScore}`,
    });
  }, [npsScore]);

  const InputIcon = status === "ready" ? Send : CircleStop;

  return {
    messages: messages.slice(1),
    error,
    reload,
    input,
    handleInputChange,
    handleSubmit,
    InputIcon,
    status,
    stop,
  };
};
