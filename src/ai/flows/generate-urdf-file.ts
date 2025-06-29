'use server';
/**
 * @fileOverview A URDF file generator AI agent.
 *
 * - generateUrdfFile - A function that handles the URDF file generation process.
 * - GenerateUrdfFileInput - The input type for the generateUrdfFile function.
 * - GenerateUrdfFileOutput - The return type for the generateUrdfFile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateUrdfFileInputSchema = z.object({
  robotDescription: z.string().describe('The description of the robot to generate URDF file for.'),
});
export type GenerateUrdfFileInput = z.infer<typeof GenerateUrdfFileInputSchema>;

const GenerateUrdfFileOutputSchema = z.object({
  urdfFile: z.string().describe('The generated URDF file content.'),
});
export type GenerateUrdfFileOutput = z.infer<typeof GenerateUrdfFileOutputSchema>;

export async function generateUrdfFile(input: GenerateUrdfFileInput): Promise<GenerateUrdfFileOutput> {
  return generateUrdfFileFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateUrdfFilePrompt',
  input: {schema: GenerateUrdfFileInputSchema},
  output: {schema: GenerateUrdfFileOutputSchema},
  prompt: `You are an expert roboticist specializing in generating URDF (Unified Robot Description Format) files.

You will use the provided description to generate a valid URDF file.

Description: {{{robotDescription}}}

Make sure the URDF file includes links, joints, and basic meshes. The URDF should be functional in a Gazebo simulation.
`,
});

const generateUrdfFileFlow = ai.defineFlow(
  {
    name: 'generateUrdfFileFlow',
    inputSchema: GenerateUrdfFileInputSchema,
    outputSchema: GenerateUrdfFileOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
