
import type { ClassificationResponse, ClassificationResult, TopPrediction } from "../models/classification";

const API_ENDPOINT = "https://egghlaujjh5qoiwrhw3svn7r5u0iwkmy.lambda-url.us-east-1.on.aws/";

function processResponse(response: ClassificationResponse): {
  result: ClassificationResult;
  topPredictions: TopPrediction[];
} {
  if (!response.sucesso) {
    throw new Error("API returned unsuccessful response");
  }

  const result: ClassificationResult = {
    className: response.classe_completa.traduzida,
    confidence: response.diagnostico.confianca,
    isHealthy: response.diagnostico.saudavel,
    plantName: response.planta.nome,
    plantNamePt: response.planta.nome_pt,
    disease: response.diagnostico.doenca,
    diseasePt: response.diagnostico.doenca_pt,
    message: response.mensagem,
  };

  const topPredictions: TopPrediction[] = response.top_5.slice(0, 5).map(function (pred, index) {
    return {
      className: pred.classe_pt,
      confidence: pred.confianca,
      rank: index + 1,
    };
  });

  return { result, topPredictions };
}

export async function classify(
  base64Image: string,
): Promise<{
  result: ClassificationResult;
  topPredictions: TopPrediction[];
}> {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image: base64Image }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`API request failed: ${response.statusText} - ${errorBody}`);
  }

  const data: ClassificationResponse = await response.json();
  return processResponse(data);
}