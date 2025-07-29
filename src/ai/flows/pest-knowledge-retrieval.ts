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
import * as fs from 'fs/promises';
import * aimport {promises as fs} from 'fs';
import * as path from 'path';

const PestKnowledgeRetrievalInputSchema = z.object({
  query: z.string().describe('The pest-related question or query from the user.'),
});

export type PestKnowledgeRetrievalInput = z.infer<typeof PestKnowledgeRetrievalInputSchema>;

const PestKnowledgeRetrievalOutputSchema = z.object({
  response: z.string().describe('The chatbot response incorporating knowledge from the provided markdown files.'),
});

export type PestKnowledgeRetrievalOutput = z.infer<typeof PestKnowledgeRetrievalOutputSchema>;

async function getKnowledgeBaseContent(): Promise<string> {
  const kbPath = path.join(process.cwd(), 'src', 'kb');
  const files = await fs.readdir(kbPath);
  let content = '';
  for (const file of files) {
    if (file.endsWith('.md')) {
      const filePath = path.join(kbPath, file);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      content += `\n\n--- FILE: ${file} ---\n\n${fileContent}`;
    }
  }
  return content;
}

export async function pestKnowledgeRetrieval(input: PestKnowledgeRetrievalInput): Promise<PestKnowledgeRetrievalOutput> {
  return pestKnowledgeRetrievalFlow(input);
}

const pestKnowledgeRetrievalPrompt = ai.definePrompt({
  name: 'pestKnowledgeRetrievalPrompt',
  input: {
    schema: z.object({
      query: z.string(),
      knowledgeBase: z.string(),
    }),
  },
  output: {schema: PestKnowledgeRetrievalOutputSchema},
  prompt: `You are a pest control expert assistant. Your ONLY source of information is the knowledge base provided below.
You MUST NOT use any other information or prior knowledge.
If the answer is not found in the knowledge base, you MUST state that you do not have the information.
The user is asking a question in Arabic, so you MUST respond in Arabic.

Knowledge Base:
{{{knowledgeBase}}}

---

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
    const knowledgeBase = await getKnowledgeBaseContent();
    const {output} = await pestKnowledgeRetrievalPrompt({ ...input, knowledgeBase });
    return output!;
  }
);
