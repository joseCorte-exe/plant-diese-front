export interface PlantClass {
  id: number;
  name: string;
  isHealthy: boolean;
}

export type PlantDiseaseType =
  | 'healthy'
  | 'fungal'
  | 'bacterial'
  | 'viral'
  | 'pest';
