// The AI agent converts natural language to Gazebo world files.

'use server';

/**
 * @fileOverview Converts natural language scene descriptions into Gazebo .world XML files.
 *
 * - generateWorldFile - A function that converts natural language to Gazebo world files.
 * - GenerateWorldFileInput - The input type for the generateWorldFile function.
 * - GenerateWorldFileOutput - The return type for the generateWorldFile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateWorldFileInputSchema = z.string().describe('A natural language description of the robot simulation scene.');
export type GenerateWorldFileInput = z.infer<typeof GenerateWorldFileInputSchema>;

const GenerateWorldFileOutputSchema = z.object({
  worldFileContent: z.string().describe('The Gazebo .world XML file content.'),
});
export type GenerateWorldFileOutput = z.infer<typeof GenerateWorldFileOutputSchema>;

export async function generateWorldFile(input: GenerateWorldFileInput): Promise<GenerateWorldFileOutput> {
  return generateWorldFileFlow(input);
}

const generateWorldFilePrompt = ai.definePrompt({
  name: 'generateWorldFilePrompt',
  input: {schema: GenerateWorldFileInputSchema},
  output: {schema: GenerateWorldFileOutputSchema},
  prompt: `You are an expert in creating Gazebo .world files.

  Convert the following natural language description of a robot simulation scene into a Gazebo .world XML file.
  Include basic elements such as a ground plane and simple lighting.

  Description: {{{$input}}}

  Ensure the output is a valid XML file.`,
});

const generateWorldFileFlow = ai.defineFlow(
  {
    name: 'generateWorldFileFlow',
    inputSchema: GenerateWorldFileInputSchema,
    outputSchema: GenerateWorldFileOutputSchema,
  },
  async input => {
    const {output} = await generateWorldFilePrompt(input);
    return output!;
  }
);
