import { internal } from "@convex/_generated/api";
import { workflow } from "@convex/index";
import { v } from "convex/values";

export const ingestArticleWorkflow = workflow.define({
  args: { url: v.string() },
  handler: async (step, args) => {
    const cleanHTML = await step.runAction(internal.features.ingestion.article.actions.getCleanHtml, { url: args.url });
    await step.runMutation(internal.features.ingestion.article.mutations.createInitialArticleContent, { url: args.url });
    await Promise.all([
      step.runMutation(internal.features.ingestion.article.mutations.startGetAndStoreArticleMetadataWorkflow, { url: args.url, html: cleanHTML }),
      step.runMutation(internal.features.ingestion.article.mutations.startGetAndStoreArticleContentWorkflow, { url: args.url, html: cleanHTML }),
    ]);
  }
});

export const getAndStoreArticleMetadataWorkflow = workflow.define({
  args: { url: v.string(), html: v.string() },
  handler: async (step, args) => {
    const metadata = await step.runAction(internal.features.ingestion.article.actions_node.getArticleMetadata, { url: args.url, html: args.html });
    await step.runMutation(internal.features.ingestion.article.mutations.storeArticleMetadata, { url: args.url, metadata });
  }
});

export const getAndStoreArticleContentWorkflow = workflow.define({
  args: { url: v.string(), html: v.string() },
  handler: async (step, args) => {
    const content = await step.runAction(internal.features.ingestion.article.actions_node.getArticleContent, { url: args.url, html: args.html });
    await step.runMutation(internal.features.ingestion.article.mutations.storeArticleContent, { url: args.url, content });
  }
});
