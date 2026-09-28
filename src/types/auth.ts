export type LoginKind = "student_number" | "email";

export interface LoginResponse {
  message: string;
  csrfToken: string;
  redirectTo: "/alumno" | "/administrador";
  user: {
    id: string;
    email: string;
    firstName: string;
    lastNamePaternal: string;
    lastNameMaternal: string | null;
    status: "active";
  };
}

export interface LoginCredentials {
  numberOrEmail: string,
  password: string
}

export interface ErrorResponse {
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  firstName: string;
  lastNamePaternal: string;
  lastNameMaternal: string | null;
  status: string;
  roles: string[];
  availableApps: Array<"ADMIN" | "STUDENT">;
  redirectTo: "/administrador" | "/alumno" | null;
}

export interface MeResponse {
  user: AuthenticatedUser;
}