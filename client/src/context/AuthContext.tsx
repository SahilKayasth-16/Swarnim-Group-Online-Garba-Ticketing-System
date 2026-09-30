import React, { useCallback, useEffect, useState } from "react";
import { getCurrentUser, loginUser, registerUser } from "../services/api";
import {
  AuthContext,
  AUTH_TOKEN_KEY,
  type AuthContextType,
} from "./authContextDef";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  UserPublic,
} from "../types";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(AUTH_TOKEN_KEY)
  );
  const [user, setUser] = useState<UserPublic | null>(null);
  const [loading, setLoading] = useState<boolean>(() =>
    Boolean(localStorage.getItem(AUTH_TOKEN_KEY))
  );

  useEffect(() => {
    let isMounted = true;
    const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);

    if (storedToken) {
      getCurrentUser(storedToken)
        .then((userData) => {
          if (isMounted) {
            setUser(userData);
            setToken(storedToken);
            setLoading(false);
          }
        })
        .catch(() => {
          if (isMounted) {
            localStorage.removeItem(AUTH_TOKEN_KEY);
            setToken(null);
            setUser(null);
            setLoading(false);
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(async (credentials: LoginRequest): Promise<AuthResponse> => {
    setLoading(true);
    try {
      const response = await loginUser(credentials);
      localStorage.setItem(AUTH_TOKEN_KEY, response.access_token);
      setToken(response.access_token);
      setUser(response.user);
      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (payload: RegisterRequest): Promise<AuthResponse> => {
    setLoading(true);
    try {
      const response = await registerUser(payload);
      localStorage.setItem(AUTH_TOKEN_KEY, response.access_token);
      setToken(response.access_token);
      setUser(response.user);
      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: Boolean(token && user),
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
