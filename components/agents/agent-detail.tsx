"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  PlayIcon,
  StopIcon,
  ReloadIcon,
  CodeIcon,
  ChatBubbleIcon,
  InfoCircledIcon,
  BarChartIcon,
  GearIcon,
} from "@radix-ui/react-icons";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { AgentChatPanel } from "@/components/agents/agent-chat-panel";

// Use more specific typing
type AgentStats = {
  totalCalls: number;
  totalTokensUsed: number;
  averageResponseTime: number;
  errorRate: number;
};

type Agent = {
  id: string;
  name: string;
  description: string;
  status: string;
  type: string;
  model: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  maxTokens: number;
  temperature: number;
  systemPrompt: string;
  apiEndpoint: string;
  lastActivity: string;
  stats: AgentStats;
};

interface AgentDetailProps {
  agent: Agent;
}

export function AgentDetail({ agent }: AgentDetailProps) {
  const [isActivating, setIsActivating] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(agent.status);
  const [systemPrompt, setSystemPrompt] = useState(agent.systemPrompt);
  const [showEditor, setShowEditor] = useState(false);

  const handleActivate = async () => {
    setIsActivating(true);
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCurrentStatus("active");
      toast({
        title: "Agent activated",
        description: "The agent is now ready to use.",
      });
    } catch (error) {
      toast({
        title: "Activation failed",
        description: "Could not activate the agent. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsActivating(false);
    }
  };

  const handleDeactivate = async () => {
    setIsDeactivating(true);
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCurrentStatus("inactive");
      toast({
        title: "Agent deactivated",
        description: "The agent has been stopped.",
      });
    } catch (error) {
      toast({
        title: "Deactivation failed",
        description: "Could not deactivate the agent. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeactivating(false);
    }
  };

  const handleUpdateSystemPrompt = async () => {
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "System prompt updated",
        description: "The agent's behavior has been updated.",
      });
      setShowEditor(false);
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Could not update the system prompt. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <Card className="w-full md:w-2/3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Agent Information</CardTitle>
                <CardDescription>Overview and basic details</CardDescription>
              </div>
              <Badge 
                variant={currentStatus === "active" ? "default" : "secondary"}
                className="capitalize"
              >
                {currentStatus}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                <p className="mt-1">{agent.description}</p>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Agent Type</h4>
                  <p className="mt-1 capitalize">{agent.type}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Model</h4>
                  <p className="mt-1">{agent.model}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Created By</h4>
                  <p className="mt-1">{agent.createdBy}</p>
                </div>
              </div>
            </div>
            <Separator />
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Created</h4>
                <p className="mt-1">{new Date(agent.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Last Updated</h4>
                <p className="mt-1">{new Date(agent.updatedAt).toLocaleDateString()}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Last Activity</h4>
                <p className="mt-1">{new Date(agent.lastActivity).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-between border-t px-6 py-4">
            {currentStatus === "active" ? (
              <Button 
                variant="destructive" 
                onClick={handleDeactivate} 
                disabled={isDeactivating}
              >
                {isDeactivating ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Stopping...
                  </>
                ) : (
                  <>
                    <StopIcon className="mr-2 h-4 w-4" />
                    Stop Agent
                  </>
                )}
              </Button>
            ) : (
              <Button 
                onClick={handleActivate} 
                disabled={isActivating}
              >
                {isActivating ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Starting...
                  </>
                ) : (
                  <>
                    <PlayIcon className="mr-2 h-4 w-4" />
                    Start Agent
                  </>
                )}
              </Button>
            )}
            <div className="flex gap-2">
              <Dialog open={showEditor} onOpenChange={setShowEditor}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <CodeIcon className="mr-2 h-4 w-4" />
                    Edit System Prompt
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Edit System Prompt</DialogTitle>
                    <DialogDescription>
                      Modify the system prompt to change the agent's behavior.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Textarea
                      className="min-h-[200px] font-mono text-sm"
                      value={systemPrompt}
                      onChange={(e) => setSystemPrompt(e.target.value)}
                      placeholder="Enter system prompt..."
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setShowEditor(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleUpdateSystemPrompt}>
                      Save Changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardFooter>
        </Card>

        <Card className="w-full md:w-1/3">
          <CardHeader>
            <CardTitle>Stats & Usage</CardTitle>
            <CardDescription>Agent performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Total API Calls</h4>
              <p className="mt-1 text-2xl font-bold">{agent.stats.totalCalls.toLocaleString()}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Total Tokens Used</h4>
              <p className="mt-1 text-2xl font-bold">{agent.stats.totalTokensUsed.toLocaleString()}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Avg Response Time</h4>
              <p className="mt-1 text-2xl font-bold">{agent.stats.averageResponseTime}s</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Error Rate</h4>
              <p className="mt-1 text-2xl font-bold">{(agent.stats.errorRate * 100).toFixed(2)}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList>
          <TabsTrigger value="chat">
            <ChatBubbleIcon className="mr-2 h-4 w-4" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="configuration">
            <GearIcon className="mr-2 h-4 w-4" />
            Configuration
          </TabsTrigger>
          <TabsTrigger value="history">
            <InfoCircledIcon className="mr-2 h-4 w-4" />
            History
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChartIcon className="mr-2 h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="chat" className="min-h-[500px] border rounded-md mt-2">
          <AgentChatPanel agentId={agent.id} agentName={agent.name} status={currentStatus} />
        </TabsContent>
        <TabsContent value="configuration" className="min-h-[400px] border rounded-md p-4 mt-2">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium">Model Configuration</h3>
              <div className="space-y-4 mt-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Model</h4>
                  <p className="mt-1">{agent.model}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Max Tokens</h4>
                  <p className="mt-1">{agent.maxTokens}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Temperature</h4>
                  <p className="mt-1">{agent.temperature}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">API Endpoint</h4>
                  <p className="mt-1 break-words">{agent.apiEndpoint}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">System Prompt</h3>
              <div className="mt-4 border rounded-md p-3 font-mono text-sm bg-muted whitespace-pre-wrap">
                {agent.systemPrompt}
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="history" className="min-h-[400px] border rounded-md p-4 mt-2">
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <p className="text-muted-foreground">
              Chat history will be displayed here in the fully implemented version.
            </p>
            <Button variant="outline" className="mt-4">
              Load History
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="min-h-[400px] border rounded-md p-4 mt-2">
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <p className="text-muted-foreground">
              Detailed analytics and charts will be displayed here in the fully implemented version.
            </p>
            <Button variant="outline" className="mt-4">
              Generate Report
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 