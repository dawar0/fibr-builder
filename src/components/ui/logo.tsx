import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const LogoVariants = cva("", {
  variants: {
    variant: {
      default: "",
      icon: "",
    },
    size: {
      default: "text-5xl",
      xs: "text-xl",
      sm: "text-2xl",
      md: "text-3xl",
      lg: "text-4xl",
      xl: "text-5xl",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface LogoProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof LogoVariants> {
  asChild?: boolean;
}

export const Logo = React.forwardRef<HTMLDivElement, LogoProps>(
  ({ className, variant, size, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn(LogoVariants({ variant, className, size }))}
      {...props}
    >
      <span className="font-sans font-normal">{"Fibr.ai "}</span>
      <span className="relative bg-clip-text text-transparent bg-gradient-to-br from-pink-400 to-purple-600 bg-slate-800 font-sans font-normal">
        {"Builder"}
      </span>
    </h1>
  )
);
