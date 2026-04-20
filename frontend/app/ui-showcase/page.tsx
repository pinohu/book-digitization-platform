"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function UIShowcase() {
  const [progress, setProgress] = useState(33)
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">UI Component Showcase</h1>
      
      <Tabs defaultValue="buttons" className="mb-8">
        <TabsList>
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="inputs">Inputs</TabsTrigger>
          <TabsTrigger value="data">Data Display</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>
        
        <TabsContent value="buttons" className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          
          <h3 className="text-lg font-semibold mt-6 mb-4">Sizes</h3>
          <div className="flex flex-wrap gap-4 items-center">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="cards" className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Card</CardTitle>
                <CardDescription>A simple card component</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Cards can be used to group related content and actions.</p>
              </CardContent>
              <CardFooter>
                <Button>Action</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>With interactive elements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input placeholder="Enter your name" />
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between">
                    <Button 
                      size="sm" 
                      onClick={() => setProgress(p => Math.max(0, p - 10))}
                      disabled={progress <= 0}
                    >
                      Decrease
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => setProgress(p => Math.min(100, p + 10))}
                      disabled={progress >= 100}
                    >
                      Increase
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Badge>{progress}%</Badge>
                <Button>Submit</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="inputs" className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Inputs</h2>
          <div className="space-y-6 max-w-xl">
            <div className="space-y-2">
              <label className="text-sm font-medium">Text Input</label>
              <Input placeholder="Enter your name" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Textarea</label>
              <Textarea placeholder="Enter your message" />
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dialog Title</DialogTitle>
                  <DialogDescription>
                    This is a dialog component for displaying modal content and forms.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Input placeholder="Enter information" />
                </div>
                <div className="flex justify-end">
                  <Button>Save</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </TabsContent>
        
        <TabsContent value="data" className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Data Display</h2>
          
          <h3 className="text-lg font-medium mb-2">Table</h3>
          <Table className="mb-6">
            <TableCaption>A list of recent transactions</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: '1', description: 'Payment', status: 'success', amount: '$250.00' },
                { id: '2', description: 'Refund', status: 'pending', amount: '$125.00' },
                { id: '3', description: 'Subscription', status: 'error', amount: '$19.99' },
              ].map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    <Badge variant={
                      row.status === 'success' ? 'default' :
                      row.status === 'pending' ? 'outline' : 'destructive'
                    }>
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <h3 className="text-lg font-medium mb-2">Progress</h3>
          <div className="space-y-4 max-w-xl mb-6">
            <Progress value={25} className="h-2" />
            <Progress value={50} className="h-2" />
            <Progress value={75} className="h-2" />
          </div>
          
          <h3 className="text-lg font-medium mb-2">Avatar</h3>
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
          </div>
        </TabsContent>
        
        <TabsContent value="navigation" className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Navigation & Dividers</h2>
          
          <h3 className="text-lg font-medium mb-2">Separator</h3>
          <div className="space-y-4 max-w-xl">
            <div>This content is above the separator</div>
            <Separator />
            <div>This content is below the separator</div>
          </div>
        </TabsContent>
        
        <TabsContent value="feedback" className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Feedback Components</h2>
          
          <h3 className="text-lg font-medium mb-2">Tooltip</h3>
          <div className="mb-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This is a tooltip</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <h3 className="text-lg font-medium mb-2">Toast</h3>
          <div>
            <Button
              onClick={() => {
                toast({
                  title: "Scheduled",
                  description: "Your task has been scheduled for later",
                })
              }}
            >
              Show Toast Notification
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      <Toaster />
    </div>
  )
} 