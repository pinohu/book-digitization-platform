"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SimpleUIShowcase() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Simple UI Showcase</h1>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Default Button</Button>
            <Button variant="outline">Outline Button</Button>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Cards</h2>
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Sample Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p>This is a sample card component.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 