import { internalQuery } from "@convex/_generated/server";
import { VideoContent } from "@convex/schema";
import { Infer, v } from "convex/values";

export const getVideoContentByUrl = internalQuery({
  args: { url: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("contents")
      .withIndex("by_url", (q) => q.eq("url", args.url))
      .filter((q) => q.eq(q.field("type"), "video"))
      .first() as Infer<typeof VideoContent> | null;
  },
});