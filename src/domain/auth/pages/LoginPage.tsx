import { LoginForm } from "@/domain/auth";
import { TrendingUp, Users, Zap } from "lucide-react";
import Logo from "@/brand/Logo";
import { ThemeToggle } from "@/shared/components/ui/theme-toggle";

export const LoginPage = () => {
  return (
    <div className="flex min-h-screen bg-background relative">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="flex flex-1 justify-center items-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8 w-full max-w-md">
          <div className="text-center">
            <div className="flex justify-center items-center mx-auto mb-4">
              <Logo />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Plataforma de Gestão de Propostas
            </p>
          </div>

          <LoginForm />

          <div className="flex justify-center">
            <Logo className="w-20 opacity-30" />
          </div>
          <p className="-mt-2 text-xs text-center text-muted-foreground">
            &copy; 2025 Todos os direitos reservados.
          </p>
        </div>
      </div>

      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-l border-border">
        <div className="flex flex-col justify-center px-12 py-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Gerencie suas propostas com eficiência
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                Acompanhe, aprove e analise suas propostas comerciais em tempo
                real.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="flex justify-center items-center w-12 h-12 bg-gradient-to-br rounded-xl ring-2 from-primary/20 to-accent/20 ring-primary/20">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Dashboard em tempo real
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Visualize métricas e KPIs atualizados automaticamente
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex justify-center items-center w-12 h-12 bg-gradient-to-br rounded-xl ring-2 from-primary/20 to-accent/20 ring-primary/20">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Aprovação rápida
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Aprove ou rejeite propostas com apenas um clique
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex justify-center items-center w-12 h-12 bg-gradient-to-br rounded-xl ring-2 from-primary/20 to-accent/20 ring-primary/20">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Colaboração eficiente
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Trabalhe em equipe com perfis de vendedor e gerente
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
