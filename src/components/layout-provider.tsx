
"use client";

import { usePathname, useRouter } from "next/navigation";
import { AppLayout } from "./app-layout";
import { AuthLayout } from "./auth-layout";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { navItems } from "@/lib/constants";

const appRoutes = [...navItems.map(item => item.href), "/help", "/profile", "/settings"];
const authRoutes = ["/login", "/signup"];
const publicRoutes = ["/"]; // Landing page

function InnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return; // Don't do anything while loading

    const isAppRoute = appRoutes.some(route => pathname.startsWith(route));
    const isAuthRoute = authRoutes.includes(pathname);

    if (!isAuthenticated && isAppRoute) {
      // If user is not authenticated and trying to access a protected app route
      router.push("/login");
    } else if (isAuthenticated && isAuthRoute) {
      // If user is authenticated and trying to access login/signup
      router.push("/dashboard");
    }

  }, [isAuthenticated, pathname, router, isLoading]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        {/* You can replace this with a nice spinner component */}
        <p>Loading...</p>
      </div>
    );
  }

  const isAppRoute = appRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);

  if (isAppRoute) {
     if(isAuthenticated) {
        return (
          <AppLayout>
            {children}
            <Toaster />
          </AppLayout>
        );
     }
     // Show loading or redirect to login while auth state is being confirmed
     return (
        <div className="flex h-screen w-screen items-center justify-center">
            <p>Loading...</p>
        </div>
     )
  }

  if (isAuthRoute) {
    if(!isAuthenticated) {
        return (
          <AuthLayout>
            {children}
            <Toaster />
          </AuthLayout>
        );
    }
     // If authenticated, redirect away from auth routes
     return (
        <div className="flex h-screen w-screen items-center justify-center">
            <p>Loading...</p>
        </div>
     )
  }
  
  if (isPublicRoute) {
     return <>
      {children}
      <Toaster />
     </>;
  }

  // Fallback for scenarios like loading or initial render before redirect kicks in
  return (
      <div className="flex h-screen w-screen items-center justify-center">
        <p>Loading...</p>
      </div>
  );
}


export function LayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <InnerLayout>{children}</InnerLayout>
    </AuthProvider>
  );
}
