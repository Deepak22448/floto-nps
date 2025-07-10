import { type NextRequest, NextResponse } from "next/server";
import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import {
  createContinuationPrompt,
  createInitialPrompt,
  createSystemPrompt,
} from "@/lib/prompts";

export async function POST(req: NextRequest) {
  try {
    const { messages, npsScore } = await req.json();
    const isInitial = messages.length === 1;
    const systemPrompt = createSystemPrompt(npsScore);
    const prompt = isInitial
      ? createInitialPrompt(npsScore)
      : createContinuationPrompt(messages, npsScore);

    const stream = streamText({
      model: google("gemini-1.5-flash"),
      system: systemPrompt,
      prompt,
    });

    return stream.toDataStreamResponse();
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
