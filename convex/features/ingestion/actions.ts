import { action } from "@convex/_generated/server";
import { internal } from "@convex/_generated/api";
import { v } from "convex/values";
import { isYoutubeURL, normalizeURL, normalizeYoutubeURL } from "./helpers";

export const ingestContentByUrl = action({
  args: { url: v.string() },
  handler: async (ctx, args) => {
    const normalizedUrl = await normalizeURL(args.url);
    if (!normalizedUrl) {
      console.error(`Failed to normalize URL: ${args.url}`);
      throw new Error("Invalid or non-HTML URL provided for ingestion.");
    }
    
    const existing = await ctx.runQuery(internal.features.ingestion.queries.getContentByUrl, { url: normalizedUrl });
    if (existing) {
      console.log(`Content already ingested for URL: ${normalizedUrl}`);
      // TODO: kickoff workflow to add content to user's library
      return;
    }

    if (isYoutubeURL(normalizedUrl)) {
      await ctx.runMutation(internal.features.ingestion.video.mutations.startIngestVideoWorkflow, { url: normalizeYoutubeURL(normalizedUrl) });
    } else {
      await ctx.runMutation(internal.features.ingestion.article.mutations.startIngestArticleWorkflow, { url: normalizedUrl });
    }

    // TODO: kickoff appropriate ingestion workflow based on content type
  }
});
