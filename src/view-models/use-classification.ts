import { useMutation } from '@tanstack/react-query';
import type { ClassificationResult, TopPrediction } from '../models/classification';
import { classify } from '../services/api-service';
import {
  getImageBase64,
  getImageDataUrl,
} from '../services/image-processing-service';
import { log } from '../services/log-service';

interface ClassifyInput {
  file: File;
}

interface ClassifyOutput {
  result: ClassificationResult;
  topPredictions: TopPrediction[];
  imageDataUrl: string;
}

export function useClassification() {
  async function mutationFn({ file }: ClassifyInput): Promise<ClassifyOutput> {
    const [imageBase64, imageDataUrl] = await Promise.all([
      getImageBase64(file),
      getImageDataUrl(file),
    ]);

    // Classify the image
    const { result, topPredictions } = await classify(imageBase64);

    log({
      message: 'Classification successful',
      metadata: { topPredictions },
    });

    return {
      result,
      topPredictions,
      imageDataUrl,
    };
  }

  const mutation = useMutation({
    mutationFn,
  });

  return {
    classify: mutation.mutate,
    classifyAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
}
