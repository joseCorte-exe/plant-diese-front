import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Leaf,
  Loader2,
  Play,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  UploadCloud,
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Slider } from "../components/ui/slider";
import { ScrollArea } from "../components/ui/scroll-area";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import { cn } from "../lib/utils";

import { useImageUpload } from "../view-models/use-image-upload";
import { useClassification } from "../view-models/use-classification";
import { useHistory } from "../view-models/use-history";
import type { HistoryItem } from "../models/history-item";

export function PlantAppDashboard() {
  const { selectedFile, previewUrl, handleFileSelect, clearFile } = useImageUpload();
  const {
    classify,
    data: classificationData,
    isLoading,
    isError,
    error,
    reset: resetClassification
  } = useClassification();
  const { history, addHistoryItem, clearHistory } = useHistory();

  const [activeResult, setActiveResult] = useState<HistoryItem | null>(null);
  const [confidenceThreshold, setConfidenceThreshold] = useState(30);
  const [isDragging, setIsDragging] = useState(false);

  const handleClassify = useCallback(() => {
    if (selectedFile) {
      classify({ file: selectedFile });
    }
  }, [selectedFile, classify]);

  const handleClear = useCallback(() => {
    clearFile();
    resetClassification();
    setActiveResult(null);
  }, [clearFile, resetClassification]);

  const handleHistorySelection = useCallback((item: HistoryItem) => {
    setActiveResult(item);
    handleFileSelect(item.imageDataUrl);
  }, [handleFileSelect]);

  const handleDragEvents = (e: React.DragEvent, isEntering: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(isEntering);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect]
  );

  // Add to history when classification completes
  useEffect(() => {
    if (classificationData) {
      addHistoryItem(
        classificationData.imageDataUrl,
        classificationData.result,
        classificationData.topPredictions
      );
    }
  }, [classificationData, addHistoryItem]);

  // Sync active result with latest history item
  const latestHistoryItem = history[0];
  if (classificationData && latestHistoryItem && activeResult?.id !== latestHistoryItem.id) {
    // Use queueMicrotask to avoid setState during render
    queueMicrotask(() => setActiveResult(latestHistoryItem));
  }

  const mainResult = activeResult?.result;
  const showResult = mainResult && mainResult.confidence >= confidenceThreshold;

  return (
    <div className="w-full max-w-6xl space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle>Plant Disease Detection</CardTitle>
                <CardDescription>
                  Upload an image to detect plant diseases
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Image Upload Section */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Upload Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              onDragEnter={(e) => handleDragEvents(e, true)}
              onDragLeave={(e) => handleDragEvents(e, false)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) handleFileSelect(file);
                };
                input.click();
              }}
              className={cn(
                "relative aspect-video cursor-pointer overflow-hidden rounded-lg border-2 border-dashed transition-colors",
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              )}
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
                  <UploadCloud className="h-12 w-12" />
                  <div className="text-center">
                    <p className="font-medium">
                      {isDragging ? "Drop image here" : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-sm">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              <Button
                onClick={handleClassify}
                disabled={!selectedFile || isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Analyze
                  </>
                )}
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                disabled={!selectedFile && !activeResult}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Analysis Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex min-h-[200px] flex-col items-center justify-center space-y-4">
              {isLoading && (
                <div className="text-center">
                  <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Analyzing image...
                  </p>
                </div>
              )}

              {isError && (
                <div className="text-center">
                  <ShieldAlert className="mx-auto h-12 w-12 text-destructive" />
                  <p className="mt-2 text-sm text-destructive">
                    {error?.message || "Error analyzing image"}
                  </p>
                </div>
              )}

              {showResult && mainResult && !isLoading && !isError && (
                <div className="w-full space-y-4 text-center">
                  {mainResult.isHealthy ? (
                    <ShieldCheck className="mx-auto h-16 w-16 text-green-500" />
                  ) : (
                    <ShieldAlert className="mx-auto h-16 w-16 text-destructive" />
                  )}
                  <div>
                    <h3 className="font-semibold">
                      {mainResult.className.replace(/_/g, " ")}
                    </h3>
                    <p className="text-3xl font-bold text-primary">
                      {mainResult.confidence.toFixed(1)}%
                    </p>
                    <Badge
                      variant={mainResult.isHealthy ? "secondary" : "destructive"}
                      className="mt-2"
                    >
                      {mainResult.isHealthy ? "Healthy" : "Disease Detected"}
                    </Badge>
                  </div>
                </div>
              )}

              {!isLoading && !isError && !showResult && (
                <div className="text-center text-muted-foreground">
                  <p className="text-sm">Upload and analyze an image to see results</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Report */}
      {showResult && mainResult && classificationData && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Relatório Detalhado</CardTitle>
            <CardDescription>
              Informações completas sobre a análise
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Plant Info */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                INFORMAÇÕES DA PLANTA
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Nome Científico</p>
                  <p className="font-medium">{mainResult.plantName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Nome em Português</p>
                  <p className="font-medium">{mainResult.plantNamePt}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Diagnosis */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                DIAGNÓSTICO
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-lg border p-4">
                  {mainResult.isHealthy ? (
                    <ShieldCheck className="h-6 w-6 shrink-0 text-green-500" />
                  ) : (
                    <ShieldAlert className="h-6 w-6 shrink-0 text-destructive" />
                  )}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">
                          {mainResult.diseasePt || "Planta Saudável"}
                        </p>
                        {mainResult.disease && (
                          <p className="text-sm text-muted-foreground">
                            {mainResult.disease}
                          </p>
                        )}
                      </div>
                      <Badge
                        variant={mainResult.isHealthy ? "secondary" : "destructive"}
                      >
                        {mainResult.isHealthy ? "Saudável" : "Doença"}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Confiança</span>
                        <span className="font-mono font-semibold">
                          {mainResult.confidence.toFixed(2)}%
                        </span>
                      </div>
                      <Progress value={mainResult.confidence} />
                    </div>
                  </div>
                </div>
                {mainResult.message && (
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-sm">{mainResult.message}</p>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Top 5 Predictions */}
            {classificationData.topPredictions.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                  TOP 5 PREDIÇÕES
                </h3>
                <div className="space-y-3">
                  {classificationData.topPredictions.map((prediction, index) => (
                    <div
                      key={index}
                      className={cn(
                        "rounded-lg border p-3 transition-colors",
                        index === 0 ? "border-primary bg-primary/5" : ""
                      )}
                    >
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="font-mono">
                              #{index + 1}
                            </Badge>
                            <p className="text-sm font-medium">
                              {prediction.className}
                            </p>
                          </div>
                        </div>
                        <span className="font-mono text-sm font-semibold">
                          {prediction.confidence.toFixed(2)}%
                        </span>
                      </div>
                      <Progress value={prediction.confidence} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Confidence Threshold */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Confidence Threshold</CardTitle>
          <CardDescription>
            Adjust the minimum confidence level for displaying results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Slider
            min={0}
            max={100}
            value={confidenceThreshold}
            onChange={(e) => setConfidenceThreshold(parseInt(e.target.value, 10))}
            showValue
          />
        </CardContent>
      </Card>

      {/* History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">History</CardTitle>
              <CardDescription>
                Previous analysis results ({history.length})
              </CardDescription>
            </div>
            {history.length > 0 && (
              <Button
                onClick={clearHistory}
                variant="ghost"
                size="sm"
              >
                Clear all
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            {history.length > 0 ? (
              <div className="space-y-2">
                {history.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleHistorySelection(item)}
                    className={cn(
                      "flex w-full items-center gap-4 rounded-lg border p-3 text-left transition-colors",
                      activeResult?.id === item.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-accent"
                    )}
                  >
                    <img
                      src={item.imageDataUrl}
                      alt="History item"
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div className="flex-1 space-y-1">
                      <p className="font-medium leading-none">
                        {item.result.className.replace(/_/g, " ")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {format(item.timestamp, "MMM d, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-lg font-semibold">
                        {item.result.confidence.toFixed(0)}%
                      </p>
                      <Badge
                        variant={item.result.isHealthy ? "secondary" : "destructive"}
                        className="mt-1"
                      >
                        {item.result.isHealthy ? "Healthy" : "Disease"}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex h-[200px] items-center justify-center text-sm text-muted-foreground">
                No analysis history yet. Upload an image to get started.
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
