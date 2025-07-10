import { Bot } from "lucide-react";
import { FC } from "react";
import { getScoreColor, getScoreLabel } from "@/lib/utils";

export const ChatHeader: FC<{ npsScore: number }> = ({ npsScore }) => {
  const label = getScoreLabel(npsScore);
  const color = getScoreColor(npsScore);

  return (
    <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 border-b">
      <div className="flex items-center justify-between space-x-3 w-full">
        <div className="w-fit">
          <Bot className="mx-auto" />
        </div>
        <div>
          <div className="flex items-center space-x-2 mt-1">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}
            >
              NPS: {npsScore} ({label})
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
