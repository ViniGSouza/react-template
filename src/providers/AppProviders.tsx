import { Toaster } from "@/shared/components/ui/sonner";
import { ErrorBoundary } from "@/shared/components/ErrorBoundary";
import { ThemeProvider } from "./ThemeProvider";
import { QueryProvider } from "./QueryProvider";

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <QueryProvider>
          {children}
          <Toaster position="top-right" expand={true} richColors />
        </QueryProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};
