import { LayoutGrid, Settings } from "lucide-react";
import { cn } from "../../lib/utils";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn("col-span-3 row-span-1 flex items-center justify-between px-4", className)}>
      <div className="flex items-center gap-2">
        <LayoutGrid className="h-5 w-5 text-blue-500" />
        <h1 className="font-semibold text-foreground">Plant Disease Detection</h1>
      </div>
      <div className="flex items-center gap-2">
        <button className="grid h-8 w-8 place-items-center rounded-full bg-black/5 transition-colors hover:bg-black/10">
          <Settings className="h-4 w-4 text-green-500" />
        </button>
      </div>
    </header>
  );
}