import { createContext } from "react";

export type Theme = "minimal" | "glass" | "neumorph";

export interface ThemeContextValue {
  themeStyle: Theme;
  setThemeStyle: (value: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
