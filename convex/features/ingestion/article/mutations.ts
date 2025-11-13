import { internal } from "@convex/_generated/api";
import { internalMutation } from "@convex/_generated/server";
import { workflow } from "@convex/index";
import { ArticleMetadata } from "@convex/schema";
import { v } from "convex/values";
import invariant from "tiny-invariant";

export const startIngestArticleWorkflow = internalMutation({
  args: { url: v.string() },
  handler: async (ctx, args) => {
    await workflow.start(
      ctx,
      internal.features.ingestion.article.workflows.ingestArticleWorkflow,
      { url: args.url }
    );
  }
});

export const createInitialArticleContent = internalMutation({
  args: { url: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("contents", {
      url: args.url,
      type: "article",
      ingestionStatus: "pending",
      ingestionStartedAt: Date.now(),
    });
  }
});

export const startGetAndStoreArticleMetadataWorkflow = internalMutation({
  args: { url: v.string(), html: v.string() },
  handler: async (ctx, args) => {
    await workflow.start(
      ctx,
      internal.features.ingestion.article.workflows.getAndStoreArticleMetadataWorkflow,
      { url: args.url, html: args.html }
    );
  }
});

export const startGetAndStoreArticleContentWorkflow = internalMutation({
  args: { url: v.string(), html: v.string() },
  handler: async (ctx, args) => {
    await workflow.start(
      ctx,
      internal.features.ingestion.article.workflows.getAndStoreArticleContentWorkflow,
      { url: args.url, html: args.html }
    );
  }
});

export const storeArticleMetadata = internalMutation({
  args: {
    url: v.string(),
    metadata: ArticleMetadata,
  },
  handler: async (ctx, args) => {
    const content = await ctx.runQuery(internal.features.ingestion.article.queries.getArticleContentByUrl, { url: args.url });
    invariant(content, `Content not found for URL: ${args.url}`);

    const isContentSet = !!content.markdown;

    if (isContentSet) {
      await ctx.db.patch(content._id, {
        metadata: args.metadata,
        ingestionStatus: "completed",
        ingestionCompletedAt: Date.now(),
      });
    } else {
      await ctx.db.patch(content._id, {
        metadata: args.metadata,
        ingestionStatus: "converting",
      });
    }
  }
});

export const storeArticleContent = internalMutation({
  args: {
    url: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.runQuery(internal.features.ingestion.article.queries.getArticleContentByUrl, { url: args.url });
    invariant(existing, `Content not found for URL: ${args.url}`);

    const isMetadataSet = !!existing.metadata;

    if (isMetadataSet) {
      await ctx.db.patch(existing._id, {
        markdown: args.content,
        ingestionStatus: "completed",
        ingestionCompletedAt: Date.now(),
      });
    } else {
      await ctx.db.patch(existing._id, {
        markdown: args.content,
        ingestionStatus: "extracting",
      });
    }
  }
});
