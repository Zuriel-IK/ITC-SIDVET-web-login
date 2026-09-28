import api from "../lib/api";
import type { LoginCredentials, LoginResponse, MeResponse } from "../types/auth";


export const authService = {
  login(credentials: LoginCredentials) {
    return api.post<LoginResponse, LoginResponse>(
      "/auth/login",
      credentials
    );
  },

   getMe(signal?: AbortSignal) {
    return api.get<MeResponse, MeResponse>(
      "/auth/me",
      { signal },
    );
  },
};