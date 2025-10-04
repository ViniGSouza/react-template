/**
 * Theme Toggle Button
 * Botão para alternar entre light e dark mode
 */

import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/core/store/theme.store";
import { Button } from "./button";

export const ThemeToggle = () => {
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative h-9 w-9 rounded-full transition-all hover:bg-accent"
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
