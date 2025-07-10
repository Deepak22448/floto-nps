"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { cn, getScoreColor, getScoreLabel } from "@/lib/utils";

interface NPSFormProps {
  onSubmit: (score: number) => void;
  isSubmitted: boolean;
}

export function NPSForm({ onSubmit, isSubmitted }: NPSFormProps) {
  const { isAnimating, handleScoreSelect, selectedScore } = useNPSForm({
    onSubmit,
  });

  if (isSubmitted && isAnimating) {
    return (
      <div className="p-12 text-center">
        <div className="animate-pulse">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Thank you for your feedback!
          </h3>
          <p className="text-gray-600">Starting conversation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center md:text-left mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Customer Feedback
            </h1>
            <p className="text-gray-600">
              Help us improve by sharing your experience
            </p>
          </header>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <Card className="border-0 shadow-none">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  How likely are you to recommend us to a friend or colleague?
                </CardTitle>
                <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
                  <span className="text-destructive">Not at all likely</span>
                  <span className="text-green-500/80">Extremely likely</span>
                </div>
              </CardHeader>

              <CardContent className="pb-8">
                <div className="grid grid-cols-4 lg:grid-cols-11 md:grid-cols-7  gap-2 mb-6">
                  {Array.from({ length: 11 }, (_, i) => (
                    <Button
                      key={i}
                      variant={selectedScore === i ? "default" : "outline"}
                      className={cn(
                        "h-12 w-full text-lg font-semibold transition-all duration-200",
                        selectedScore === i
                          ? getScoreColor(i)
                          : "hover:scale-105 hover:shadow-md"
                      )}
                      onClick={() => handleScoreSelect(i)}
                    >
                      {i}
                    </Button>
                  ))}
                </div>

                {selectedScore !== null && (
                  <div className="text-center animate-fade-in">
                    <div
                      className={cn(
                        "inline-flex items-center px-4 py-2 rounded-full text-sm font-medium",
                        getScoreColor(selectedScore)
                      )}
                    >
                      Score: {selectedScore} - {getScoreLabel(selectedScore)}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

const useNPSForm = ({ onSubmit }: Pick<NPSFormProps, "onSubmit">) => {
  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleScoreSelect = (score: number) => {
    setSelectedScore(score);
    setIsAnimating(true);

    // Submit after animation
    setTimeout(() => {
      onSubmit(score);
    }, 300);
  };
  return {
    selectedScore,
    isAnimating,
    handleScoreSelect,
  };
};
