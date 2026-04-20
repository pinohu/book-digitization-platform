"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  DotsHorizontalIcon,
  MagnifyingGlassIcon,
  Pencil1Icon,
  TrashIcon,
  PlayIcon,
  PauseIcon,
} from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";

type Venture = {
  id: string;
  name: string;
  description: string;
  status: "active" | "paused" | "completed";
  agents: string[];
  createdAt: string;
  completionRate: number;
};

interface VenturesListProps {
  ventures: Venture[];
}

export function VenturesList({ ventures }: VenturesListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  // Filter and sort ventures
  const filteredVentures = ventures
    .filter((venture) => {
      // Search filter
      const matchesSearch = venture.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) || 
        venture.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus = statusFilter === "all" || venture.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // Sort by selected criteria
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "status":
          return a.status.localeCompare(b.status);
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "completion":
          return b.completionRate - a.completionRate;
        default:
          return 0;
      }
    });

  const handleStatusChange = async (ventureId: string, newStatus: "active" | "paused") => {
    setIsUpdating(ventureId);
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: `Venture ${newStatus === "active" ? "Activated" : "Paused"}`,
        description: `The venture has been ${newStatus === "active" ? "activated" : "paused"}.`,
      });
      // In a real app, you would update the actual data
    } catch (error) {
      toast({
        title: "Action Failed",
        description: "Could not update the venture status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "paused":
        return "bg-amber-500";
      case "completed":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
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
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search ventures..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="completion">Completion Rate</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredVentures.length > 0 ? (
          filteredVentures.map((venture) => (
            <Card key={venture.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      <span>{venture.name}</span>
                      <div className={`h-2 w-2 rounded-full ${getStatusColor(venture.status)}`} />
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {venture.agents.length} agent{venture.agents.length !== 1 ? "s" : ""}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <DotsHorizontalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/ventures/${venture.id}`}>
                          View details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/ventures/${venture.id}/edit`} className="flex items-center">
                          <Pencil1Icon className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {venture.status === "active" ? (
                        <DropdownMenuItem 
                          onClick={() => handleStatusChange(venture.id, "paused")}
                          disabled={isUpdating === venture.id}
                          className="flex items-center"
                        >
                          <PauseIcon className="mr-2 h-4 w-4" />
                          Pause
                        </DropdownMenuItem>
                      ) : venture.status === "paused" ? (
                        <DropdownMenuItem 
                          onClick={() => handleStatusChange(venture.id, "active")}
                          disabled={isUpdating === venture.id}
                          className="flex items-center"
                        >
                          <PlayIcon className="mr-2 h-4 w-4" />
                          Activate
                        </DropdownMenuItem>
                      ) : null}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive flex items-center">
                        <TrashIcon className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {venture.description}
                </p>
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs font-medium">{venture.completionRate}%</span>
                  </div>
                  <Progress value={venture.completionRate} className="h-2" />
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 p-2">
                <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    {getStatusBadge(venture.status)}
                  </div>
                  <div>
                    Created {new Date(venture.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground">
            No ventures found matching the current filters.
          </div>
        )}
      </div>
    </div>
  );
} 