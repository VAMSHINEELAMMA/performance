'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a structured learning path for a given topic.
 *
 * - generateLearningPath - A function that takes a topic and returns a detailed learning plan.
 * - GenerateLearningPathInput - The input type for the generateLearningPath function.
 * - GenerateLearningPathOutput - The return type for the generateLearningPath function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const GenerateLearningPathInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate a learning path.'),
});
export type GenerateLearningPathInput = z.infer<
  typeof GenerateLearningPathInputSchema
>;

const LearningStepSchema = z.object({
  step: z.number().describe('The step number in the learning path.'),
  concept: z.string().describe('The core concept to learn in this step.'),
  description: z
    .string()
    .describe('A brief description of what this concept entails.'),
  estimatedTime: z
    .string()
    .describe('The estimated time it will take to learn this concept (e.g., "2 hours", "3 days").'),
});

export const GenerateLearningPathOutputSchema = z.object({
  learningPath: z.array(LearningStepSchema).describe('An array of steps that form the learning path.'),
});
export type GenerateLearningPathOutput = z.infer<
  typeof GenerateLearningPathOutputSchema
>;

export async function generateLearningPath(
  input: GenerateLearningPathInput
): Promise<GenerateLearningPathOutput> {
  return generateLearningPathFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLearningPathPrompt',
  input: {schema: GenerateLearningPathInputSchema},
  output: {schema: GenerateLearningPathOutputSchema},
  prompt: `You are an expert curriculum designer and educational strategist.
  A user wants to learn about the topic: "{{topic}}".

  Create a detailed, step-by-step learning path for them. Break down the topic into logical, sequential concepts.
  For each step, provide:
  1. A clear concept title.
  2. A concise description of the concept.
  3. A realistic time estimate to learn the concept (e.g., "1 hour", "3 days", "2 weeks").

  Start with the fundamentals and build up to more advanced topics. The path should be practical and easy for a beginner to follow.
  Structure the output as an array of learning steps in the specified JSON format.
  `,
});

const generateLearningPathFlow = ai.defineFlow(
  {
    name: 'generateLearningPathFlow',
    inputSchema: GenerateLearningPathInputSchema,
    outputSchema: GenerateLearningPathOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
