import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 ease-luxury focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-accent/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-luxury-accent text-luxury-on-accent shadow-soft hover:bg-luxury-accent-hover hover:shadow-elevated",
        secondary:
          "bg-luxury-surface text-luxury-ink border border-luxury-border shadow-soft hover:shadow-elevated hover:border-luxury-caption/40",
        ghost:
          "text-luxury-body hover:text-luxury-ink hover:bg-luxury-muted/80",
        link: "text-luxury-accent underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-[13px]",
        lg: "h-12 px-8 text-[15px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
