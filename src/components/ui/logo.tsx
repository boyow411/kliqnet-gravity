import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    variant?: "full" | "icon";
}

export function Logo({ className, variant = "full" }: LogoProps) {
    return (
        <Link href="/" className={cn("flex items-center gap-2 group", className)}>
            <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                    src="/kliqnet-logo-transparent.png"
                    alt="Kliqnet Logo"
                    fill
                    className="object-contain"
                    sizes="32px"
                />
            </div>
            {variant === "full" && (
                <span className="text-xl font-bold tracking-tighter text-white">
                    Kliqnet<span className="text-blue-500">.</span>
                </span>
            )}
        </Link>
    );
}
