
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getCurrentUser, login as loginService, logout as logoutService, User } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      setIsLoading(false);
    };
    checkUser();
     // Listen to storage events to sync across tabs
    window.addEventListener('storage', checkUser);
    return () => {
      window.removeEventListener('storage', checkUser);
    };
  }, []);

  const login = (email: string, password: string): boolean => {
    try {
      const loggedInUser = loginService(email, password);
      setUser(loggedInUser);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    logoutService();
    setUser(null);
    router.push("/login");
  };
  
  const isAuthenticated = !isLoading && !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
