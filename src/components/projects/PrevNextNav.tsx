import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";

type PrevNextNavProps = {
    prev: Project | null;
    next: Project | null;
};

export function PrevNextNav({ prev, next }: PrevNextNavProps) {
    return (
        <div className="flex items-stretch gap-4 pt-8 border-t border-white/[0.06]">
            {prev ? (
                <Link
                    href={`/projects/${prev.slug}`}
                    className="group flex-1 flex items-center gap-3 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-blue-500/30 hover:bg-white/[0.04] transition-all"
                >
                    <ArrowLeft className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors shrink-0" />
                    <div className="min-w-0">
                        <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-0.5">
                            Previous
                        </p>
                        <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors truncate">
                            {prev.name}
                        </p>
                    </div>
                </Link>
            ) : (
                <div className="flex-1" />
            )}

            {next ? (
                <Link
                    href={`/projects/${next.slug}`}
                    className="group flex-1 flex items-center justify-end gap-3 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-blue-500/30 hover:bg-white/[0.04] transition-all text-right"
                >
                    <div className="min-w-0">
                        <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-0.5">
                            Next
                        </p>
                        <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors truncate">
                            {next.name}
                        </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors shrink-0" />
                </Link>
            ) : (
                <div className="flex-1" />
            )}
        </div>
    );
}
