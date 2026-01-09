export type UserRole = 'Buyer' | 'Seller';

export interface AuthUser {
  id: number;
  email: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role: UserRole;
}

/** რეალური API Response */
export interface AuthApiResponse {
  userId: number;
  email: string;
  role: UserRole;
  accessToken: string;
  expiresAtUtc: string;
}
