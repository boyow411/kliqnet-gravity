import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "full" | "icon";
}

export function Logo({ className, variant = "full" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Kliqnet Digital home"
      className={cn("inline-flex shrink-0 items-center rounded-sm", className)}
    >
      <Image
        src={
          variant === "icon" ? "/brand/avatar.svg" : "/brand/logo-on-dark.svg"
        }
        alt=""
        width={variant === "icon" ? 40 : 184}
        height={variant === "icon" ? 40 : 50}
        className={
          variant === "icon" ? "h-10 w-10" : "h-auto w-[168px] sm:w-[184px]"
        }
        priority
        unoptimized
      />
    </Link>
  );
}
