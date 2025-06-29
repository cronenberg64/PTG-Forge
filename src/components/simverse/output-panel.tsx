"use client";

import {
  FileText,
  Copy,
  Check,
  ToyBrick,
  GitFork,
  Rocket,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import type { GeneratedFiles } from "@/app/page";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import React from "react";

interface OutputPanelProps {
  files: GeneratedFiles;
  isLoading: boolean;
}

function CodeBlock({ content, isLoading }: { content: string; isLoading: boolean }) {
  const { toast } = useToast();
  const [hasCopied, setHasCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setHasCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setHasCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="space-y-2 p-4 bg-white dark:bg-black rounded-md border">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[80%]" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[70%]" />
        <Skeleton className="h-4 w-[90%]" />
      </div>
    );
  }

  if (!content) {
    return (
        <div className="flex items-center justify-center h-48 text-sm text-muted-foreground bg-white dark:bg-black rounded-md border">
            <p>Generated content will appear here.</p>
        </div>
    );
  }

  return (
    <div className="code-block">
      <Button
        size="icon"
        variant="ghost"
        className="absolute top-2 right-2 h-8 w-8"
        onClick={copyToClipboard}
      >
        {hasCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
      <pre>
        <code className="font-code">{content}</code>
      </pre>
    </div>
  );
}

export function OutputPanel({ files, isLoading }: OutputPanelProps) {
  return (
    <Tabs defaultValue="world" className="flex-1 flex flex-col min-h-0">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
        <TabsTrigger value="world">
          <ToyBrick className="mr-2" /> World
        </TabsTrigger>
        <TabsTrigger value="urdf">
          <GitFork className="mr-2" /> URDF
        </TabsTrigger>
        <TabsTrigger value="launch">
          <Rocket className="mr-2" /> Launch
        </TabsTrigger>
        <TabsTrigger value="script">
          <FileText className="mr-2" /> Script
        </TabsTrigger>
      </TabsList>
      <div className="flex-1 mt-2 min-h-0 overflow-hidden">
        <TabsContent value="world" className="h-full">
          <CodeBlock content={files.world} isLoading={isLoading} />
        </TabsContent>
        <TabsContent value="urdf" className="h-full">
          <CodeBlock content={files.urdf} isLoading={isLoading} />
        </TabsContent>
        <TabsContent value="launch" className="h-full">
          <CodeBlock content={files.launch} isLoading={isLoading} />
        </TabsContent>
        <TabsContent value="script" className="h-full">
          <CodeBlock content={files.script} isLoading={isLoading} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
