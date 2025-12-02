import { format } from "date-fns";
import { X } from "lucide-react";
import type { HistoryItem } from "../../models/history-item";

interface HistoryListProps {
  history: HistoryItem[];
  onClearHistory: () => void;
  onRemoveItem: (id: string) => void;
  onSelectItem: (item: HistoryItem) => void;
}

function HistoryListItem({
  item,
  onRemove,
  onSelect,
}: {
  item: HistoryItem;
  onRemove: (id:string) => void;
  onSelect: (item: HistoryItem) => void;
}) {

  function handleSelect() {
    onSelect(item);
  }

  function handleRemove(e: React.MouseEvent) {
    e.stopPropagation();
    onRemove(item.id);
  }

  return (
    <div
      onClick={handleSelect}
      className="group relative h-full flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border border-transparent transition-all hover:border-black/10"
    >
      <img
        src={item.imageDataUrl}
        alt={item.result.className}
        className="h-full w-28 object-cover transition-transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
        <p className="truncate text-xs font-semibold">
          {item.result.className.replace(/_/g, " ")}
        </p>
        <p className="text-[10px] text-white/70">
          {format(item.timestamp, "MMM d, h:mm a")}
        </p>
      </div>
       <button
        onClick={handleRemove}
        className="absolute right-1 top-1 z-10 grid h-5 w-5 place-items-center rounded-full bg-black/40 text-white/80 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-500/90"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}

export function HistoryList({
  history,
  onRemoveItem,
  onSelectItem,
}: HistoryListProps) {

  if (history.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-muted-foreground">Your scan history is empty.</p>
      </div>
    );
  }

  return (
    <div className="flex h-full gap-3 overflow-x-auto py-1">
      {history.map((item) => (
        <HistoryListItem
          key={item.id}
          item={item}
          onRemove={onRemoveItem}
          onSelect={onSelectItem}
        />
      ))}
    </div>
  );
}
