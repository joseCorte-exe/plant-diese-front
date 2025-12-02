import {
  Wifi,
  Bluetooth,
  Send,
  Moon,
  Sun,
  Volume2,
  Play,
  SkipForward,
  Settings,
  Power,
  Maximize,
  Keyboard,
} from "lucide-react";
import { cn } from "../../lib/utils";

// --- Sub-components to build the main component ---

const ControlButton = ({
  icon: Icon,
  label,
  sublabel,
  color,
  isActive,
}: {
  icon: React.ElementType;
  label: string;
  sublabel?: string;
  color?: string;
  isActive?: boolean;
}) => (
  <div className="flex items-center gap-3">
    <div
      className={cn(
        "grid h-10 w-10 flex-shrink-0 place-items-center rounded-full",
        isActive ? color : "bg-gray-500/40"
      )}
    >
      <Icon className="h-5 w-5 text-white" />
    </div>
    <div className="flex-grow">
      <p className="font-semibold text-white">{label}</p>
      {sublabel && (
        <p className="text-sm text-gray-300">{sublabel}</p>
      )}
    </div>
  </div>
);

const SquareButton = ({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) => (
  <div className="flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl bg-black/20 p-2">
    <Icon className="h-6 w-6 text-white" />
    <p className="text-xs font-semibold text-center text-white">{label}</p>
  </div>
);

const Slider = ({
  icon: Icon,
  value,
  tag,
}: {
  icon: React.ElementType;
  value: number;
  tag?: string;
}) => (
  <div className="flex items-center gap-3">
    <div className="relative h-8 w-full">
      <div className="absolute inset-0 h-full w-full rounded-full bg-black/40" />
      <div
        className="absolute inset-0 h-full rounded-full bg-white"
        style={{ width: `${value}%` }}
      >
        <Icon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-black" />
      </div>
      <div
        className="absolute top-1/2 h-5 w-5 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white shadow-md"
        style={{ left: `${value}%` }}
      />
    </div>
    {tag && (
      <div className="rounded-full bg-black/30 px-3 py-1 text-xs font-semibold text-white">
        {tag}
      </div>
    )}
  </div>
);

// --- Main Component ---

export function MacOsControlCenter() {
  return (
    <div className="font-sans">
      {/* The main floating container */}
      <div
        className={cn(
          "h-[680px] w-[600px] p-5 rounded-3xl shadow-2xl text-white",
          "bg-black/20 backdrop-blur-xl border border-white/10"
        )}
      >
        <div className="grid h-full w-full grid-cols-2 grid-rows-6 gap-4">
          
          {/* Header */}
          <header className="col-span-2 row-span-1 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/40"
                alt="User Avatar"
                className="h-10 w-10 rounded-full"
              />
              <p className="font-semibold">Huseyin Emanet</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
                <Settings className="h-5 w-5" />
              </button>
              <button className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
                <Power className="h-5 w-5" />
              </button>
            </div>
          </header>

          {/* Connectivity Card */}
          <div className="col-span-1 row-span-2 flex flex-col justify-between rounded-2xl bg-black/20 p-4">
            <ControlButton
              icon={Wifi}
              label="Wi-Fi"
              sublabel="Superonline 5G"
              color="bg-blue-500"
              isActive
            />
            <ControlButton
              icon={Bluetooth}
              label="Bluetooth"
              sublabel="On"
              color="bg-blue-500"
              isActive
            />
            <ControlButton icon={Send} label="AirDrop" sublabel="Contacts Only" />
          </div>

          {/* Right Column */}
          <div className="col-span-1 row-span-2 grid grid-rows-2 gap-4">
            {/* Do not disturb */}
            <div className="row-span-1 rounded-2xl bg-black/20 p-4">
              <ControlButton
                icon={Moon}
                label="Do Not Disturb"
                color="bg-violet-600"
                isActive
              />
            </div>
            {/* Small buttons */}
            <div className="row-span-1 grid grid-cols-2 gap-4">
              <SquareButton icon={Keyboard} label="Keyboard Brightness" />
              <SquareButton icon={Maximize} label="AirPlay Display" />
            </div>
          </div>
          
          {/* Sliders */}
          <div className="col-span-2 row-span-2 flex flex-col justify-around rounded-2xl bg-black/20 p-4">
             <Slider icon={Sun} value={60} tag="Auto" />
             <Slider icon={Volume2} value={30} />
          </div>

          {/* Music Player */}
          <div className="col-span-2 row-span-1 flex items-center gap-4 rounded-2xl bg-black/20 p-4">
            <img src="https://placehold.co/48x48/png" alt="Album art" className="h-12 w-12 rounded-lg" />
            <div className="flex-grow">
              <p className="font-semibold text-white">Break My Baby</p>
              <p className="text-sm text-gray-300">KALEO</p>
            </div>
            <div className="flex items-center gap-4 text-white">
               <Play className="h-6 w-6" fill="white" />
               <SkipForward className="h-5 w-5" fill="white" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}