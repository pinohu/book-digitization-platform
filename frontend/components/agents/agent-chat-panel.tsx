"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PaperPlaneIcon, ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Message {
  id: string;
  role: "user" | "agent" | "system";
  content: string;
  timestamp: Date;
}

interface AgentChatPanelProps {
  agentId: string;
  agentName: string;
  status: string;
}

export function AgentChatPanel({ agentId, agentName, status }: AgentChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "system",
      content: `Welcome to the chat interface for ${agentName}. How can I assist you today?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!input.trim() || isSubmitting) return;
    if (status !== "active") {
      toast({
        title: "Agent is not active",
        description: "Please activate the agent before sending messages.",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsSubmitting(true);

    try {
      // In a real app, this would be an API call to your AI service
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock response
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "agent",
        content: generateMockResponse(input.trim()),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, agentMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response from the agent. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      textareaRef.current?.focus();
    }
  };

  // Mock function to generate responses
  const generateMockResponse = (userInput: string): string => {
    const responses = [
      `I understand you're asking about "${userInput}". As an AI agent, I can help you with that.`,
      `Thanks for your query about "${userInput}". Based on my analysis, I would recommend considering several factors.`,
      `Regarding "${userInput}", I've processed this request and can provide you with relevant information.`,
      `I've analyzed your question about "${userInput}" and prepared a comprehensive response.`,
    ];
    
    // Add some details based on agent type
    const details = [
      "Let me search for the latest information on this topic.",
      "I can analyze this data for you to extract meaningful insights.",
      "Would you like me to provide more specific details on any aspect of this?",
      "There are several approaches we could take to address this request.",
    ];
    
    return `${responses[Math.floor(Math.random() * responses.length)]} ${details[Math.floor(Math.random() * details.length)]}`;
  };

  return (
    <div className="flex h-[500px] flex-col">
      {status !== "active" && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            This agent is currently inactive. Please activate it to start a conversation.
          </AlertDescription>
        </Alert>
      )}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 pb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-3 rounded-lg p-4",
                message.role === "user"
                  ? "ml-auto max-w-[80%] bg-primary text-primary-foreground"
                  : message.role === "agent"
                  ? "mr-auto max-w-[80%] bg-muted"
                  : "mx-auto max-w-[90%] bg-muted/50 text-muted-foreground text-sm"
              )}
            >
              {message.role !== "user" && (
                <Avatar className="h-8 w-8">
                  {message.role === "agent" ? (
                    <AvatarImage src={`https://avatar.vercel.sh/${agentId}`} alt={agentName} />
                  ) : null}
                  <AvatarFallback>
                    {message.role === "agent" ? agentName.charAt(0) : "S"}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="flex-1">
                {message.role === "system" ? (
                  <div className="text-center">{message.content}</div>
                ) : (
                  <div className="whitespace-pre-wrap break-words">
                    {message.content}
                  </div>
                )}
                <div
                  className={cn(
                    "mt-1 text-xs",
                    message.role === "user"
                      ? "text-right text-primary-foreground/80"
                      : "text-muted-foreground"
                  )}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              {message.role === "user" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex items-end gap-2"
        >
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="min-h-[60px] flex-1 resize-none overflow-hidden rounded-md"
            disabled={isSubmitting || status !== "active"}
          />
          <Button
            type="submit"
            size="icon"
            className="h-[60px] w-[60px]"
            disabled={isSubmitting || !input.trim() || status !== "active"}
          >
            {isSubmitting ? (
              <ReloadIcon className="h-5 w-5 animate-spin" />
            ) : (
              <PaperPlaneIcon className="h-5 w-5" />
            )}
          </Button>
        </form>
        <p className="mt-2 text-xs text-muted-foreground">
          Press Shift + Enter for a new line. Enter to send.
        </p>
      </div>
    </div>
  );
} 