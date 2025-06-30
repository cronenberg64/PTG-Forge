"use client";

import type { Dispatch, SetStateAction } from "react";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const prompts = [
  "A simple mobile robot with two wheels and a caster, navigating a maze.",
  "A UR5e collaborative robot arm sorting colored blocks into different bins.",
  "A drone flying a survey pattern over a small, hilly area with a few trees.",
  "A factory floor with a Fanuc M-10iA robot arm that picks up a small red cube and places it on a conveyor belt. The simulation should run for 5 cycles.",
];

interface ExamplePromptsProps {
  setPrompt: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
}

export function ExamplePrompts({ setPrompt, isLoading }: ExamplePromptsProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="border-b-0">
        <AccordionTrigger className="py-2 text-sm font-medium text-muted-foreground hover:no-underline">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            <span>Not sure where to start? Try an example.</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {prompts.map((p) => (
              <Button
                key={p}
                variant="outline"
                size="sm"
                className="h-auto whitespace-normal text-left justify-start p-2"
                onClick={() => setPrompt(p)}
                disabled={isLoading}
              >
                {p}
              </Button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
