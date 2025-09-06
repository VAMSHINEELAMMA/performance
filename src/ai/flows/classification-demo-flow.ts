'use server';

/**
 * @fileOverview A Genkit flow for a simple classification task demo.
 * - classifyStudentQuery - Classifies a student's text query into a category.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const ClassificationDemoInputSchema = z.object({
  queryText: z
    .string()
    .min(10)
    .describe('The text of the student query to classify.'),
});
export type ClassificationDemoInput = z.infer<
  typeof ClassificationDemoInputSchema
>;

const possibleCategories = [
  'Technical Question',
  'Schedule Inquiry',
  'General Feedback',
  'Assignment Help',
  'Social Inquiry',
] as const;

export const ClassificationDemoOutputSchema = z.object({
  category: z
    .enum(possibleCategories)
    .describe('The most likely category for the student query.'),
});
export type ClassificationDemoOutput = z.infer<
  typeof ClassificationDemoOutputSchema
>;

export async function classifyStudentQuery(
  input: ClassificationDemoInput
): Promise<ClassificationDemoOutput> {
  return classificationDemoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'classificationDemoPrompt',
  input: {schema: ClassificationDemoInputSchema},
  output: {schema: ClassificationDemoOutputSchema},
  prompt: `You are a machine learning model performing a classification task.
  Your goal is to classify a student's query into one of the following categories: ${possibleCategories.join(
    ', '
  )}

  Here is the student's query:
  "{{queryText}}"

  Analyze the text and determine the most appropriate category.`,
});

const classificationDemoFlow = ai.defineFlow(
  {
    name: 'classificationDemoFlow',
    inputSchema: ClassificationDemoInputSchema,
    outputSchema: ClassificationDemoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
