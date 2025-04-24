import React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number;
}

export const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className = "", value = 0, ...props }, ref) => {
  const rootClasses =
    `relative h-4 w-full overflow-hidden rounded-full bg-slate-100 ${className}`.trim();

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={rootClasses}
      value={value}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full bg-indigo-600 transition-all"
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = "Progress";
