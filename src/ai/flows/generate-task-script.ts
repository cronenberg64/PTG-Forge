'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a Python script to simulate a task.
 *
 * - generateTaskScript - A function that generates a python script to simulate the task.
 * - GenerateTaskScriptInput - The input type for the generateTaskScript function.
 * - GenerateTaskScriptOutput - The return type for the generateTaskScript function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTaskScriptInputSchema = z.object({
  taskDescription: z
    .string()
    .describe(
      'A natural language description of the task to be simulated, including the type of task (e.g., welding, object pickup), the number of cycles, and any specific requirements.'
    ),
});
export type GenerateTaskScriptInput = z.infer<typeof GenerateTaskScriptInputSchema>;

const GenerateTaskScriptOutputSchema = z.object({
  pythonScript: z
    .string()
    .describe(
      'A Python script that simulates the described task, including robot waypoints, sensor/actuator logging, and any necessary ROS2 logic.'
    ),
});
export type GenerateTaskScriptOutput = z.infer<typeof GenerateTaskScriptOutputSchema>;

export async function generateTaskScript(
  input: GenerateTaskScriptInput
): Promise<GenerateTaskScriptOutput> {
  return generateTaskScriptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTaskScriptPrompt',
  input: {schema: GenerateTaskScriptInputSchema},
  output: {schema: GenerateTaskScriptOutputSchema},
  prompt: `You are an expert in ROS2 and Gazebo simulations.  You will be provided a description of a task to be simulated, and your job is to generate a Python script that will simulate that task in ROS2 and Gazebo.

Task Description: {{{taskDescription}}}

The script should include:
- ROS2 imports and initialization.
- Code to spawn robots and set up the environment (if necessary).
- Logic to control the robot and simulate the task, including defining waypoints or trajectories.
- Sensor and actuator logging.
- Error handling.

Ensure that the script is well-commented and easy to understand.

Return ONLY the code.  Do NOT include any other text. Do NOT include a shebang.`,
});

const generateTaskScriptFlow = ai.defineFlow(
  {
    name: 'generateTaskScriptFlow',
    inputSchema: GenerateTaskScriptInputSchema,
    outputSchema: GenerateTaskScriptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      pythonScript: output!.pythonScript,
    };
  }
);
