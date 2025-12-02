import * as React from "react"

import { cn } from "../../lib/utils"

export interface SliderProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  showValue?: boolean
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, label, showValue = true, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {(label || showValue) && (
          <div className="flex items-center justify-between">
            {label && (
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
              </label>
            )}
            {showValue && (
              <span className="text-sm text-muted-foreground">
                {props.value}%
              </span>
            )}
          </div>
        )}
        <input
          type="range"
          className={cn(
            "w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer",
            "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary",
            "[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }
