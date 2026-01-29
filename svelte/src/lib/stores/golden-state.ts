import { writable } from "svelte/store";

// Store to track when the hero SVG frame is hovered (golden/super saiyan state)
export const goldenState = writable(false);
