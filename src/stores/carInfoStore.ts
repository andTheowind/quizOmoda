import { readable } from "svelte/store";
import type { RadioVariant } from "../lib/radio";

export type CarInfo = RadioVariant & {
  previewImage: string;
  finalImage: string;
};

const carsData: CarInfo[] = await fetch("config.json")
  .then((response) => response.json())
  .then((data) => {
    return data.cars;
  });

export const CarInfoStore = readable({
  variants: carsData,
});

export default CarInfoStore;
