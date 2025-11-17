import { google } from '@ai-sdk/google';
import { createFileRoute } from '@tanstack/react-router'
import { convertToModelMessages, streamText } from 'ai';

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request}) => {
        const { messages } = await request.json();
        const result = streamText({
          model: google('gemini-2.5-flash-lite-preview-09-2025'),
          messages: convertToModelMessages(messages),
          temperature: 0.7,
          system: `You are a helpful assistant that provides clear and concise answers to user questions. Use markdown formatting where appropriate.`,
        });
        return result.toUIMessageStreamResponse();
      },
    },
  },
})