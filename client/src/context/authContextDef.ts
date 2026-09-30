import { createContext } from "react";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  UserPublic,
} from "../types";

export const AUTH_TOKEN_KEY = "swarnim_auth_token";

export interface AuthContextType {
  user: UserPublic | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: LoginRequest) => Promise<AuthResponse>;
  register: (payload: RegisterRequest) => Promise<AuthResponse>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
