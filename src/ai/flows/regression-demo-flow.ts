'use server';

/**
 * @fileOverview A Genkit flow for a simple regression task demo.
 * - predictExamScore - Predicts an exam score based on hours studied.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const RegressionDemoInputSchema = z.object({
  hoursStudied: z
    .number()
    .min(0)
    .max(20)
    .describe('The number of hours the student studied for the exam.'),
});
export type RegressionDemoInput = z.infer<typeof RegressionDemoInputSchema>;

export const RegressionDemoOutputSchema = z.object({
  predictedScore: z
    .number()
    .describe('The predicted exam score, between 0 and 100.'),
});
export type RegressionDemoOutput = z.infer<typeof RegressionDemoOutputSchema>;

export async function predictExamScore(
  input: RegressionDemoInput
): Promise<RegressionDemoOutput> {
  return regressionDemoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'regressionDemoPrompt',
  input: {schema: RegressionDemoInputSchema},
  output: {schema: RegressionDemoOutputSchema},
  prompt: `You are a machine learning model performing a regression task.
  Your goal is to predict a student's exam score based on the number of hours they studied.
  There is a positive correlation between hours studied and exam score.
  A student who studied for {{hoursStudied}} hours is likely to get a certain score.
  
  Do not make the correlation perfectly linear. Add some slight, realistic variability.
  For example, 0 hours should result in a score below 40. 10 hours should be around 85-95. 20 hours should be close to 100 but not necessarily a perfect 100.

  Predict the score.`,
});

const regressionDemoFlow = ai.defineFlow(
  {
    name: 'regressionDemoFlow',
    inputSchema: RegressionDemoInputSchema,
    outputSchema: RegressionDemoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
