'use server';

/**
 * @fileOverview Denna fil definierar generateInstagramText-flödet, som tar en textprompt som input och returnerar AI-genererad marknadsföringstext optimerad för Instagram.
 *
 * - generateInstagramText - En asynkron funktion som tar en prompt och returnerar Instagram-klar marknadsföringstext.
 * - GenerateInstagramTextInput - Input-typen för generateInstagramText-funktionen (en strängprompt).
 * - GenerateInstagramTextOutput - Returtypen för generateInstagramText-funktionen (en sträng med marknadsföringstext).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInstagramTextInputSchema = z.string().describe('En textprompt som beskriver en produkt eller tjänst.');
export type GenerateInstagramTextInput = z.infer<typeof GenerateInstagramTextInputSchema>;

const GenerateInstagramTextOutputSchema = z.string().describe('AI-genererad marknadsföringstext optimerad för Instagram, inklusive relevanta emojis och hashtags.');
export type GenerateInstagramTextOutput = z.infer<typeof GenerateInstagramTextOutputSchema>;

export async function generateInstagramText(prompt: GenerateInstagramTextInput): Promise<GenerateInstagramTextOutput> {
  // Här lägger vi till en robust kontroll för att säkerställa att prompten
  // inte är null, undefined eller en tom sträng innan vi anropar flödet.
  const validatedPrompt = prompt || 'En produkt eller tjänst.';
  return generateInstagramTextFlow(validatedPrompt);
}

const generateInstagramTextPrompt = ai.definePrompt({
  name: 'generateInstagramTextPrompt',
  input: {schema: GenerateInstagramTextInputSchema},
  output: {schema: GenerateInstagramTextOutputSchema},
  prompt: `Du är en högt specialiserad AI för marknadsföringstext. Din uppgift är att omvandla en rå beskrivning till en engagerande, kort text perfekt för Instagram. Inkludera relevanta emojis och hashtags. Tonen ska vara entusiastisk och professionell.\n\nDescription: {{{input}}}`,
});

const generateInstagramTextFlow = ai.defineFlow(
  {
    name: 'generateInstagramTextFlow',
    inputSchema: GenerateInstagramTextInputSchema,
    outputSchema: GenerateInstagramTextOutputSchema,
  },
  async input => {
    const {text} = await generateInstagramTextPrompt(input);
    return text!;
  }
);
