import { Button } from "./ui/button";
import React, { useState } from 'react';

interface CustomPromptProps {
  onSubmit: (knowledge: string) => void;
}

export function CustomPrompt({ onSubmit }: CustomPromptProps) {
  const [knowledge, setKnowledge] = useState<string>("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-primary-200">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-primary-900">
          Customize Your Bot's Knowledge
        </h1>
        <textarea
          className="w-full p-4 rounded-lg border border-primary-300"
          rows={6}
          value={knowledge}
          onChange={(e) => setKnowledge(e.target.value)}
          placeholder="Enter custom knowledge for your bot..."
        />
        <Button 
          onClick={() => onSubmit(knowledge)}
          className="w-full lg:w-auto"
        >
          Continue to Setup
        </Button>
      </div>
    </main>
  );
}