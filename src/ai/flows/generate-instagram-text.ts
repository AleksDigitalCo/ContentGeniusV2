'use server';

/**
 * @fileOverview This file defines the generateInstagramText flow, which takes a text prompt as input and returns AI-generated marketing copy optimized for Instagram.
 *
 * - generateInstagramText - An async function that takes a prompt and returns Instagram-ready marketing copy.
 * - GenerateInstagramTextInput - The input type for the generateInstagramText function (a string prompt).
 * - GenerateInstagramTextOutput - The return type for the generateInstagramText function (a string of marketing copy).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInstagramTextInputSchema = z.string().describe('A text prompt describing a product or service.');
export type GenerateInstagramTextInput = z.infer<typeof GenerateInstagramTextInputSchema>;

const GenerateInstagramTextOutputSchema = z.string().describe('AI-generated marketing copy optimized for Instagram, including relevant emojis and hashtags.');
export type GenerateInstagramTextOutput = z.infer<typeof GenerateInstagramTextOutputSchema>;

export async function generateInstagramText(prompt: GenerateInstagramTextInput): Promise<GenerateInstagramTextOutput> {
  return generateInstagramTextFlow(prompt);
}

const generateInstagramTextPrompt = ai.definePrompt({
  name: 'generateInstagramTextPrompt',
  input: {schema: GenerateInstagramTextInputSchema},
  output: {schema: GenerateInstagramTextOutputSchema},
  prompt: `You are a highly specialized AI for marketing copy. Your task is to transform a raw description into an engaging, short text perfect for Instagram. Include relevant emojis and hashtags. The tone should be enthusiastic and professional.\n\nDescription: {{{input}}}`,
});

const generateInstagramTextFlow = ai.defineFlow(
  {
    name: 'generateInstagramTextFlow',
    inputSchema: GenerateInstagramTextInputSchema,
    outputSchema: GenerateInstagramTextOutputSchema,
  },
  async (input) => {
    if (!input) {
      // Should not happen due to schema validation, but as a safeguard.
      return 'Please provide a description to generate Instagram text.';
    }
    const {text} = await generateInstagramTextPrompt(input);
    return text!;
  }
);
