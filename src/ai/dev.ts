import { config } from 'dotenv';
config();

import '@/ai/flows/predict-student-performance.ts';
import '@/ai/flows/analyze-feedback-flow.ts';
import '@/ai/flows/summarize-content-flow.ts';
import '@/ai/flows/generate-learning-path-flow.ts';
import '@/ai/flows/generate-strengths-weaknesses-flow.ts';
