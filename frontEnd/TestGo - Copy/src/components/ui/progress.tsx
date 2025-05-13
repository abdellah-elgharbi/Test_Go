import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "../../lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    showValue?: boolean;
    variant?: "default" | "success" | "warning" | "danger" | "purple";
    size?: "sm" | "md" | "lg";
  }
>(({ 
  className, 
  value, 
  showValue = false, 
  variant = "default",
  size = "md",
  ...props 
}, ref) => {
  
  // Détermine la couleur selon la variante
  const getColor = () => {
    switch(variant) {
      case "success":
        return "bg-emerald-500";
      case "warning":
        return "bg-amber-500";
      case "danger":
        return "bg-rose-500";
      case "purple":
        return "bg-purple-500";
      default:
        return "bg-sky-500";
    }
  };
  
  // Détermine la hauteur selon la taille
  const getHeight = () => {
    switch(size) {
      case "sm":
        return "h-1";
      case "lg":
        return "h-3";
      default:
        return "h-2";
    }
  };

  return (
    <div className="relative">
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          `relative w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800 ${getHeight()}`,
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(`h-full ${getColor()}`)}
          style={{ width: `${value || 0}%` }}
        />
      </ProgressPrimitive.Root>
      
      {showValue && (
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-right">
          {Math.round(value || 0)}%
        </div>
      )}
    </div>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
