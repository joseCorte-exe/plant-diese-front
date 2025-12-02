import type { PlantClass } from "../models/plant-disease";

export const PLANT_CLASSES: PlantClass[] = [
  { id: 0, name: 'Apple - Apple Scab', isHealthy: false },
  { id: 1, name: 'Apple - Black Rot', isHealthy: false },
  { id: 2, name: 'Apple - Cedar Apple Rust', isHealthy: false },
  { id: 3, name: 'Apple - Healthy', isHealthy: true },
  { id: 4, name: 'Blueberry - Healthy', isHealthy: true },
  { id: 5, name: 'Cherry - Powdery Mildew', isHealthy: false },
  { id: 6, name: 'Cherry - Healthy', isHealthy: true },
  { id: 7, name: 'Corn - Cercospora Leaf Spot (Gray Leaf Spot)', isHealthy: false },
  { id: 8, name: 'Corn - Common Rust', isHealthy: false },
  { id: 9, name: 'Corn - Northern Leaf Blight', isHealthy: false },
  { id: 10, name: 'Corn - Healthy', isHealthy: true },
  { id: 11, name: 'Grape - Black Rot', isHealthy: false },
  { id: 12, name: 'Grape - Esca (Black Measles)', isHealthy: false },
  { id: 13, name: 'Grape - Leaf Blight (Isariopsis Leaf Spot)', isHealthy: false },
  { id: 14, name: 'Grape - Healthy', isHealthy: true },
  { id: 15, name: 'Orange - Haunglongbing (Citrus Greening)', isHealthy: false },
  { id: 16, name: 'Peach - Bacterial Spot', isHealthy: false },
  { id: 17, name: 'Peach - Healthy', isHealthy: true },
  { id: 18, name: 'Pepper - Bacterial Spot', isHealthy: false },
  { id: 19, name: 'Pepper - Healthy', isHealthy: true },
  { id: 20, name: 'Potato - Early Blight', isHealthy: false },
  { id: 21, name: 'Potato - Late Blight', isHealthy: false },
  { id: 22, name: 'Potato - Healthy', isHealthy: true },
  { id: 23, name: 'Raspberry - Healthy', isHealthy: true },
  { id: 24, name: 'Soybean - Healthy', isHealthy: true },
  { id: 25, name: 'Squash - Powdery Mildew', isHealthy: false },
  { id: 26, name: 'Strawberry - Leaf Scorch', isHealthy: false },
  { id: 27, name: 'Strawberry - Healthy', isHealthy: true },
  { id: 28, name: 'Tomato - Bacterial Spot', isHealthy: false },
  { id: 29, name: 'Tomato - Early Blight', isHealthy: false },
  { id: 30, name: 'Tomato - Late Blight', isHealthy: false },
  { id: 31, name: 'Tomato - Leaf Mold', isHealthy: false },
  { id: 32, name: 'Tomato - Septoria Leaf Spot', isHealthy: false },
  { id: 33, name: 'Tomato - Spider Mites (Two-spotted Spider Mite)', isHealthy: false },
  { id: 34, name: 'Tomato - Target Spot', isHealthy: false },
  { id: 35, name: 'Tomato - Yellow Leaf Curl Virus', isHealthy: false },
  { id: 36, name: 'Tomato - Mosaic Virus', isHealthy: false },
  { id: 37, name: 'Tomato - Healthy', isHealthy: true },
];

export const getClassById = (id: number): PlantClass | undefined => {
  return PLANT_CLASSES.find((cls) => cls.id === id);
};

export const getClassByName = (name: string): PlantClass | undefined => {
  return PLANT_CLASSES.find((cls) => cls.name === name);
};
