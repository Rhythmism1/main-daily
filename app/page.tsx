"use client";

import { DailyTransport } from "@daily-co/realtime-ai-daily";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useEffect, useRef, useState } from "react";
import { LLMHelper, RTVIClient } from "realtime-ai";
import { RTVIClientAudio, RTVIClientProvider } from "realtime-ai-react";

import App from "@/components/App";
import { AppProvider } from "@/components/context";
import Header from "@/components/Header";
import Splash from "@/components/Splash";
import { CustomPrompt } from "@/components/CustomPrompt"; // Import CustomPrompt
import {
  BOT_READY_TIMEOUT,
  defaultConfig,
  defaultServices,
} from "@/rtvi.config";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [showCustomPrompt, setShowCustomPrompt] = useState(false);
  const [userKnowledge, setUserKnowledge] = useState("");
  const voiceClientRef = useRef<RTVIClient | null>(null);

  useEffect(() => {
    if (!showSplash || voiceClientRef.current) {
      return;
    }

    const voiceClient = new RTVIClient({
      transport: new DailyTransport(),
      params: {
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "/api",
        requestData: {
          services: defaultServices,
          config: defaultConfig,
        },
      },
      timeout: BOT_READY_TIMEOUT,
    });

    const llmHelper = new LLMHelper({});
    voiceClient.registerHelper("llm", llmHelper);

    voiceClientRef.current = voiceClient;
  }, [showSplash]);

  if (showSplash) {
    return <Splash handleReady={() => {
      setShowSplash(false);
      setShowCustomPrompt(true);
    }} />;
  }

  if (showCustomPrompt) {
    return <CustomPrompt onSubmit={(knowledge) => {
      setUserKnowledge(knowledge);
      setShowCustomPrompt(false);
    }} />;
  }

  return (
    <RTVIClientProvider client={voiceClientRef.current!}>
      <AppProvider>
        <TooltipProvider>
          <main className="flex min-h-screen flex-col">
            <Header />
            <div id="app" className="flex-1 flex items-center justify-center">
              <App userKnowledge={userKnowledge} />
            </div>
            <aside id="tray" />
          </main>
          <RTVIClientAudio />
        </TooltipProvider>
      </AppProvider>
    </RTVIClientProvider>
  );
}
