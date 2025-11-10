import z from "zod";

const envSchema = z.object({
  FIRECRAWL_API_KEY: z.string().min(1, "FIRECRAWL_API_KEY is required"),
  REPLICATE_API_KEY: z.string().min(1, "REPLICATE_API_KEY is required"),
  OCTANE_BASE_URL: z.string().min(1, "OCTANE_BASE_URL is required"),
  OCTANE_AUTH_TOKEN: z.string().min(1, "OCTANE_AUTH_TOKEN is required"),
  GEMINI_API_KEY: z.string().min(1, "GEMINI_API_KEY is required"),
  OPENAI_API_KEY: z.string().min(1, "OPENAI_API_KEY is required"),
});

export const env = envSchema.parse(process.env);
