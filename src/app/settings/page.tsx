
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Palette, Lock } from "lucide-react";


export default function SettingsPage() {

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Palette className="text-primary"/> Appearance</CardTitle>
                    <CardDescription>Customize the look and feel of the application.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <Label htmlFor="dark-mode" className="font-medium">Dark Mode</Label>
                            <p className="text-sm text-muted-foreground">Enable or disable dark theme.</p>
                        </div>
                        <Switch id="dark-mode" disabled />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Theme switching is not implemented in this prototype.</p>
                </CardContent>
            </Card>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Bell className="text-primary"/> Notifications</CardTitle>
                    <CardDescription>Manage how you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Notification settings are not available in this prototype.</p>
                </CardContent>
            </Card>
            
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Lock className="text-primary"/> Security</CardTitle>
                    <CardDescription>Change your password and manage account security.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Account security features are not available in this prototype.</p>
                </CardContent>
            </Card>

        </div>
    )
}
