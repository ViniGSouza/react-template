import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
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
  const { login, isLoggingIn, loginError } = useAuth();

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
    <Card className="w-full max-w-md shadow-xl border-0 bg-card/50 backdrop-blur-sm">
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

          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p className="font-medium">Credenciais de teste:</p>
            <div className="space-y-1">
              <p>
                <strong>Vendedor:</strong> vendedor@agisales.com / 123456
              </p>
              <p>
                <strong>Gerente:</strong> gerente@agisales.com / 123456
              </p>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
