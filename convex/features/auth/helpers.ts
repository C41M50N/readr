import { QueryCtx } from "@convex/_generated/server";

export async function getUserId(ctx: QueryCtx): Promise<string> {
  const user = await ctx.auth.getUserIdentity();
  const userId = user ? user.email : null;
  if (!userId) {
    throw new Error("Not authenticated");
  }
  return userId;
};
