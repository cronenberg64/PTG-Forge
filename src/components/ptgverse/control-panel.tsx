"use client";

import type { Dispatch, SetStateAction } from "react";
import {
  FileText,
  Download,
  ToyBrick,
  GitFork,
  Rocket,
  WandSparkles,
  Bot,
} from "lucide-react";
import JSZip from "jszip";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import type { GeneratedFiles } from "@/app/page";
import { ExamplePrompts } from "./example-prompts";

interface ControlPanelProps {
  prompt: string;
  setPrompt: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  onSubmit: () => void;
  files: GeneratedFiles;
}

const downloadFile = (filename: string, content: string, mimeType: string) => {
  if (!content) return;
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const downloadBundle = (files: GeneratedFiles) => {
  const zip = new JSZip();
  if (files.world) {
    zip.file("scene.world", files.world);
  }
  if (files.urdf) {
    zip.file("robot.urdf", files.urdf);
  }
  if (files.launch) {
    zip.file("simulation.launch.py", files.launch);
  }
  if (files.script) {
    zip.file("task.py", files.script);
  }

  zip.generateAsync({ type: "blob" }).then((content) => {
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ptg-forge-bundle.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
};


export function ControlPanel({
  prompt,
  setPrompt,
  isLoading,
  onSubmit,
  files,
}: ControlPanelProps) {

  const hasFiles = Object.values(files).some(file => file);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <WandSparkles className="text-primary" />
          <span>Create Simulation</span>
        </CardTitle>
        <CardDescription>
          Describe your robotic simulation scene and task in natural language.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid gap-2">
          <Label htmlFor="prompt-input">Your Scene Description</Label>
          <Textarea
            id="prompt-input"
            placeholder={`e.g., "A factory floor with a Fanuc M-10iA robot arm that picks up a small red cube and places it on a conveyor belt. The simulation should run for 5 cycles."`}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={6}
            className="font-code"
            disabled={isLoading}
          />
        </div>
        <ExamplePrompts setPrompt={setPrompt} isLoading={isLoading} />
        <div className="grid gap-2">
          <Label htmlFor="robot-select">Pre-built Robot (Optional)</Label>
          <Select disabled={isLoading}>
            <SelectTrigger id="robot-select">
              <SelectValue placeholder="Select a robot model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fanuc-m10ia">Fanuc M-10iA</SelectItem>
              <SelectItem value="ur5e">Universal Robots UR5e</SelectItem>
              <SelectItem value="kuka-iiwa">KUKA LBR iiwa</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
        >
          {isLoading ? (
            <Bot className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <WandSparkles className="mr-2 h-4 w-4" />
          )}
          {isLoading ? "Generating..." : "Generate Simulation"}
        </Button>
      </CardContent>

      <div className="mt-auto">
        <Separator className="my-4" />
        <CardFooter className="flex flex-col gap-4 items-start">
            <h3 className="font-semibold text-foreground">Downloads</h3>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
                 <Button variant="outline" className="w-full justify-start" disabled={!files.world || isLoading} onClick={() => downloadFile('scene.world', files.world, 'application/xml')}>
                    <ToyBrick className="mr-2" />
                    <span>scene.world</span>
                </Button>
                <Button variant="outline" className="w-full justify-start" disabled={!files.urdf || isLoading} onClick={() => downloadFile('robot.urdf', files.urdf, 'application/xml')}>
                    <GitFork className="mr-2" />
                    <span>robot.urdf</span>
                </Button>
                <Button variant="outline" className="w-full justify-start" disabled={!files.launch || isLoading} onClick={() => downloadFile('simulation.launch.py', files.launch, 'text/x-python-script')}>
                    <Rocket className="mr-2" />
                    <span>sim.launch.py</span>
                </Button>
                <Button variant="outline" className="w-full justify-start" disabled={!files.script || isLoading} onClick={() => downloadFile('task.py', files.script, 'text/x-python-script')}>
                    <FileText className="mr-2" />
                    <span>task.py</span>
                </Button>
            </div>
            <Button
              variant="default"
              className="w-full"
              disabled={!hasFiles || isLoading}
              onClick={() => downloadBundle(files)}
            >
              <Download className="mr-2" />
              Download Bundle (.zip)
            </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
