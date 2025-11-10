import { internal } from "@convex/_generated/api";
import { workflow } from "@convex/index";
import { v } from "convex/values";

export const getAndStoreVideoMetadata = workflow.define({
  args: { url: v.string() },
  handler: async (step, args) => {
    const metadata = await step.runAction(internal.features.ingestion.video.actions_node.getVideoMetadata, { url: args.url });
    await step.runMutation(internal.features.ingestion.video.mutations.storeVideoMetadata, { url: args.url, metadata });
  }
});

export const getAndStoreVideoTranscript = workflow.define({
  args: { url: v.string() },
  handler: async (step, args) => {
    const videoAudioURL = await step.runAction(internal.features.ingestion.video.actions.getVideoAudioURL, { url: args.url });
    const transcript = await step.runAction(internal.features.ingestion.video.actions_node.transcribeVideoAudio, { audioUrl: videoAudioURL });
    const improvedTranscript = await step.runAction(internal.features.ingestion.video.actions_node.improveTranscript, { transcript });
    await step.runMutation(internal.features.ingestion.video.mutations.storeVideoTranscript, { url: args.url, transcript: improvedTranscript });
  }
});

export const ingestVideoWorkflow = workflow.define({
  args: { url: v.string() },
  handler: async (step, args) => {
    await step.runMutation(internal.features.ingestion.video.mutations.createInitialVideoContent, { url: args.url } );
    await Promise.all([
      step.runMutation(internal.features.ingestion.video.mutations.startGetAndStoreVideoMetadataWorkflow, { url: args.url }),
      step.runMutation(internal.features.ingestion.video.mutations.startGetAndStoreVideoTranscriptWorkflow, { url: args.url }),
    ]);
  }
})
