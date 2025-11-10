import { internalAction } from "@convex/_generated/server";
import { env } from "@convex/env";
import { v } from "convex/values";

export const getVideoAudioURL = internalAction({
  args: { url: v.string() },
  returns: v.string(),
  handler: async (_, args) => {
    const url = new URL(`${env.OCTANE_BASE_URL}/yt-video-audio`);
    url.searchParams.set("url", args.url);
    const response = await fetch(url.toString(), { headers: { Authorization: `Bearer ${env.OCTANE_AUTH_TOKEN}` } });
    const data = (await response.json()) as { url: string };
    return data.url;
  }
});
