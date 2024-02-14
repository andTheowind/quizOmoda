import { readable } from "svelte/store";
import type { RadioVariant } from "../lib/radio";

export type CarInfo = RadioVariant & {
  previewImage: string;
  finalImage: string;
};

const variants: CarInfo[] = [
  {
    primaryColor: "#f00",
    secondaryColor: "#f77",
    tickColor: "#f00",
    value: "red",
    displayName: "Красный",
    previewImage: "./assets/red.png",
    finalImage: "./assets/red-final.png",
  },
  {
    primaryColor: "#0f0",
    secondaryColor: "#f77",
    tickColor: "#f00",
    value: "green",
    displayName: "Зеленый",
    previewImage: "./assets/red.png",
    finalImage: "./assets/red-final.png",
  },
  {
    primaryColor: "#00f",
    secondaryColor: "#f77",
    tickColor: "#f00",
    value: "blue",
    displayName: "Синий",
    previewImage: "./assets/red.png",
    finalImage: "./assets/red-final.png",
  },
];

export const CarInfoStore = readable({
  variants: variants,
});

export default CarInfoStore;
