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
  ListBulletIcon,
  PlusIcon,
  ClockIcon,
  Component1Icon,
  TimerIcon,
} from "@radix-ui/react-icons";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Agent in a venture
type VentureAgent = {
  id: string;
  name: string;
  role: string;
  type: string;
  status: string;
};

// Timeline event
type TimelineEvent = {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
};

// Task in a venture
type VentureTask = {
  id: string;
  title: string;
  status: "pending" | "in_progress" | "completed" | "failed";
  assignedAgent: string;
  completedAt: string | null;
};

// Complete venture type
type Venture = {
  id: string;
  name: string;
  description: string;
  status: string;
  agents: VentureAgent[];
  timeline: TimelineEvent[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  completionRate: number;
  tasks: VentureTask[];
};

interface VentureDetailProps {
  venture: Venture;
}

export function VentureDetail({ venture }: VentureDetailProps) {
  const [isActivating, setIsActivating] = useState(false);
  const [isPausing, setIsPausing] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(venture.status);

  const handleActivate = async () => {
    setIsActivating(true);
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCurrentStatus("active");
      toast({
        title: "Venture activated",
        description: "The venture is now running.",
      });
    } catch (error) {
      toast({
        title: "Activation failed",
        description: "Could not activate the venture. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsActivating(false);
    }
  };

  const handlePause = async () => {
    setIsPausing(true);
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCurrentStatus("paused");
      toast({
        title: "Venture paused",
        description: "The venture has been paused.",
      });
    } catch (error) {
      toast({
        title: "Pause failed",
        description: "Could not pause the venture. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPausing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "paused":
        return <Badge variant="secondary">Paused</Badge>;
      case "completed":
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Completed</Badge>;
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>;
      case "in_progress":
        return <Badge variant="default" className="bg-amber-500">In Progress</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getTimelineIcon = (eventType: string) => {
    switch (eventType) {
      case "creation":
        return <PlusIcon className="h-4 w-4" />;
      case "agent_added":
        return <Component1Icon className="h-4 w-4" />;
      case "milestone":
        return <ClockIcon className="h-4 w-4" />;
      case "status_change":
        return <TimerIcon className="h-4 w-4" />;
      default:
        return <ListBulletIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <Card className="w-full md:w-2/3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Venture Information</CardTitle>
                <CardDescription>Overview and basic details</CardDescription>
              </div>
              {getStatusBadge(currentStatus)}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
              <p className="mt-1">{venture.description}</p>
            </div>
            <Separator />
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Created</h4>
                <p className="mt-1">{new Date(venture.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Last Updated</h4>
                <p className="mt-1">{new Date(venture.updatedAt).toLocaleDateString()}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Created By</h4>
                <p className="mt-1">{venture.createdBy}</p>
              </div>
            </div>
            <Separator />
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-muted-foreground">Overall Progress</h4>
                <span className="text-sm font-medium">{venture.completionRate}%</span>
              </div>
              <Progress value={venture.completionRate} className="h-2" />
            </div>
          </CardContent>
          <CardFooter className="justify-between border-t px-6 py-4">
            {currentStatus === "active" ? (
              <Button 
                variant="outline" 
                onClick={handlePause} 
                disabled={isPausing}
              >
                {isPausing ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Pausing...
                  </>
                ) : (
                  <>
                    <StopIcon className="mr-2 h-4 w-4" />
                    Pause Venture
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
                    Activating...
                  </>
                ) : (
                  <>
                    <PlayIcon className="mr-2 h-4 w-4" />
                    Activate Venture
                  </>
                )}
              </Button>
            )}
            <div className="flex gap-2">
              <Button variant="outline">
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Agent
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card className="w-full md:w-1/3">
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
            <CardDescription>Recent events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative pl-6 space-y-4">
              <div className="absolute top-0 bottom-0 left-2 w-px bg-muted-foreground/20" />
              {venture.timeline.map((event, index) => (
                <div key={event.id} className="relative">
                  <div className="absolute -left-4 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                    {getTimelineIcon(event.type)}
                  </div>
                  <div className="pl-4">
                    <h4 className="text-sm font-medium">{event.title}</h4>
                    <p className="text-xs text-muted-foreground">{event.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(event.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="agents" className="w-full">
        <TabsList>
          <TabsTrigger value="agents">
            <Component1Icon className="mr-2 h-4 w-4" />
            Agents
          </TabsTrigger>
          <TabsTrigger value="tasks">
            <ListBulletIcon className="mr-2 h-4 w-4" />
            Tasks
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="agents" className="border rounded-md mt-2 p-4">
          <h3 className="text-lg font-medium mb-4">Agents in this Venture</h3>
          {venture.agents.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {venture.agents.map((agent) => (
                <Card key={agent.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{agent.name}</CardTitle>
                    <CardDescription>{agent.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="capitalize">{agent.type}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      {getStatusBadge(agent.status)}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-2">
                    <Button variant="ghost" asChild className="w-full" size="sm">
                      <Link href={`/dashboard/agents/${agent.id}`}>
                        View Agent
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              No agents have been added to this venture yet.
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="tasks" className="border rounded-md mt-2 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Tasks</h3>
            <Button size="sm">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </div>
          {venture.tasks.length > 0 ? (
            <Table>
              <TableCaption>A list of tasks for this venture.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned Agent</TableHead>
                  <TableHead>Completed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {venture.tasks.map((task) => {
                  const assignedAgent = venture.agents.find(
                    (agent) => agent.id === task.assignedAgent
                  );
                  
                  return (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.title}</TableCell>
                      <TableCell>{getStatusBadge(task.status)}</TableCell>
                      <TableCell>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="link" size="sm" asChild className="p-0 h-auto">
                                <Link href={`/dashboard/agents/${task.assignedAgent}`}>
                                  {assignedAgent?.name || task.assignedAgent}
                                </Link>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Role: {assignedAgent?.role || "Unknown"}</p>
                              <p>Type: {assignedAgent?.type || "Unknown"}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell>
                        {task.completedAt
                          ? new Date(task.completedAt).toLocaleDateString()
                          : "Not completed"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center text-muted-foreground">
              No tasks have been created for this venture yet.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 