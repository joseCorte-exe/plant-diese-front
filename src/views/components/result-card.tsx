import { cn } from "../../lib/utils";
import type {
  ClassificationResult,
  TopPrediction,
} from "../../models/classification";

interface ResultCardProps {
  result: ClassificationResult;
  topPredictions: TopPrediction[];
}

function PredictionBar({ prediction }: { prediction: TopPrediction }) {
  const confidence = Math.round(prediction.confidence);
  const isTopPrediction = prediction.rank === 1;

  return (
    <div className="group space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span
          className={cn(
            "truncate pr-2 font-medium",
            isTopPrediction
              ? "text-foreground"
              : "text-muted-foreground group-hover:text-foreground"
          )}
        >
          {prediction.className.replace(/_/g, " ")}
        </span>
        <span
          className={cn(
            "font-mono text-xs",
            isTopPrediction
              ? "text-foreground"
              : "text-muted-foreground group-hover:text-foreground"
          )}
        >
          {confidence}%
        </span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-black/10">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            isTopPrediction ? "bg-purple-500" : "bg-gray-400 group-hover:bg-purple-500/80"
          )}
          style={{ width: `${confidence}%` }}
        />
      </div>
    </div>
  );
}

export function ResultCard({ result, topPredictions }: ResultCardProps) {
  const isHealthy = result.isHealthy;
  const confidence = Math.round(result.confidence);
  const topPrediction = topPredictions[0];

  return (
    <div className="flex h-full flex-col justify-between">
      {/* Top Result */}
      <div className="space-y-1 text-center">
        <p className={cn("text-sm font-semibold", isHealthy ? "text-green-600" : "text-red-600")}>
          {isHealthy ? "Looking Good" : "Disease Detected"}
        </p>
        <h2 className="text-lg font-bold text-foreground">
          {topPrediction.className.replace(/_/g, " ")}
        </h2>
        <p className="font-mono text-2xl font-medium text-foreground/90">
          {confidence}
          <span className="text-base font-normal text-muted-foreground">%</span>
        </p>
      </div>

      {/* Other Predictions */}
      <div className="space-y-3">
        {topPredictions.slice(1, 4).map((pred) => (
          <PredictionBar key={pred.rank} prediction={pred} />
        ))}
      </div>
    </div>
  );
}