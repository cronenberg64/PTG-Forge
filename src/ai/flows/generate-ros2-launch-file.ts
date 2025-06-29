'use server';
/**
 * @fileOverview Generates a ROS2 launch file based on a description of the simulation task and scene.
 *
 * - generateRos2LaunchFile - A function that generates the ROS2 launch file.
 * - GenerateRos2LaunchFileInput - The input type for the generateRos2LaunchFile function.
 * - GenerateRos2LaunchFileOutput - The return type for the generateRos2LaunchFile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRos2LaunchFileInputSchema = z.object({
  sceneDescription: z
    .string()
    .describe(
      'A natural language description of the simulation task and scene, including the robots, environment, and task to be performed.'
    ),
});
export type GenerateRos2LaunchFileInput = z.infer<typeof GenerateRos2LaunchFileInputSchema>;

const GenerateRos2LaunchFileOutputSchema = z.object({
  launchFileContent: z
    .string()
    .describe('The content of the generated ROS2 launch file (.launch.py).'),
});
export type GenerateRos2LaunchFileOutput = z.infer<typeof GenerateRos2LaunchFileOutputSchema>;

export async function generateRos2LaunchFile(
  input: GenerateRos2LaunchFileInput
): Promise<GenerateRos2LaunchFileOutput> {
  return generateRos2LaunchFileFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRos2LaunchFilePrompt',
  input: {schema: GenerateRos2LaunchFileInputSchema},
  output: {schema: GenerateRos2LaunchFileOutputSchema},
  prompt: `You are an expert in ROS2 launch file generation.
  Based on the provided scene description, generate a ROS2 launch file (.launch.py) that spawns the necessary robots and sets up the required ROS2 nodes for the simulation.
  Ensure proper namespacing and include joint state publishers, robot state publishers, and sensor topics as needed.
  Include comments to explain each section of the launch file.

  Scene Description: {{{sceneDescription}}}
  `,
});

const generateRos2LaunchFileFlow = ai.defineFlow(
  {
    name: 'generateRos2LaunchFileFlow',
    inputSchema: GenerateRos2LaunchFileInputSchema,
    outputSchema: GenerateRos2LaunchFileOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
