/**
 * @fileOverview Denna fil konfigurerar Genkit-miljön för projektet.
 * Den sätter upp plugins, modeller och säkerställer att nödvändiga
 * miljövariabler är inställda för en lyckad distribution.
 */

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'zod'; // Zod används för schemavalidering, även om det inte används direkt i denna fil kan det vara bra att ha för framtida bruk.

// Kontrollera att API-nyckeln finns som en miljövariabel.
// Detta är den säkraste metoden för att hantera hemligheter i produktionsmiljöer.
const geminiApiKey = process.env.GEMINI_API_KEY;
if (!geminiApiKey) {
  // Detta felkast är viktigt för att fånga problemet under distribution.
  // Det ger en tydlig indikation om att en kritisk miljövariabel saknas.
  throw new Error('GEMINI_API_KEY miljövariabeln är inte inställd.');
}

// Konfigurera Genkit-miljön med de nödvändiga plugins och modeller.
export const ai = genkit({
  plugins: [
    // Ladda Google AI-pluginen och passera in API-nyckeln.
    googleAI({apiKey: geminiApiKey}),
  ],
  model: 'googleai/gemini-2.0-flash',
});
