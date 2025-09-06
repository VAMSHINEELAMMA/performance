import { config } from 'dotenv';
config();

import '@/ai/flows/predict-student-performance.ts';
import '@/ai/flows/analyze-feedback-flow.ts';
import '@/ai/flows/summarize-content-flow.ts';
import '@/ai/flows/regression-demo-flow.ts';
import '@/ai/flows/classification-demo-flow.ts';
