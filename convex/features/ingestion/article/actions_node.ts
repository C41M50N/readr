"use node";

import { internalAction } from "@convex/_generated/server";
import { firecrawl } from "@convex/lib/firecrawl";
import * as llm from "@convex/lib/llm";
import { ArticleMetadata } from "@convex/schema";
import { v } from "convex/values";
import z from "zod";

export const getArticleMetadata = internalAction({
  args: { url: v.string(), html: v.string() },
  returns: ArticleMetadata,
  handler: async (_, args) => {
    const { title, description, author, publish_date } =
      await llm.generate_structured_data({
        model: "gpt-4.1-nano-2025-04-14",
        system_prompt:
          "You are an expert at extracting metadata from articles. When extracting dates, convert them to YYYY-MM-DD format.",
        user_prompt: `Extract metadata from the following article: ${args.html}`,
        schema: z.object({
          title: z.string(),
          description: z.string().optional(),
          author: z.string().optional(),
          publish_date: z.string().optional(),
        }),
        log_key: "extract-meta",
      });

    const doc = await firecrawl.scrape(args.url, { formats: ["summary"] });
    const cover_img = doc.metadata?.ogImage;
    const favicon = doc.metadata?.favicon as string | undefined;
    const summary = doc.summary;

    return {
      title,
      description,
      author,
      publish_date,
      cover_img,
      favicon,
      summary,
    }
  }
});

export const getArticleContent = internalAction({
  args: { url: v.string(), html: v.string() },
  returns: v.string(),
  handler: async (_, args) => {
    const markdown = await llm.generate_text({
      model: "gpt-4.1-mini-2025-04-14",
      system_prompt:
        "You are an expert at converting HTML content to clean, well-formatted Markdown. Remove any unnecessary elements such as ads, navigation bars, and footers. Focus on the main content of the article.",
      user_prompt: `Convert the following HTML content to Markdown:\n\n${args.html}`,
      log_key: "html-to-md",
    });

    return markdown;
  }
});
