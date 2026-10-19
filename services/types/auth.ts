export type UserRole = "guest" | "admin" | "owner";

export type User = {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
  lastLogin?: string;
};

export type AuthResponse = {
  message: string;
  token: string;
  user: User;
};

export type MeResponse = {
  user: User;
};

export type OwnerExistsResponse = {
  exists: boolean;
};

export type MessageResponse = {
  message: string;
};

export type ValidationErrorResponse = {
  message: "Validation error";
  errors: Object[];
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = LoginRequest & {
  confirmPassword: string;
};
