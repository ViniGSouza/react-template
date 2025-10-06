import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks";
import { loginSchema, type LoginFormData } from "../schemas/login.schema";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

export const LoginForm = () => {
  const navigate = useNavigate();
  const {
    mutateAsync: login,
    isPending: isLoggingIn,
    error: loginError,
  } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl border border-border bg-card backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Bem-vindo de volta</CardTitle>
        <CardDescription>
          Entre com suas credenciais para acessar a plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register("email")}
              disabled={isLoggingIn}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••"
              {...register("password")}
              disabled={isLoggingIn}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          {loginError && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {loginError.message}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoggingIn}>
            {isLoggingIn ? "Entrando..." : "Entrar"}
          </Button>

          <div className="mt-4 space-y-2 text-sm text-muted-foreground border-t border-border pt-4">
            <p className="font-medium text-foreground">Credenciais de teste:</p>
            <div className="space-y-1 text-xs">
              <p>
                <strong className="text-foreground">Vendedor:</strong>{" "}
                vendedor@example.com / 123456
              </p>
              <p>
                <strong className="text-foreground">Gerente:</strong>{" "}
                gerente@example.com / 123456
              </p>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
