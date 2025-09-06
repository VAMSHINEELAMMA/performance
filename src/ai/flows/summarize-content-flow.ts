
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

const FeatureSchema = z.object({
    featureTitle: z.string().describe("The title of the feature."),
    featureDescription: z.string().describe("The description of the feature."),
});

const SummarizeContentOutputSchema = z.object({
  title: z.string().describe("The main title for the summary, like 'Key features'."),
  subtitle: z.string().describe("A subtitle for the group of features."),
  features: z.array(FeatureSchema).describe("An array of features, each with a title and description.")
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
  prompt: `You are an expert at summarizing complex topics into key features.
  Analyze the following content and extract the most important features.
  The output should be structured with a main title, a subtitle, and a list of features.
  For each feature, provide a clear title and a concise description.

  Content to summarize:
  ---
  {{content}}
  ---

  Please format the output as a structured JSON object with a title, subtitle, and an array of features.`,
});

const summarizeContentFlow = ai.defineFlow(
  {
    name: 'summarizeContentFlow',
    inputSchema: SummarizeContentInputSchema,
    outputSchema: SummarizeContentOutputSchema,
  },
  async input => {
    if (!input.content.trim()) {
        return { title: "Error", subtitle: "No content provided", features: [{featureTitle: "Input required", featureDescription: "Please provide some content to summarize."}] };
    }
    const {output} = await prompt(input);
    return output!;
  }
);
