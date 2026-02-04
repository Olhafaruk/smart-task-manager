import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext<any>(null);

export function ThemeProvider({ children }: any) {
  const [themeStyle, setThemeStyle] = useState(
    localStorage.getItem("themeStyle") || "minimal"
  );

  useEffect(() => {
    localStorage.setItem("themeStyle", themeStyle);
  }, [themeStyle]);

  return (
    <ThemeContext.Provider value={{ themeStyle, setThemeStyle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
