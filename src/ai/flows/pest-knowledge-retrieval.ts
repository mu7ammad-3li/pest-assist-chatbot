// src/ai/flows/pest-knowledge-retrieval.ts
'use server';

/**
 * @fileOverview A pest knowledge retrieval AI agent.
 *
 * - pestKnowledgeRetrieval - A function that handles the pest knowledge retrieval process.
 * - PestKnowledgeRetrievalInput - The input type for the pestKnowledgeRetrieval function.
 * - PestKnowledgeRetrievalOutput - The return type for the pestKnowledgeRetrieval function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PestKnowledgeRetrievalInputSchema = z.object({
  query: z.string().describe('The pest-related question or query from the user.'),
});

export type PestKnowledgeRetrievalInput = z.infer<typeof PestKnowledgeRetrievalInputSchema>;

const PestKnowledgeRetrievalOutputSchema = z.object({
  response: z.string().describe('The chatbot response incorporating knowledge from Vertex AI Search.'),
});

export type PestKnowledgeRetrievalOutput = z.infer<typeof PestKnowledgeRetrievalOutputSchema>;

export async function pestKnowledgeRetrieval(input: PestKnowledgeRetrievalInput): Promise<PestKnowledgeRetrievalOutput> {
  return pestKnowledgeRetrievalFlow(input);
}

const pestKnowledgeRetrievalPrompt = ai.definePrompt({
  name: 'pestKnowledgeRetrievalPrompt',
  input: {schema: PestKnowledgeRetrievalInputSchema},
  output: {schema: PestKnowledgeRetrievalOutputSchema},
  prompt: `You are a pest control expert. Respond to the user's query about pests, incorporating relevant information from Vertex AI Search if available.  If no information is available in the search results, respond based on your knowledge.

User Query: {{{query}}}
`,
});

const pestKnowledgeRetrievalFlow = ai.defineFlow(
  {
    name: 'pestKnowledgeRetrievalFlow',
    inputSchema: PestKnowledgeRetrievalInputSchema,
    outputSchema: PestKnowledgeRetrievalOutputSchema,
  },
  async input => {
    const {output} = await pestKnowledgeRetrievalPrompt(input);
    return output!;
  }
);
