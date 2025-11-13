import { internalAction } from "@convex/_generated/server";
import { env } from "@convex/env";
import { v } from "convex/values";

export const getCleanHtml = internalAction({
  args: { url: v.string() },
  handler: async (_, args) => {
    const url = new URL(`${env.ORION_BASE_URL}/clean-html`);
    url.searchParams.set("url", args.url);
    const response = await fetch(url.toString(), { headers: { Authorization: `Bearer ${env.ORION_AUTH_TOKEN}` } });
    const cleanHTML = await response.text();
    return cleanHTML;
  }
});
