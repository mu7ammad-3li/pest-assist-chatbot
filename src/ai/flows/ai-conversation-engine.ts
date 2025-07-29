'use server';

/**
 * @fileOverview An AI conversation engine for pest control product business.
 *
 * - aiConversationEngine - A function that handles the conversation with Gemini 1.5 Pro.
 * - AiConversationEngineInput - The input type for the aiConversationEngine function.
 * - AiConversationEngineOutput - The return type for the aiConversationEngine function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiConversationEngineInputSchema = z.object({
  message: z.string().describe('The message from the user.'),
  userId: z.string().describe('The ID of the user.'),
  platform: z.string().describe('The platform the user is using (e.g., whatsapp, messenger).'),
  sessionData: z.record(z.string(), z.any()).describe('Session data to maintain conversation context.'),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).describe('The conversation history.'),
});
export type AiConversationEngineInput = z.infer<typeof AiConversationEngineInputSchema>;

const AiConversationEngineOutputSchema = z.object({
  response: z.string().describe('The response from the AI.'),
  updatedSessionData: z
    .string()
    .json()
    .describe(
      'The updated session data as a JSON string. This can be a flat key-value pair object.'
    )
    .transform(value => value as Record<string, any>),
});
export type AiConversationEngineOutput = z.infer<typeof AiConversationEngineOutputSchema>;

export async function aiConversationEngine(input: AiConversationEngineInput): Promise<AiConversationEngineOutput> {
  return aiConversationEngineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiConversationEnginePrompt',
  input: {schema: AiConversationEngineInputSchema},
  output: {schema: AiConversationEngineOutputSchema},
  prompt: `You are an AI-powered chatbot system for a pest control product business. Your goal is to assist customers with their pest control needs, provide product recommendations, answer questions, and guide them through the ordering process.

Follow these instructions:
- Use a professional but friendly tone.
- Demonstrate expert knowledge in pest control.
- Be proactive in offering solutions.
- Focus on lead generation and sales conversion.

Use the following session parameters to maintain context and personalize the conversation:
{{{sessionData}}}

Here's the conversation history:
{{#each conversationHistory}}
{{role}}: {{content}}
{{/each}}

User message: {{{message}}}

Generate a response based on the conversation history, session parameters, and the user's message. Also, update the session data based on the conversation and return it in the updatedSessionData field.

Example updatedSessionData:
{
  "isReturningCustomer": true,
  "inquiredProducts": ["product1", "product2"]
}

Ensure the response is relevant to the pest control business and aligns with the defined business logic. Consider the user's inquiry, the current session state, and any available knowledge base information to provide the most helpful and informative response.`,
});

const aiConversationEngineFlow = ai.defineFlow(
  {
    name: 'aiConversationEngineFlow',
    inputSchema: AiConversationEngineInputSchema,
    outputSchema: AiConversationEngineOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
