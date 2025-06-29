import { config } from 'dotenv';
config();

import '@/ai/flows/generate-task-script.ts';
import '@/ai/flows/generate-world-file.ts';
import '@/ai/flows/generate-ros2-launch-file.ts';
import '@/ai/flows/generate-urdf-file.ts';
import '@/ai/flows/generate-scene-preview.ts';
