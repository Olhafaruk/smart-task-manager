// src/components/SettingsPanel.tsx
import { useTheme } from "../context/ThemeContext";

export default function SettingsPanel() {
  const { themeStyle, setThemeStyle } = useTheme();

  return (
    <div className="absolute top-20 right-4 bg-slate-800 p-4 rounded shadow-lg z-50 w-60 border border-slate-700">
      <h2 className="text-white text-lg mb-2">Interface Style</h2>

      <select
        value={themeStyle}
        onChange={(e) => setThemeStyle(e.target.value)}
        className="bg-slate-700 text-white p-2 rounded w-full"
      >
        <option value="minimal">Minimal</option>
        <option value="neumorph">Neumorphism</option>
        <option value="glass">Glassmorphism</option>
      </select>
    </div>
  );
}
