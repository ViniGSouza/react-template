import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/domain/auth/hooks/useAuth";
import { Button } from "@/shared/components/ui/button";
import { ThemeToggle } from "@/shared/components/ui/theme-toggle";
import { NotificationsDropdown } from "@/shared/components/NotificationsDropdown";
import { Badge } from "@/shared/components/ui/badge";
import { LogOut, User, ChevronDown } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const AppLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center justify-between px-6">
            {/* Breadcrumb ou título - pode ser expandido depois */}
            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                {/* Pode ser dinâmico baseado na rota */}
              </h1>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <NotificationsDropdown />

              {/* User Menu */}
              <div className="relative">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 h-9"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium leading-none">
                      {user?.name}
                    </p>
                    <Badge
                      variant={
                        user?.role === "manager" ? "default" : "secondary"
                      }
                      className="text-xs mt-1"
                    >
                      {user?.role === "manager" ? "Gerente" : "Vendedor"}
                    </Badge>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      userMenuOpen && "rotate-180"
                    )}
                  />
                </Button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-lg border border-border bg-card/95 backdrop-blur-xl p-2 shadow-2xl animate-in fade-in-0 zoom-in-95 z-[100]">
                    <div className="px-3 py-2 border-b mb-2">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      Sair
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-background via-background/95 to-primary/5 p-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
