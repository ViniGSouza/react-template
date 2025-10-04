/**
 * Theme Provider
 * Aplica o tema no documento
 */

import { useEffect } from "react";
import { useThemeStore } from "@/core/store/theme.store";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
};
