import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";

const AUTH_USER_KEY = ["auth", "me"];

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.setQueryData(AUTH_USER_KEY, null);
      queryClient.clear();
    },
  });
};
