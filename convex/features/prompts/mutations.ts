import { mutation } from "@convex/_generated/server";
import { v } from "convex/values";
import { getUserId } from "../auth/helpers";

export const addPrompt = mutation({
  args: {
    title: v.string(),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    await ctx.db.insert("prompts", {
      userId: userId,
      title: args.title,
      text: args.text,
    });
  }
})
