export interface ClassificationRequest {
  image: string;
}

export interface ApiPlant {
  nome: string;
  nome_pt: string;
}

export interface ApiDiagnostic {
  saudavel: boolean;
  doenca?: string;
  doenca_pt?: string;
  confianca: number;
}

export interface ApiClassComplete {
  original: string;
  traduzida: string;
}

export interface ApiTopPrediction {
  indice: number;
  classe: string;
  classe_pt: string;
  confianca: number;
}

export interface ClassificationResponse {
  sucesso: boolean;
  planta: ApiPlant;
  diagnostico: ApiDiagnostic;
  classe_completa: ApiClassComplete;
  top_5: ApiTopPrediction[];
  mensagem: string;
}

export interface ClassificationResult {
  className: string;
  confidence: number;
  isHealthy: boolean;
  plantName: string;
  plantNamePt: string;
  disease?: string;
  diseasePt?: string;
  message: string;
}

export interface TopPrediction {
  className: string;
  confidence: number;
  rank: number;
}