export type LoginKind = "student_number" | "email";

export interface LoginResponse {
  message: string;
  csrfToken: string;
  redirectTo: "/student" | "/admin";
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