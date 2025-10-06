import { useQuery } from "@tanstack/react-query";
import { authService } from "../services/authService";
import { storage } from "@/core";
import type { User } from "../types";

const AUTH_USER_KEY = ["auth", "me"];

export const useAuthUser = () => {
  return useQuery<User, Error>({
    queryKey: AUTH_USER_KEY,
    queryFn: () => authService.getMe(),
    retry: false,
    enabled: !!storage.get("token"),
  });
};
