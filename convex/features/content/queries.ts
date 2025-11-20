import { Id } from "@convex/_generated/dataModel";
import { query } from "@convex/_generated/server";
import { v } from "convex/values";

export const getInboxContents = query({
  args: {},
  handler: async (ctx) => {
    const contents = await ctx.db
      .query("contents")
      // .filter((q) => q.eq(q.field("folder"), "inbox"))
      .collect();

    return contents;
  }
})

export const getContentsByIds = query({
  args: { ids: v.array(v.string()) },
  handler: async (ctx, args) => {
    const contents = [];
    for (const id of args.ids) {
      const content = await ctx.db.get(id as Id<"contents">);
      if (content) {
        contents.push(content);
      }
    }
    return contents;
  }
});
