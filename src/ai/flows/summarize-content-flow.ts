
'use server';

/**
 * @fileOverview This file defines a Genkit flow for summarizing text content into key points.
 *
 * - summarizeContent - A function that takes a block of text and returns key points.
 * - SummarizeContentInput - The input type for the summarizeContent function.
 * - SummarizeContentOutput - The return type for the summarizeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeContentInputSchema = z.object({
  content: z.string().describe('The text content to be summarized.'),
});
export type SummarizeContentInput = z.infer<
  typeof SummarizeContentInputSchema
>;

const SummarizeContentOutputSchema = z.object({
  keyPoints: z
    .string()
    .describe(
      "The key points of the content, formatted as a bulleted list with each point on a new line starting with '- '. Wrap important keywords in each point with double asterisks for highlighting, e.g., 'This is a **keyword**'."
    ),
});
export type SummarizeContentOutput = z.infer<
  typeof SummarizeContentOutputSchema
>;

export async function summarizeContent(
  input: SummarizeContentInput
): Promise<SummarizeContentOutput> {
  return summarizeContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeContentPrompt',
  input: {schema: SummarizeContentInputSchema},
  output: {schema: SummarizeContentOutputSchema},
  prompt: `You are an expert at summarizing complex topics into key points.
  Analyze the following content and extract the most important key points.
  For each key point, identify and wrap the most important keywords or phrases in double asterisks (e.g., "The platform uses **AI** to predict performance.").
  Present the key points as a concise, easy-to-read bulleted list. Each bullet point must start on a new line with a hyphen and a space (e.g., "- First point.").

  Content to summarize:
  ---
  {{content}}
  ---

  Output the key points in the specified JSON format.`,
});

const summarizeContentFlow = ai.defineFlow(
  {
    name: 'summarizeContentFlow',
    inputSchema: SummarizeContentInputSchema,
    outputSchema: SummarizeContentOutputSchema,
  },
  async input => {
    if (!input.content.trim()) {
        return { keyPoints: "Please provide some content to summarize." };
    }
    const {output} = await prompt(input);
    return output!;
  }
);
