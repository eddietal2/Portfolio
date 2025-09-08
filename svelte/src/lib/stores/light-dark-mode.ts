import { writable } from "svelte/store";

type Theme = "light" | "dark";

type ThemeClasses = {
  nav: string;
  text: string;
  header: string;
  bg: string;
  heroGradient: string;
  button: string;
  buttonTwo: string;
  input: string;
};

const classes: Record<Theme, ThemeClasses> = {
  light: {
    nav: "backdrop-blur-lg bg-[#fff]/90 h-16 drop-shadow-lg fixed w-full bottom-0 md:top-0 content-center z-50 transition duration-150",
    text: "text-black transition duration-150",
    header: "text-3xl text-black font-bold transition duration-150",
    bg: "bg-[#fff] content-center transition duration-150",
    heroGradient:
      "lg:pb-12 md:pt-24 bg-gradient-to-br from-red-100 via-[#fff] to-orange-100 bg-[length:400%_400%] animate-gradientShift",
    button:
      "bg-gradient-to-r from-yellow-500 via-red-500 to-orange-500 text-white jura font-bold py-1 px-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ease-in-out",
    buttonTwo:
      "bg-gradient-to-r from-green-500 via-green-500 to-[#00c400] text-white jura font-bold py-1 px-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ease-in-out",
    input:
      "bg-[] text-[#666] shadow w-full my-1 p-2 text-sm focus:text-[#111] focus:text-lg focus:p-3 focus:shadow-md focus:border-none focus:ring-2 focus:ring-[#111] rounded w-full transition-all duration-200"
  },
  dark: {
    nav: "backdrop-blur-lg text-white bg-[#000]/90 h-16 drop-shadow-lg fixed w-full bottom-0 md:top-0 content-center z-50 transition duration-150",
    text: "text-white transition duration-150",
    header: "text-3xl text-white font-bold transition duration-150",
    bg: "bg-[#222] content-center transition duration-150",
    heroGradient:
      "lg:pb-12 md:pt-24 bg-gradient-to-br from-[#211e00] via-[#000] to-[#1f0000] bg-[length:400%_400%] animate-gradientShift",
    button:
      "bg-gradient-to-r from-yellow-500 via-red-500 to-orange-500 text-white jura font-bold py-1 px-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ease-in-out",
    buttonTwo:
      "bg-gradient-to-r from-green-500 via-green-500 to-[#00c400] text-white jura font-bold py-1 px-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ease-in-out",
    input:
      "bg-[#ffffff10] text-[#999] shadow w-full my-1 p-2 text-sm focus:text-white focus:text-lg focus:p-3 focus:shadow-md focus:border-none focus:ring-2 focus:ring-white rounded w-full transition-all duration-200"
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
