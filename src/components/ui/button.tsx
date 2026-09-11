import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "tertiary";
  children: ReactNode;
}

export function Button({ variant = "primary", className, children, type = "button", ...props }: ButtonProps) {
  const variants = {
    primary: "bg-red-600 text-white hover:bg-white hover:text-black",
    secondary: "bg-[#11161d]/70 border border-red-600 text-white hover:bg-red-600 hover:text-white",
    tertiary: "bg-[#11161d]/70 border border-gray-600 text-white hover:border-red-600"
  }

  return (
    <button type={type} className={cn("cursor-pointer rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200", variants[variant], className)} {...props}>
      {children}
    </button>
  )
}