"use node";

import { internalAction } from "@convex/_generated/server";
import { firecrawl } from "@convex/lib/firecrawl";
import * as llm from "@convex/lib/llm";
import { replicate } from "@convex/lib/replicate";
import { VideoMetadata } from "@convex/schema";
import { v } from "convex/values";
import { z } from "zod";

export const getVideoMetadata = internalAction({
  args: { url: v.string() },
  returns: VideoMetadata,
  handler: async (_, args) => {
    const doc = await firecrawl.scrape(args.url, { formats: ["summary"] });
    const title = doc.metadata?.ogTitle! as string;
    const thumbnail = doc.metadata?.ogImage! as string;
    const favicon = doc.metadata?.favicon as string;
    const publish_date = doc.metadata?.uploadDate as string;

    const ExtractSchema = z.object({
      channel_name: z.string(),
      channel_url: z.string(),
      duration: z.number(),
    });

    const jsonSchema = z.toJSONSchema(ExtractSchema);
    delete jsonSchema.$schema;
    delete jsonSchema.additionalProperties;

    const { data } = await firecrawl.extract({
      urls: [args.url],
      prompt:
        "Extract the channel name, channel URL, and video duration (in seconds) from the video page.",
      schema: jsonSchema,
    });
    const { channel_name, channel_url, duration } = ExtractSchema.parse(data);

    return {
      title,
      thumbnail,
      favicon,
      publish_date,
      channel_name,
      channel_url,
      duration,
    };
  }
});

export const transcribeVideoAudio = internalAction({
  args: { audioUrl: v.string() },
  returns: v.string(),
  handler: async (_, args) => {
    const result = await replicate.run(
      "vaibhavs10/incredibly-fast-whisper:3ab86df6c8f54c11309d4d1f930ac292bad43ace52d10c80d87eb258b3c9f79c",
      {
        input: {
          task: "transcribe",
          audio: args.audioUrl,
          timestamp: "chunk",
          batch_size: 32,
        }
      }
    ) as { text: string };
    return result.text;
  }
});

export const improveTranscript = internalAction({
  args: { transcript: v.string() },
  returns: v.string(),
  handler: async (_, args) => {
    const improvedTranscript = await llm.generate_text({
      model: "gemini-2.5-flash-lite-preview-06-17",
      system_prompt: "You are a helpful assistant that improves video transcripts by fixing grammar, punctuation, and formatting. Return the improved transcript in markdown format. Add useful headings to break up the content -- use sparingly.",
      user_prompt: `Improve the readability of the following video transcript:\n\n${args.transcript}`,
      log_key: "improve-video-transcript",
    });
    return improvedTranscript;
  }
});
