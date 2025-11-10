import { internalQuery } from "@convex/_generated/server";
import { ArticleContent, VideoContent } from "@convex/schema";
import { v } from "convex/values";

export const getContentByUrl = internalQuery({
  args: { url: v.string() },
  returns: v.union(ArticleContent, VideoContent, v.null()),
  handler: async (ctx, args) => {
    return await ctx.db
      .query("contents")
      .withIndex("by_url", (q) => q.eq("url", args.url))
      .first();
  }
});
