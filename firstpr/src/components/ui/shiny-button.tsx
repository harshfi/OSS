import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "motion/react";
import React from "react";

interface ShinyButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
}

export const ShinyButton = React.forwardRef<HTMLButtonElement, ShinyButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        {...props}
        className={cn(
          "relative inline-flex items-center justify-center rounded-full px-8 py-3 font-medium leading-none backdrop-blur-xl transition-[box-shadow,transform] duration-300 ease-in-out hover:shadow dark:bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/10%)_0%,transparent_60%)] dark:hover:shadow-[0_0_20px_hsl(var(--primary)/10%)] select-none",
          className
        )}
        whileTap={{ scale: 0.95 }}
      >
        <span
          className="relative inline-flex items-center justify-center gap-2 text-inherit leading-none"
          style={{
            maskImage:
              "linear-gradient(-75deg,hsl(var(--primary)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--primary)) calc(var(--x) + 100%))",
          }}
        >
          {children}
        </span>
        <span
          style={{
            mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
            maskComposite: "exclude",
          }}
          className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,hsl(var(--primary)/10%)_calc(var(--x)+20%),hsl(var(--primary)/50%)_calc(var(--x)+25%),hsl(var(--primary)/10%)_calc(var(--x)+100%))] p-px pointer-events-none"
        ></span>
      </motion.button>
    );
  }
);

ShinyButton.displayName = "ShinyButton";

