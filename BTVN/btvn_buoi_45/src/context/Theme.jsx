import { Fragment, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const colorSchemes = ["dark", "light"];
const MEDIA = "(prefers-color-scheme: dark)";
const ThemeContext = createContext();
const defaultContext = { setTheme: (_) => {}, themes: [] };

export const useTheme = () => useContext(ThemeContext) ?? defaultContext;

export function ThemeProvider(props) {
  const context = useContext(ThemeContext);

  if (context) return <Fragment>{props.children}</Fragment>;
  return <Theme {...props} />;
}

const defaultThemes = ["light", "dark"];

function Theme({
  value,
  children,
  forcedTheme,
  enableSystem = true,
  storageKey = "theme",
  themes = defaultThemes,
  attribute = "data-theme",
  enableColorScheme = true,
  defaultTheme = enableSystem ? "system" : "light",
}) {
  const [theme, setThemeState] = useState(() => getTheme(storageKey, defaultTheme));
  const [resolvedTheme, setResolvedTheme] = useState(() => getTheme(storageKey));
  const attrs = !value ? themes : Object.values(value);

  const applyTheme = useCallback((theme) => {
    let resolved = theme;
    if (!resolved) return;

    // If theme is system, resolve it before setting theme
    if (theme === "system" && enableSystem) {
      resolved = getSystemTheme();
    }

    const name = value ? value[resolved] : resolved;
    const d = document.documentElement;

    if (attribute === "class") {
      d.classList.remove(...attrs);

      if (name) d.classList.add(name);
    } else {
      if (name) {
        d.setAttribute(attribute, name);
      } else {
        d.removeAttribute(attribute);
      }
    }

    if (enableColorScheme) {
      const fallback = colorSchemes.includes(defaultTheme) ? defaultTheme : null;
      const colorScheme = colorSchemes.includes(resolved) ? resolved : fallback;
      d.style.colorScheme = colorScheme;
    }
  }, []);

  const setTheme = useCallback(
    (theme) => {
      const newTheme = typeof theme === "function" ? theme(theme) : theme;
      setThemeState(newTheme);

      // Save to storage
      try {
        localStorage.setItem(storageKey, newTheme);
      } catch (e) {
        // Unsupported
      }
    },
    [forcedTheme]
  );

  const handleMediaQuery = useCallback(
    (e) => {
      const resolved = getSystemTheme(e);
      setResolvedTheme(resolved);

      if (theme === "system" && enableSystem && !forcedTheme) {
        applyTheme("system");
      }
    },
    [theme, forcedTheme]
  );

  // Always listen to System preference
  useEffect(() => {
    const media = window.matchMedia(MEDIA);

    // Intentionally use deprecated listener methods to support iOS & old browsers
    media.addListener(handleMediaQuery);
    handleMediaQuery(media);

    return () => media.removeListener(handleMediaQuery);
  }, [handleMediaQuery]);

  // localStorage event handling
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key !== storageKey) {
        return;
      }

      // If default theme set, use it if localstorage === null (happens on local storage manual deletion)
      const theme = e.newValue || defaultTheme;
      setTheme(theme);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [setTheme]);

  // Whenever theme or forcedTheme changes, apply it
  useEffect(() => {
    applyTheme(forcedTheme ?? theme);
  }, [forcedTheme, theme]);

  const providerValue = useMemo(
    () => ({
      theme,
      setTheme,
      forcedTheme,
      resolvedTheme: theme === "system" ? resolvedTheme : theme,
      themes: enableSystem ? [...themes, "system"] : themes,
      systemTheme: enableSystem ? resolvedTheme : undefined,
    }),
    [theme, setTheme, forcedTheme, resolvedTheme, enableSystem, themes]
  );

  return <ThemeContext.Provider value={providerValue}>{children}</ThemeContext.Provider>;
}

// Helpers
const getTheme = (key, fallback) => {
  let theme;
  try {
    theme = localStorage.getItem(key) || undefined;
  } catch (e) {
    // Unsupported
  }
  return theme || fallback;
};

const getSystemTheme = (e) => {
  if (!e) e = window.matchMedia(MEDIA);
  const isDark = e.matches;
  const systemTheme = isDark ? "dark" : "light";
  return systemTheme;
};
