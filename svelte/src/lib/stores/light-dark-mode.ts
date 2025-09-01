import { writable } from "svelte/store";

type Theme = "light" | "dark";

type ThemeClasses = {
  nav: string;
  text: string;
  header: string;
  bg: string;
  heroGradient: string;
  button: string;
};

const classes: Record<Theme, ThemeClasses> = {
  light: {
    nav: "backdrop-blur-lg bg-[#fff]/30 h-16 drop-shadow-lg fixed w-full bottom-0 md:top-0 content-center z-50 transition duration-150",
    text: "text-black transition duration-150",
    header: "text-3xl text-black font-bold transition duration-150",
    bg: "bg-[#fff] content-center transition duration-150",
    heroGradient:
      "pt-1 md:pt-24 bg-gradient-to-br from-[#f2d2ce] via-[#f7e6e4] to-[#f2dba0] bg-[length:400%_400%] animate-gradientShift",
    button:
      "bg-[#00000020] text-[#1cb6fc] hover:bg-[#dd0000] hover:text-[#ffd24d] transition duration-1 p-0.5",
  },
  dark: {
    nav: "backdrop-blur-lg text-white bg-[#000]/90 h-16 drop-shadow-lg fixed w-full bottom-0 md:top-0 content-center z-50 transition duration-150",
    text: "text-white transition duration-150",
    header: "text-3xl text-white font-bold transition duration-150",
    bg: "bg-[#222] content-center transition duration-150",
    heroGradient:
      "pt-1 md:pt-24 bg-gradient-to-br from-[#222] via-[#240804] to-[#704F38] bg-[length:400%_400%] animate-gradientShift",
    button:
      "bg-[#ffffff20] text-[#1cb6fc] hover:bg-[#dd0000] hover:text-[#ffd24d] transition duration-1 p-0.5",
  },
};

export default classes;

// System preference
function getSystemPreference(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function createThemeStore() {
  const initial =
    (typeof localStorage !== "undefined" &&
      (localStorage.getItem("theme") as Theme)) ||
    getSystemPreference();

  const { subscribe, set, update } = writable<Theme>(initial);

  function applyTheme(theme: Theme) {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }

  subscribe((theme) => {
    if (typeof document !== "undefined") applyTheme(theme);
  });

  return {
    subscribe,
    toggle: () => update((t) => (t === "light" ? "dark" : "light")),
    setLight: () => set("light"),
    setDark: () => set("dark"),
    system: () => set(getSystemPreference()),
    classes, // expose the classes dictionary
  };
}

export const theme = createThemeStore();
