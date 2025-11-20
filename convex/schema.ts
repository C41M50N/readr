import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export const CommonContent = v.object({
  _id: v.id('contents'),
  url: v.string(),
  ingestionStatus: v.optional(v.union(
    v.literal("pending"),
    v.literal("extracting"),
    v.literal("converting"),
    v.literal("completed"),
    v.literal("failed")
  )),
  ingestionStartedAt: v.number(),
  ingestionCompletedAt: v.optional(v.number()),
})

export const ArticleMetadata = v.object({
  title: v.string(),
  summary: v.optional(v.string()),
  author: v.optional(v.string()),
  publish_date: v.optional(v.string()),
  description: v.optional(v.string()),
  favicon: v.optional(v.string()),
  cover_img: v.optional(v.string()),
})

export const ArticleContent = v.object({
  ...CommonContent.fields,
  type: v.literal('article'),
  markdown: v.optional(v.string()),
  metadata: v.optional(ArticleMetadata),
})

export const VideoMetadata = v.object({
  title: v.string(),
  channel_name: v.string(),
  channel_url: v.string(),
  thumbnail: v.string(),
  favicon: v.string(),
  publish_date: v.string(),
  duration: v.optional(v.number()),
})

export const VideoContent = v.object({
  ...CommonContent.fields,
  type: v.literal('video'),
  transcript: v.optional(v.string()),
  summary: v.optional(v.string()),
  metadata: v.optional(VideoMetadata),
})

export const MetaContentSchema = v.object({
  title: v.string(),
  description: v.optional(v.union(v.string(), v.null())),
  author: v.optional(v.union(v.string(), v.null())),
  publish_date: v.optional(v.union(v.string(), v.null())),
  duration: v.optional(v.union(v.number(), v.null())),
  thumbnail: v.optional(v.union(v.string(), v.null())),
  favicon: v.optional(v.union(v.string(), v.null())),
})

export default defineSchema({
  contents: defineTable(v.union(ArticleContent, VideoContent)).index('by_url', ['url']),

  prompts: defineTable({
    _id: v.id('prompts'),
    userId: v.string(),
    title: v.string(),
    text: v.string(),
  }).index('by_user', ['userId']),
})
