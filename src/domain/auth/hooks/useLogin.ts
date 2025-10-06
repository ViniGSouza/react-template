import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";

const AUTH_USER_KEY = ["auth", "me"];

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_USER_KEY });
    },
  });
};
