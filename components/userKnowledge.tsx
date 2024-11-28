// Create a new component called UserKnowledge.tsx
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

type UserKnowledgeProps = {
  onComplete: (knowledge: string) => void;
  onSkip: () => void;
};

const UserKnowledge: React.FC<UserKnowledgeProps> = ({ onComplete, onSkip }) => {
  const [knowledge, setKnowledge] = useState('');

  return (
    <main className="w-full flex items-center justify-center bg-primary-200 p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle>Add Your Knowledge Base</CardTitle>
          <CardDescription>
            Enter any specific information you'd like the AI to know during your conversation.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Textarea
            placeholder="Enter your knowledge base here..."
            value={knowledge}
            onChange={(e) => setKnowledge(e.target.value)}
            className="min-h-[200px]"
          />
        </CardContent>

        <CardFooter isButtonArray>
          <Button variant="ghost" onClick={onSkip}>
            Skip
          </Button>
          <Button 
            variant="primary"
            onClick={() => onComplete(knowledge)}
            disabled={!knowledge.trim()}
          >
            Continue
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default UserKnowledge;