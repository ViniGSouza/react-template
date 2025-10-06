export type UserRole = "seller" | "manager";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
