import { LoginForm } from "@/domain/auth";
import { Sparkles, TrendingUp, Users, Zap } from "lucide-react";

export const LoginPage = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 justify-center items-center px-4 py-12 bg-white sm:px-6 lg:px-8">
        <div className="space-y-8 w-full max-w-md">
          <div className="text-center">
            <div className="flex justify-center items-center mx-auto mb-4 w-16 h-16 bg-gradient-to-br rounded-2xl shadow-lg animate-pulse from-primary via-accent to-primary/80 shadow-primary/30">
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] bg-clip-text text-transparent">
                Agisales
              </span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Plataforma de Gestão de Propostas
            </p>
          </div>

          <LoginForm />

          <p className="text-xs text-center text-muted-foreground">
            &copy; 2025 Agisales. Todos os direitos reservados.
          </p>
        </div>
      </div>

      <div className="hidden bg-gradient-to-br lg:flex lg:flex-1 from-primary/10 via-primary/5 to-background">
        <div className="flex flex-col justify-center px-12 py-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
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
                  <h3 className="font-semibold">Dashboard em tempo real</h3>
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
                  <h3 className="font-semibold">Aprovação rápida</h3>
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
                  <h3 className="font-semibold">Colaboração eficiente</h3>
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
