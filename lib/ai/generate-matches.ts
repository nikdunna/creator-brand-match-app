import OpenAI from "openai";
import { ANDY_SYSTEM_PROMPT, buildUserPrompt } from "./system-prompt";
import {
  aiResponseSchema,
  type AIResponse,
  type CreateSessionInput,
} from "@/lib/validation/session";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MAX_RETRIES = 2;

export async function generateCreatorMatches(
  input: CreateSessionInput,
): Promise<AIResponse> {
  const userPrompt = buildUserPrompt(input);

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: ANDY_SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.8,
    });

    const raw = JSON.parse(completion.choices[0].message.content ?? "{}");
    const result = aiResponseSchema.safeParse(raw);

    if (result.success) {
      return result.data;
    }
  }

  throw new Error("Failed to generate valid creator matches");
}
