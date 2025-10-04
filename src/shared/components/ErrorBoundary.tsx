import React from "react";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    toast.error("Erro inesperado", {
      description:
        error.message ||
        "Ocorreu um erro na aplicação. Tente recarregar a página.",
      duration: 5000,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
          <div className="w-full max-w-md space-y-6 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-10 w-10 text-destructive" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Ops! Algo deu errado</h1>
              <p className="text-muted-foreground">
                Ocorreu um erro inesperado na aplicação.
              </p>
              {this.state.error && (
                <p className="text-sm text-destructive font-mono bg-destructive/5 p-3 rounded-lg">
                  {this.state.error.message}
                </p>
              )}
            </div>

            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => window.location.reload()}
                className="gap-2"
              >
                Recarregar Página
              </Button>
              <Button
                variant="outline"
                onClick={() => this.setState({ hasError: false, error: null })}
              >
                Tentar Novamente
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
