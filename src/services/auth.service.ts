import api from "../lib/api";
import type { LoginCredentials, LoginResponse } from "../types/auth";


export const authService = {
  login(credentials: LoginCredentials) {
    return api.post<LoginResponse, LoginResponse>(
      "/auth/login",
      credentials
    );
  },
};