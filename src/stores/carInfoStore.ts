import { readable } from "svelte/store";

const colors = {
  red: {
    primaryColor: "#f00",
    secondaryColor: "#f77",
    tickColor: "#f00",
    previewImage: "./assets/red.png",
    finalImage: "./assets/red-final.png",
  },
};

export const CarInfoStore = readable({
  colors: colors,
});


export default CarInfoStore;