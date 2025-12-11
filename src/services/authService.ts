import api, { tokenStorage } from "./api";
import type { User } from "../types/user.types";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", credentials);

    // Store tokens on successful login
    if (response.data.success) {
      tokenStorage.setTokens(
        response.data.data.accessToken,
        response.data.data.refreshToken,
      );
    }

    return response.data;
  },

  logout: async (): Promise<void> => {
    try {
      await api.post("/auth/logout");
    } finally {
      // Always clear tokens, even if API call fails
      tokenStorage.clearTokens();
    }
  },

  getCurrentUser: async (): Promise<{
    success: boolean;
    data: { user: User };
  }> => {
    const response = await api.get("/auth/me");
    return response.data;
  },

  isAuthenticated: (): boolean => {
    return !!tokenStorage.getAccessToken();
  },
};
