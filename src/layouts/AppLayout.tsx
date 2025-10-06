import { Outlet, useNavigate } from "react-router-dom";
import { useAuthUser, useLogout } from "@/domain/auth/hooks";
import { Button } from "@/shared/components/ui/button";
import { ThemeToggle } from "@/shared/components/ui/theme-toggle";
import { NotificationsDropdown } from "@/shared/components/NotificationsDropdown";
import { Badge } from "@/shared/components/ui/badge";
import { LogOut, User, ChevronDown } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const AppLayout = () => {
  const { data: user } = useAuthUser();
  const { mutateAsync: logout } = useLogout();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex overflow-hidden flex-col flex-1">
        <header className="sticky top-0 z-40 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex justify-between items-center px-6 h-16">
            <div className="flex-1" />

            <div className="flex gap-2 items-center">
              <ThemeToggle />
              <NotificationsDropdown />

              <div className="relative">
                <Button
                  variant="ghost"
                  className="flex gap-3 items-center h-10 hover:bg-accent"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <div className="flex justify-center items-center w-8 h-8 bg-gradient-to-br rounded-full ring-2 from-primary/20 to-primary/5 text-primary ring-primary/10">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="hidden text-left md:block">
                    <p className="text-sm font-medium leading-none">
                      {user?.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {user?.role === "manager" ? "Gerente" : "Vendedor"}
                    </p>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform text-muted-foreground",
                      userMenuOpen && "rotate-180"
                    )}
                  />
                </Button>

                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 rounded-lg border bg-card p-1.5 shadow-lg animate-in fade-in-0 zoom-in-95 z-50">
                      <div className="px-3 py-3 mb-1">
                        <p className="text-sm font-semibold">{user?.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {user?.email}
                        </p>
                        <Badge
                          variant={
                            user?.role === "manager" ? "default" : "secondary"
                          }
                          className="mt-2 text-xs"
                        >
                          {user?.role === "manager" ? "Gerente" : "Vendedor"}
                        </Badge>
                      </div>
                      <div className="my-1 h-px bg-border" />
                      <Button
                        variant="ghost"
                        className="gap-2 justify-start w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4" />
                        Sair
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="overflow-y-auto flex-1 p-6 bg-background">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
