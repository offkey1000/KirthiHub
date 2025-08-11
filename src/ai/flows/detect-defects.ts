'use server';

/**
 * @fileOverview Detects defects in jewelry images using AI.
 *
 * - detectDefects - A function that accepts a jewelry image and returns a list of potential defects.
 * - DetectDefectsInput - The input type for the detectDefects function.
 * - DetectDefectsOutput - The return type for the detectDefects function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectDefectsInputSchema = z.object({
  jewelryImageDataUri: z
    .string()
    .describe(
      'A photo of a jewelry piece, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
});
export type DetectDefectsInput = z.infer<typeof DetectDefectsInputSchema>;

const DetectDefectsOutputSchema = z.object({
  defects: z
    .array(z.string())
    .describe('A list of potential defects identified in the jewelry piece.'),
});
export type DetectDefectsOutput = z.infer<typeof DetectDefectsOutputSchema>;

export async function detectDefects(input: DetectDefectsInput): Promise<DetectDefectsOutput> {
  return detectDefectsFlow(input);
}

const detectDefectsPrompt = ai.definePrompt({
  name: 'detectDefectsPrompt',
  input: {schema: DetectDefectsInputSchema},
  output: {schema: DetectDefectsOutputSchema},
  prompt: `You are an expert quality control specialist for jewelry manufacturing.

  You are given an image of a finished jewelry piece. Analyze the image and identify any potential defects in the jewelry.

  Return a list of defects found in the jewelry piece.

  Image: {{media url=jewelryImageDataUri}}
  `,
});

const detectDefectsFlow = ai.defineFlow(
  {
    name: 'detectDefectsFlow',
    inputSchema: DetectDefectsInputSchema,
    outputSchema: DetectDefectsOutputSchema,
  },
  async input => {
    const {output} = await detectDefectsPrompt(input);
    return output!;
  }
);
