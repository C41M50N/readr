import { internal } from "@convex/_generated/api";
import { internalMutation } from "@convex/_generated/server";
import { workflow } from "@convex/index";
import { v } from "convex/values";
import invariant from "tiny-invariant";

export const startIngestVideoWorkflow = internalMutation({
  args: { url: v.string() },
  handler: async (ctx, args) => {
    await workflow.start(
      ctx,
      internal.features.ingestion.video.workflows.ingestVideoWorkflow,
      { url: args.url }
    );
  }
});

export const startGetAndStoreVideoMetadataWorkflow = internalMutation({
  args: { url: v.string() },
  handler: async (ctx, args) => {
    await workflow.start(
      ctx,
      internal.features.ingestion.video.workflows.getAndStoreVideoMetadata,
      { url: args.url }
    );
  }
});

export const startGetAndStoreVideoTranscriptWorkflow = internalMutation({
  args: { url: v.string() },
  handler: async (ctx, args) => {
    await workflow.start(
      ctx,
      internal.features.ingestion.video.workflows.getAndStoreVideoTranscript,
      { url: args.url }
    );
  }
});

export const createInitialVideoContent = internalMutation({
  args: { url: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("contents", {
      url: args.url,
      type: "video",
      ingestionStatus: "pending",
      ingestionStartedAt: Date.now(),
    });
  }
});

export const storeVideoMetadata = internalMutation({
  args: {
    url: v.string(),
    metadata: v.object({
      title: v.string(),
      channel_name: v.string(),
      channel_url: v.string(),
      thumbnail: v.string(),
      favicon: v.string(),
      publish_date: v.string(),
      duration: v.optional(v.number()),
    }),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.runQuery(internal.features.ingestion.video.queries.getVideoContentByUrl, { url: args.url });
    invariant(existing, `Content not found for URL: ${args.url}`);

    const isTranscriptSet = !!existing.transcript;

    if (isTranscriptSet) {
      await ctx.db.patch(existing._id, {
        metadata: args.metadata,
        ingestionStatus: "completed",
        ingestionCompletedAt: Date.now(),
      });
    } else {
      await ctx.db.patch(existing._id, {
        metadata: args.metadata,
        ingestionStatus: "extracting",
      });
    }
  }
});

export const storeVideoTranscript = internalMutation({
  args: { url: v.string(), transcript: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.runQuery(internal.features.ingestion.video.queries.getVideoContentByUrl, { url: args.url });
    invariant(existing, `Content not found for URL: ${args.url}`);

    const isMetadataSet = !!existing.metadata;

    if (isMetadataSet) {
      await ctx.db.patch(existing._id, {
        transcript: args.transcript,
        ingestionStatus: "completed",
        ingestionCompletedAt: Date.now(),
      });
    } else {
      await ctx.db.patch(existing._id, {
        transcript: args.transcript,
        ingestionStatus: "extracting",
      });
    }
  }
});
