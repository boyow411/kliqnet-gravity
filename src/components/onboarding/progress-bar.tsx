"use client";

/* ═══════════════════════════════════════════════════════════════
   Progress Bar — Visual step indicator for the onboarding wizard
   ═══════════════════════════════════════════════════════════════ */

import { Check } from "lucide-react";

interface ProgressBarProps {
    steps: { id: string; title: string }[];
    currentStepIndex: number;
    completionPercentage: number;
}

export function ProgressBar({ steps, currentStepIndex, completionPercentage }: ProgressBarProps) {
    return (
        <div className="w-full">
            {/* Overall progress bar */}
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 font-medium">Progress</span>
                <span className="text-xs text-gray-400 font-mono">{completionPercentage}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-8">
                <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                />
            </div>

            {/* Step indicators */}
            <div className="flex items-center gap-1">
                {steps.map((step, index) => {
                    const isCompleted = index < currentStepIndex;
                    const isCurrent = index === currentStepIndex;

                    return (
                        <div key={step.id} className="flex items-center flex-1">
                            {/* Step dot */}
                            <div className="flex flex-col items-center flex-1 min-w-0">
                                <div
                                    className={`
                                        w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                                        transition-all duration-300 shrink-0
                                        ${isCompleted
                                            ? "bg-blue-500 text-white"
                                            : isCurrent
                                                ? "bg-blue-500/20 text-blue-400 border-2 border-blue-500/50"
                                                : "bg-white/5 text-gray-600 border border-white/10"
                                        }
                                    `}
                                >
                                    {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                                </div>
                                <span
                                    className={`
                                        text-[10px] mt-1.5 text-center truncate w-full
                                        ${isCurrent ? "text-blue-400" : isCompleted ? "text-gray-400" : "text-gray-600"}
                                    `}
                                >
                                    {step.title}
                                </span>
                            </div>

                            {/* Connector line */}
                            {index < steps.length - 1 && (
                                <div
                                    className={`
                                        h-px flex-1 min-w-4 mx-1 -mt-4
                                        ${isCompleted ? "bg-blue-500" : "bg-white/10"}
                                    `}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
