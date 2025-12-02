import type { ClassificationResult, TopPrediction } from "./classification";

export interface HistoryItem {
  id: string;
  timestamp: number;
  imageDataUrl: string;
  result: ClassificationResult;
  topPredictions: TopPrediction[];
}
