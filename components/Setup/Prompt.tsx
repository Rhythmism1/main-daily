import React, { useEffect, useState } from "react";
import { LLMContextMessage } from "realtime-ai";
import { useRTVIClient } from "realtime-ai-react";

import { Button } from "../ui/button";
import * as Card from "../ui/card";
import { Textarea } from "../ui/textarea";

type PromptProps = {
  handleUpdate: (context: LLMContextMessage[], newName?: string) => void;
  handleClose: () => void;
  characterPrompt?: string;
  characterName?: string;
};

const Prompt: React.FC<PromptProps> = ({
  handleUpdate,
  handleClose,
  characterPrompt,
  characterName = "Default",
}) => {
  const voiceClient = useRTVIClient()!;
  const [prompt, setPrompt] = useState<LLMContextMessage[] | undefined>(
    undefined
  );
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [newName, setNewName] = useState(characterName);
  const [isEditingName, setIsEditingName] = useState(false);

  useEffect(() => {
    if (!characterPrompt) return;

    // Initialize prompt with cleaned-up characterPrompt
    setPrompt([
      {
        role: "system",
        content: characterPrompt
          .split("\n")
          .map((line) => line.trim())
          .join("\n"),
      },
    ]);
  }, [characterPrompt]);

  function save() {
    console.log("Save function called");
    console.log("Current prompt:", prompt);
    console.log("Current newName:", newName);

    if (!voiceClient || !prompt) {
      console.log("Save cancelled - missing voiceClient or prompt");
      return;
    }

    handleUpdate(prompt, newName); // Pass both prompt and name
    console.log("handleUpdate called with name:", newName);

    setHasUnsavedChanges(false); // Reset unsaved changes indicator
  }

  const updateContextMessage = (index: number, content: string) => {
    setPrompt((prev) => {
      if (!prev) return prev;
      const newPrompt = [...prev];
      newPrompt[index].content = content;
      return newPrompt;
    });
    setHasUnsavedChanges(true); // Track unsaved changes
  };

  return (
    <Card.Card className="w-svw max-w-full md:max-w-md lg:max-w-lg">
      <Card.CardHeader>
        <Card.CardTitle>LLM Prompt</Card.CardTitle>
      </Card.CardHeader>
      <Card.CardContent>
        <div className="flex flex-col gap-3">
          {/* Add editable character name */}
          <div className="flex items-center gap-2">
            {isEditingName ? (
              <>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => {
                    console.log("Name input changed to:", e.target.value);
                    setNewName(e.target.value);
                  }}
                  className="flex-1 p-2 border rounded"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    console.log("Save Name clicked. New name:", newName);
                    setIsEditingName(false);
                    setHasUnsavedChanges(true);
                  }}
                >
                  Save Name
                </Button>
              </>
            ) : (
              <>
                <span className="font-bold">Character Name: {newName}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditingName(true)}
                >
                  Edit Name
                </Button>
              </>
            )}
          </div>

          {/* Render editable text areas for each prompt message */}
          {prompt?.map((message, i) => (
            <div key={i} className="flex flex-col gap-1 items-start">
              <span className="font-mono font-bold text-sm">
                {message.role}
              </span>
              <Textarea
                value={message.content as string}
                rows={prompt.length <= 1 ? 10 : 5}
                onChange={(e) => updateContextMessage(i, e.currentTarget.value)}
                className="text-sm w-full whitespace-pre-wrap"
              />
            </div>
          ))}
        </div>
      </Card.CardContent>
      <Card.CardFooter isButtonArray>
        <Button onClick={handleClose}>Close</Button>
        <Button
          variant={hasUnsavedChanges ? "success" : "outline"}
          onClick={() => {
            console.log("Update button clicked");
            console.log("hasUnsavedChanges:", hasUnsavedChanges);
            save(); // Save changes
            handleClose(); // Close modal
          }}
          disabled={!hasUnsavedChanges}
        >
          Update
        </Button>
      </Card.CardFooter>
    </Card.Card>
  );
};

export default Prompt;
