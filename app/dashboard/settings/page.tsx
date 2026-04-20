"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

      <div className="grid gap-4">
        <Card className="p-6">
          <h3 className="text-lg font-medium">System Configuration</h3>
          <p className="text-sm text-muted-foreground">
            Configure your AI ∞ OS instance settings
          </p>
          <Separator className="my-4" />
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="api-url">API URL</Label>
              <Input
                id="api-url"
                placeholder="https://api.example.com"
                defaultValue={process.env.NEXT_PUBLIC_API_URL}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="vector-db">Vector Database URL</Label>
              <Input
                id="vector-db"
                placeholder="qdrant://localhost:6333"
                defaultValue="qdrant://localhost:6333"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="debug-mode" />
              <Label htmlFor="debug-mode">Debug Mode</Label>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium">Agent Settings</h3>
          <p className="text-sm text-muted-foreground">
            Configure global agent settings
          </p>
          <Separator className="my-4" />
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="memory-limit">Memory Limit (MB)</Label>
              <Input
                id="memory-limit"
                type="number"
                placeholder="512"
                defaultValue="512"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="auto-scale" defaultChecked />
              <Label htmlFor="auto-scale">Auto-scaling</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="telemetry" defaultChecked />
              <Label htmlFor="telemetry">Send Telemetry Data</Label>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium">Security</h3>
          <p className="text-sm text-muted-foreground">
            Configure security settings
          </p>
          <Separator className="my-4" />
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="token-expiry">Token Expiry (hours)</Label>
              <Input
                id="token-expiry"
                type="number"
                placeholder="24"
                defaultValue="24"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="2fa" />
              <Label htmlFor="2fa">Enable 2FA</Label>
            </div>
          </div>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button variant="outline">Reset to Defaults</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
} 