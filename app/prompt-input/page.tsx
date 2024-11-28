"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function PromptInputPage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    // Store the prompt (you can use localStorage or your preferred state management)
    localStorage.setItem("userPrompt", prompt);
    router.push("/customize"); // Navigate to the customize page
  };

  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-primary-200 p-4 bg-[length:auto_50%] lg:bg-auto bg-colorWash bg-no-repeat bg-right-top">
      <div className="flex flex-col gap-8 items-center max-w-full lg:max-w-3xl">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-balance text-left">
          Customize Your Bot's Prompt
        </h1>

        <p className="text-primary-500 text-lg leading-relaxed max-w-2xl text-center">
          Enter a prompt that will define how your AI assistant behaves and responds. 
          Be specific about the personality, knowledge, and constraints you want the bot to have.
        </p>

        <div className="w-full max-w-2xl">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            className="min-h-[200px] p-4 text-base"
          />
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
          <Button onClick={handleSubmit} disabled={!prompt.trim()}>
            Continue
          </Button>
        </div>
      </div>
    </main>
  );
}