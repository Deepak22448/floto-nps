"use client";

import { useState } from "react";
import { NPSForm } from "@/components/nps-form";
import { Chat } from "@/components/chat";

export default function Home() {
  const { npsScore, showChat, handleNPSSubmit } = useHome();
  return (
    <>
      {npsScore !== null && showChat ? (
        <Chat npsScore={npsScore} />
      ) : (
        <NPSForm onSubmit={handleNPSSubmit} isSubmitted={npsScore !== null} />
      )}
    </>
  );
}

const useHome = () => {
  const [npsScore, setNpsScore] = useState<number | null>(null);
  const [showChat, setShowChat] = useState(false);

  const handleNPSSubmit = (score: number) => {
    setNpsScore(score);
    // Small delay for smooth transition
    setTimeout(() => {
      setShowChat(true);
    }, 500);
  };

  return {
    npsScore,
    showChat,
    handleNPSSubmit,
  };
};
