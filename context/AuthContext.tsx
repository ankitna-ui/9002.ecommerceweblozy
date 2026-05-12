"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { BrandLoader } from "@/components/common/BrandLoader";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useLocalStorage<string | null>("pfdb-token", null);
  const [user, setUser] = useLocalStorage<User | null>("pfdb-user", null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const login = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  if (!isMounted) return <BrandLoader />; // Show premium loader during hydration

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!token,
        login,
        logout,
        token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
