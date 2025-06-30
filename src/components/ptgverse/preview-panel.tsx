"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, Bot } from "lucide-react";

interface PreviewPanelProps {
  isLoading: boolean;
  previewUrl: string;
}

export function PreviewPanel({ isLoading, previewUrl }: PreviewPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="text-primary" />
          <span>Simulation Preview</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full bg-muted rounded-md flex items-center justify-center relative overflow-hidden border">
           {isLoading ? (
            <div className="flex flex-col items-center gap-2 text-muted-foreground z-10">
              <Bot className="h-10 w-10 animate-spin text-primary" />
              <p className="font-semibold">Generating Preview...</p>
            </div>
          ) : previewUrl ? (
            <Image
              src={previewUrl}
              alt="Generated simulation preview"
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <>
              <Image
                src="https://placehold.co/1280x720.png"
                alt="Simulation preview placeholder"
                layout="fill"
                objectFit="cover"
                data-ai-hint="robot arm factory"
                className="opacity-20"
              />
              <div className="text-center z-10 p-4">
                <h3 className="text-lg font-semibold text-foreground">3D Preview</h3>
                <p className="text-sm text-muted-foreground">
                  A real-time visualization of the generated scene will appear here.
                </p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
