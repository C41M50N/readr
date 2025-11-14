import { query } from "@convex/_generated/server";

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
