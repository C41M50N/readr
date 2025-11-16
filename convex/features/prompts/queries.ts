import { query } from "@convex/_generated/server";
import { getUserId } from "../auth/helpers";

export const getMyPrompts = query({
  handler: async (ctx) => {
    const userId = await getUserId(ctx);

    const prompts = await ctx.db
      .query("prompts")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    return prompts;
  }
});
