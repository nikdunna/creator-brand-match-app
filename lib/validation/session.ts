import { z } from "zod";

export const createSessionSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  industry: z.string().min(1, "Industry is required"),
  targetAudience: z.string().min(1, "Target audience is required"),
  creatorCriteria: z.string().min(1, "Creator criteria is required"),
});

export type CreateSessionInput = z.infer<typeof createSessionSchema>;

export const creatorMatchSchema = z.object({
  name: z.string(),
  platform: z.string(),
  handle: z.string(),
  niche: z.string(),
  audienceSize: z.string(),
  oneLiner: z.string(),
  matchReason: z.string(),
});

export const aiResponseSchema = z.object({
  creators: z.array(creatorMatchSchema).min(3).max(5),
});

export type CreatorMatch = z.infer<typeof creatorMatchSchema>;
export type AIResponse = z.infer<typeof aiResponseSchema>;
