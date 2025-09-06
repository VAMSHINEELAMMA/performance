
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { User, Mail, Shield } from "lucide-react";

export default function ProfilePage() {
    const { user } = useAuth();

    if (!user) {
        return null; // Or a loading spinner
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <Card className="shadow-lg">
                <CardHeader className="text-center">
                    <Avatar className="h-24 w-24 mx-auto border-4 border-primary/20 mb-4">
                        <AvatarImage src="https://picsum.photos/100" alt="User" data-ai-hint="user avatar" />
                        <AvatarFallback>{user?.fullName?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-3xl font-headline">{user.fullName}</CardTitle>
                    <CardDescription className="capitalize text-primary font-medium">{user.role}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="fullName" className="flex items-center gap-2"><User className="h-4 w-4 text-muted-foreground"/> Full Name</Label>
                        <Input id="fullName" value={user.fullName} readOnly />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground"/> Email Address</Label>
                        <Input id="email" type="email" value={user.email} readOnly />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="role" className="flex items-center gap-2"><Shield className="h-4 w-4 text-muted-foreground"/> Role</Label>
                        <Input id="role" value={user.role} readOnly className="capitalize"/>
                    </div>
                </CardContent>
            </Card>
             <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Update Profile</CardTitle>
                    <CardDescription>Keep your personal information up to date.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">Profile editing is not available in this prototype. In a full application, you would be able to change your name and password here.</p>
                    <Button disabled>Update Profile</Button>
                </CardContent>
            </Card>
        </div>
    )
}
