'use server';
/**
 * @fileOverview Generates a preview image for a simulation scene.
 *
 * - generateScenePreview - A function that generates the preview image.
 * - GenerateScenePreviewInput - The input type for the generateScenePreview function.
 * - GenerateScenePreviewOutput - The return type for the generateScenePreview function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateScenePreviewInputSchema = z.object({
  sceneDescription: z.string().describe('A natural language description of the simulation scene.'),
});
export type GenerateScenePreviewInput = z.infer<typeof GenerateScenePreviewInputSchema>;

const GenerateScenePreviewOutputSchema = z.object({
  imageUrl: z.string().describe("A data URI of the generated image. Expected format: 'data:image/png;base64,<encoded_data>'."),
});
export type GenerateScenePreviewOutput = z.infer<typeof GenerateScenePreviewOutputSchema>;


export async function generateScenePreview(
  input: GenerateScenePreviewInput
): Promise<GenerateScenePreviewOutput> {
  return generateScenePreviewFlow(input);
}


const generateScenePreviewFlow = ai.defineFlow(
  {
    name: 'generateScenePreviewFlow',
    inputSchema: GenerateScenePreviewInputSchema,
    outputSchema: GenerateScenePreviewOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
        model: 'googleai/gemini-2.0-flash-preview-image-generation',
        prompt: `Generate a realistic 3D render of a robot simulation based on the following description. The image should look like a screenshot from a simulator like Gazebo or Isaac Sim. Focus on a clean, well-lit, and professional look. Scene description: "${input.sceneDescription}"`,
        config: {
            responseModalities: ['TEXT', 'IMAGE'],
        },
    });

    if (!media?.url) {
        throw new Error('Image generation failed to produce an image.');
    }

    return { imageUrl: media.url };
  }
);
