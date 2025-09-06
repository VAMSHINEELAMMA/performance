
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { User, Mail, Shield, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { updateUser, changePassword as changePasswordService } from "@/lib/auth";

export default function ProfilePage() {
    const { user, login } = useAuth();
    const { toast } = useToast();
    const [fullName, setFullName] = useState(user?.fullName || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    if (!user) {
        return null; // Or a loading spinner
    }

    const handleProfileUpdate = () => {
        if (!user || fullName === user.fullName) return;
        try {
            const updatedUser = updateUser(user.email, { fullName });
            // Re-authenticate with old password to update context
            login(updatedUser.email, updatedUser.password);
            toast({ title: "Success", description: "Profile updated successfully." });
        } catch (error: any) {
            toast({ variant: "destructive", title: "Error", description: error.message });
        }
    };
    
    const handleChangePassword = () => {
        if (!user || !currentPassword || !newPassword) {
            toast({ variant: "destructive", title: "Error", description: "Please fill in all password fields." });
            return;
        }
        try {
            changePasswordService(user.email, currentPassword, newPassword);
            toast({ title: "Success", description: "Password changed successfully." });
            setCurrentPassword("");
            setNewPassword("");
        } catch (error: any) {
            toast({ variant: "destructive", title: "Error", description: error.message });
        }
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
                     <div className="space-y-2">
                        <Label htmlFor="fullName" className="flex items-center gap-2"><User className="h-4 w-4 text-muted-foreground"/> Full Name</Label>
                        <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </div>
                </CardContent>
                <CardFooter>
                     <Button onClick={handleProfileUpdate}>Update Profile</Button>
                </CardFooter>
            </Card>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your account password.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="currentPassword" className="flex items-center gap-2"><Lock className="h-4 w-4 text-muted-foreground"/> Current Password</Label>
                        <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="newPassword" className="flex items-center gap-2"><Lock className="h-4 w-4 text-muted-foreground"/> New Password</Label>
                        <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                </CardContent>
                 <CardFooter>
                     <Button onClick={handleChangePassword}>Change Password</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
