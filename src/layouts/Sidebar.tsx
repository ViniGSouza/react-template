import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

export const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navItems: NavItem[] = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      path: "/proposals",
      label: "Propostas",
      icon: FileText,
    },
  ];

  return (
    <aside
      className={cn(
        "flex sticky top-0 flex-col h-screen border-r transition-all duration-300 bg-card border-border/40",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex justify-between items-center pl-2 h-16 border-b border-border/40">
        {!collapsed ? (
          <Link
            to="/dashboard"
            className="flex gap-2 items-center text-lg font-bold transition-transform hover:scale-105"
          >
            <div className="flex justify-center items-center w-8 h-8 bg-gradient-to-br rounded-lg shadow-lg from-primary to-primary/80 shadow-primary/30">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">
              Agisales V2
            </span>
          </Link>
        ) : (
          <Link to="/dashboard" className="flex justify-center items-center">
            <div className="flex justify-center items-center w-8 h-8 bg-gradient-to-br rounded-lg shadow-lg from-primary to-primary/80 shadow-primary/30">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
          </Link>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 rounded-lg hover:bg-accent shrink-0"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      <nav className="overflow-y-auto flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-sm font-medium transition-all group relative",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-transform group-hover:scale-110",
                  collapsed && "mx-auto"
                )}
              />

              {!collapsed && <span className="flex-1">{item.label}</span>}

              {!collapsed && item.badge !== undefined && (
                <span className="flex justify-center items-center w-5 h-5 text-xs rounded-full bg-muted">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border/40">
        {!collapsed && (
          <div className="p-3 text-xs rounded-lg bg-muted/50">
            <p className="font-medium text-center text-muted-foreground">
              v1.0.0
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};
