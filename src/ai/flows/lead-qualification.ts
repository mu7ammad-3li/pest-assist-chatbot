'use server';

/**
 * @fileOverview Lead qualification AI agent.
 *
 * - qualifyLead - A function that handles the lead qualification process.
 * - QualifyLeadInput - The input type for the qualifyLead function.
 * - QualifyLeadOutput - The return type for the qualifyLead function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QualifyLeadInputSchema = z.object({
  message: z.string().describe('The free-form text message from the user.'),
});
export type QualifyLeadInput = z.infer<typeof QualifyLeadInputSchema>;

const QualifyLeadOutputSchema = z.object({
  isLead: z.boolean().describe('Whether the user is a qualified lead.'),
  name: z.string().optional().describe('The name of the user, if provided.'),
  phone: z.string().optional().describe('The phone number of the user, if provided.'),
  inquiredProducts: z.array(z.string()).optional().describe('The products the user inquired about.'),
  inquiredPests: z.array(z.string()).optional().describe('The pests the user inquired about.'),
});
export type QualifyLeadOutput = z.infer<typeof QualifyLeadOutputSchema>;

export async function qualifyLead(input: QualifyLeadInput): Promise<QualifyLeadOutput> {
  return qualifyLeadFlow(input);
}

const prompt = ai.definePrompt({
  name: 'qualifyLeadPrompt',
  input: {schema: QualifyLeadInputSchema},
  output: {schema: QualifyLeadOutputSchema},
  prompt: `You are an AI assistant designed to qualify leads for a pest control business.
  Your goal is to determine if a user message indicates a potential lead by extracting key information
  such as name, phone number, inquired products, and inquired pests.

  Analyze the following message:
  {{message}}

  Based on the message, determine if the user is a qualified lead.
  A qualified lead is someone who is interested in pest control services or products.
  Extract the user's name and phone number if provided. Identify any products or pests they are inquiring about.

  Return the information in the following JSON format:
  {
    "isLead": boolean,
    "name": string (optional),
    "phone": string (optional),
    "inquiredProducts": string[] (optional),
    "inquiredPests": string[] (optional)
  }
`,
});

const qualifyLeadFlow = ai.defineFlow(
  {
    name: 'qualifyLeadFlow',
    inputSchema: QualifyLeadInputSchema,
    outputSchema: QualifyLeadOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
