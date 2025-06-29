"use client";

import { useState } from "react";
import { generateWorldFile } from "@/ai/flows/generate-world-file";
import { generateUrdfFile } from "@/ai/flows/generate-urdf-file";
import { generateRos2LaunchFile } from "@/ai/flows/generate-ros2-launch-file";
import { generateTaskScript } from "@/ai/flows/generate-task-script";
import { generateScenePreview } from "@/ai/flows/generate-scene-preview";
import { useToast } from "@/hooks/use-toast";

import { AppHeader } from "@/components/simverse/header";
import { ControlPanel } from "@/components/simverse/control-panel";
import { OutputPanel } from "@/components/simverse/output-panel";
import { PreviewPanel } from "@/components/simverse/preview-panel";

export type GeneratedFiles = {
  world: string;
  urdf: string;
  launch: string;
  script: string;
};

export default function Home() {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState<string>("");
  const [generatedFiles, setGeneratedFiles] = useState<GeneratedFiles>({
    world: "",
    urdf: "",
    launch: "",
    script: "",
  });
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenerate = async (currentPrompt: string) => {
    if (!currentPrompt) {
      toast({
        variant: "destructive",
        title: "Prompt is empty",
        description: "Please enter a description for your simulation.",
      });
      return;
    }

    setIsLoading(true);
    setGeneratedFiles({ world: "", urdf: "", launch: "", script: "" });
    setPreviewUrl("");

    try {
      const [worldRes, urdfRes, launchRes, scriptRes, previewRes] =
        await Promise.all([
          generateWorldFile(currentPrompt),
          generateUrdfFile({ robotDescription: currentPrompt }),
          generateRos2LaunchFile({ sceneDescription: currentPrompt }),
          generateTaskScript({ taskDescription: currentPrompt }),
          generateScenePreview({ sceneDescription: currentPrompt }),
        ]);

      setGeneratedFiles({
        world: worldRes.worldFileContent,
        urdf: urdfRes.urdfFile,
        launch: launchRes.launchFileContent,
        script: scriptRes.pythonScript,
      });
      setPreviewUrl(previewRes.imageUrl);

      toast({
        title: "Generation Complete",
        description: "Your simulation files have been successfully generated.",
      });
    } catch (error) {
      console.error("File generation failed:", error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description:
          "An error occurred while generating the files. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-1 grid md:grid-cols-3 gap-8 p-4 sm:p-6 md:p-8">
        <div className="md:col-span-1 flex flex-col gap-8">
          <ControlPanel
            prompt={prompt}
            setPrompt={setPrompt}
            isLoading={isLoading}
            onSubmit={() => handleGenerate(prompt)}
            files={generatedFiles}
          />
        </div>
        <div className="md:col-span-2 flex flex-col gap-8 min-h-0">
          <PreviewPanel isLoading={isLoading} previewUrl={previewUrl} />
          <OutputPanel files={generatedFiles} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
}
