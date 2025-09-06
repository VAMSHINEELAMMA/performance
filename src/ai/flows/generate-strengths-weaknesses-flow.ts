
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a student's strengths and weaknesses based on their scores.
 *
 * - generateStrengthsAndWeaknesses - A function that takes student scores and returns a list of strengths and weaknesses.
 * - GenerateStrengthsAndWeaknessesInput - The input type for the function.
 * - GenerateStrengthsAndWeaknessesOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStrengthsAndWeaknessesInputSchema = z.object({
  assessmentScore: z
    .number()
    .describe('The student score on assessments (0-100).'),
  projectScore: z
    .number()
    .describe('The student score on projects (0-100).'),
  feedbackScore: z
    .number()
    .describe('The student score based on feedback (0-100).'),
  efficiency: z
    .number()
    .describe('A measure of student efficiency in completing tasks (0-100).'),
});
export type GenerateStrengthsAndWeaknessesInput = z.infer<
  typeof GenerateStrengthsAndWeaknessesInputSchema
>;

const GenerateStrengthsAndWeaknessesOutputSchema = z.object({
  strengths: z
    .string()
    .describe(
      "A bulleted list of the student's key strengths, formatted as a string with each point on a new line starting with '- '."
    ),
  weaknesses: z
    .string()
    .describe(
      "A bulleted list of the student's key areas for improvement, formatted as a string with each point on a new line starting with '- '."
    ),
});
export type GenerateStrengthsAndWeaknessesOutput = z.infer<
  typeof GenerateStrengthsAndWeaknessesOutputSchema
>;

export async function generateStrengthsAndWeaknesses(
  input: GenerateStrengthsAndWeaknessesInput
): Promise<GenerateStrengthsAndWeaknessesOutput> {
  return generateStrengthsAndWeaknessesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStrengthsAndWeaknessesPrompt',
  input: {schema: GenerateStrengthsAndWeaknessesInputSchema},
  output: {schema: GenerateStrengthsAndWeaknessesOutputSchema},
  prompt: `You are an expert educational analyst. Based on the following student scores, identify their key strengths and areas for improvement.

  Scores:
  - Assessment Score: {{assessmentScore}}
  - Project Score: {{projectScore}}
  - Feedback Score: {{feedbackScore}}
  - Efficiency: {{efficiency}}

  Provide the analysis as two separate bulleted lists (strengths and weaknesses). Be encouraging and constructive.
  Strengths should highlight what the student is doing well.
  Weaknesses should be framed as "areas for improvement" and offer actionable advice.

  For example, a high Project Score could mean a strength is "Excellent practical application of concepts in project work."
  A low Assessment Score could mean an area for improvement is "Focus on theoretical knowledge and exam preparation techniques."

  Output the result in the specified JSON format.`,
});

const generateStrengthsAndWeaknessesFlow = ai.defineFlow(
  {
    name: 'generateStrengthsAndWeaknessesFlow',
    inputSchema: GenerateStrengthsAndWeaknessesInputSchema,
    outputSchema: GenerateStrengthsAndWeaknessesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
