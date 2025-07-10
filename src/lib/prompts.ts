import { Message } from "ai";
import { getNPSCategory, NPSCategory } from "./utils";

export function createSystemPrompt(npsScore: number): string {
  const basePrompt = `\n
    - Your name is Floto NPS Agent.
    - Only say Hi with something don't say Hi company name.
    - You are a helpful customer success agent conducting an NPS follow-up conversation. 
    - Be empathetic, professional, and focused on understanding the customer's experience. 
    - Ask follow-up questions to gather actionable insights. Keep responses concise but meaningful.
  \n`;

  const category = getNPSCategory(npsScore);

  const categoryPrompts = {
    detractor: `\n
      - The customer is a Detractor (score ${npsScore})
      - Be especially empathetic and focus on understanding their concerns and how you can improve.
    \n`,
    passive: `\n 
      - The customer is Passive (score ${npsScore}). 
      - Focus on understanding what would make their experience exceptional.
    \n`,
    promoter: `\n
      - The customer is a Promoter (score ${npsScore})
      - Celebrate their positive experience while gathering insights about what they loved most.
    \n`,
  };

  return basePrompt + categoryPrompts[category];
}

export function createInitialPrompt(npsScore: number): string {
  const category = getNPSCategory(npsScore);

  const initialPrompts: Record<NPSCategory, string> = {
    detractor: `\n
      - The customer gave an NPS score of ${npsScore}
      - Generate a warm, empathetic initial message asking them about their experience and what led to this rating. 
      - Show that you genuinely care about their feedback and want to make things better.
    \n`,
    passive: `\n
      - The customer gave an NPS score of ${npsScore}. 
      - Generate a friendly initial message asking them what would make their experience even better and what specific areas could be improved.
    \n`,
    promoter: `\n
      - The customer gave an NPS score of ${npsScore}. 
      - Generate an appreciative initial message thanking them for their high rating and asking what specifically made their experience great so you can continue delivering excellent service.`,
  };

  return initialPrompts[category];
}

export function createContinuationPrompt(
  messages: Message[],
  npsScore: number
): string {
  const conversationHistory = messages
    .map(
      (msg: Message) =>
        `${msg.role === "user" ? "Customer" : "Agent"}: ${msg.content}`
    )
    .join("\n");

  return `\n
    - Continue this NPS follow-up conversation (customer's NPS score was ${npsScore}):
    - ${conversationHistory}
    - Respond as the customer success agent. 
    - Be helpful, ask relevant follow-up questions, and focus on gathering actionable insights about their experience.
    \n`;
}
