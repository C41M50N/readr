import { internalQuery } from "@convex/_generated/server";
import { ArticleContent } from "@convex/schema";
import { Infer, v } from "convex/values";

export const getArticleContentByUrl = internalQuery({
  args: { url: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("contents")
      .withIndex("by_url", (q) => q.eq("url", args.url))
      .filter((q) => q.eq(q.field("type"), "article"))
      .first() as Infer<typeof ArticleContent> | null;
  },
});
