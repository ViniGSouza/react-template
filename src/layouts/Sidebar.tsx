/**
 * Sidebar Component
 * Menu lateral com navegação principal
 */

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
        "sticky top-0 h-screen bg-gradient-to-b from-sidebar to-sidebar/95 text-sidebar-foreground transition-all duration-300 border-r border-sidebar-accent/20 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-accent/20 px-4">
        {!collapsed && (
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-lg font-bold transition-transform hover:scale-105"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] shadow-lg shadow-blue-500/50">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] bg-clip-text text-transparent">
              Agisales
            </span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 rounded-lg text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/10",
            collapsed && "mx-auto"
          )}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all group relative overflow-hidden",
                isActive
                  ? "bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white shadow-lg shadow-blue-500/50"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-blue-500/10"
              )}
              title={collapsed ? item.label : undefined}
            >
              {/* Gradient overlay on hover */}
              {!isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-sidebar-accent/0 via-sidebar-accent/5 to-sidebar-accent/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}

              <Icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-transform group-hover:scale-110",
                  collapsed && "mx-auto"
                )}
              />

              {!collapsed && <span className="flex-1">{item.label}</span>}

              {!collapsed && item.badge !== undefined && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sidebar-accent/20 text-xs">
                  {item.badge}
                </span>
              )}

              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-full bg-white" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer (opcional) */}
      <div className="border-t border-sidebar-accent/20 p-3">
        {!collapsed && (
          <div className="rounded-lg bg-sidebar-accent/10 p-3 text-xs">
            <p className="font-medium text-sidebar-foreground/90">💡 Dica</p>
            <p className="mt-1 text-sidebar-foreground/60">
              Use Ctrl+B para alternar a sidebar
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};
