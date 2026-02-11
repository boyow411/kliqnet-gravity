"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, asChild = false, children, disabled, ...props }, ref) => {

        const variants = {
            primary: "bg-white text-black hover:bg-gray-200 border-transparent",
            secondary: "bg-gray-800 text-white hover:bg-gray-700 border-transparent",
            outline: "bg-transparent border border-gray-700 text-white hover:bg-gray-900",
            ghost: "bg-transparent text-gray-300 hover:text-white hover:bg-gray-900",
        };

        const sizes = {
            sm: "h-9 px-3 text-sm",
            md: "h-11 px-6 text-base",
            lg: "h-14 px-8 text-lg",
        };

        const classes = cn(
            "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
            variants[variant],
            sizes[size],
            className
        );

        if (asChild) {
            return (
                <Slot ref={ref} className={classes} {...props}>
                    {children}
                </Slot>
            );
        }

        return (
            <button
                ref={ref}
                disabled={isLoading || disabled}
                className={classes}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button };
