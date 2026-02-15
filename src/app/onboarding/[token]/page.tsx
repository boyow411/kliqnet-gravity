"use client";

/* ═══════════════════════════════════════════════════════════════
   Onboarding Wizard — Client-facing multi-step form
   ═══════════════════════════════════════════════════════════════ */

import { useState, useEffect, useCallback, use } from "react";
import { StepRenderer } from "@/components/onboarding/step-renderer";
import { ProgressBar } from "@/components/onboarding/progress-bar";
import { ArrowLeft, ArrowRight, Send, Loader2, AlertTriangle, CheckCircle2 } from "lucide-react";
import type { TemplateStep } from "@/modules/onboarding/types";

interface OnboardingData {
    sessionId: number;
    templateName: string;
    steps: TemplateStep[];
    status: string;
    completionPercentage: number;
    responses: { stepId: string; fieldId: string; value: unknown }[];
}

export default function OnboardingPage({ params }: { params: Promise<{ token: string }> }) {
    const { token } = use(params);
    const [data, setData] = useState<OnboardingData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [values, setValues] = useState<Record<string, Record<string, unknown>>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [saving, setSaving] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [completionPercentage, setCompletionPercentage] = useState(0);

    // Load session data
    useEffect(() => {
        async function load() {
            try {
                const res = await fetch(`/api/onboarding/${token}`);
                if (!res.ok) {
                    const d = await res.json();
                    throw new Error(d.error || "Failed to load");
                }
                const d: OnboardingData = await res.json();
                setData(d);
                setCompletionPercentage(d.completionPercentage);

                // Hydrate existing responses
                const hydrated: Record<string, Record<string, unknown>> = {};
                for (const r of d.responses) {
                    if (!hydrated[r.stepId]) hydrated[r.stepId] = {};
                    hydrated[r.stepId][r.fieldId] = r.value;
                }
                setValues(hydrated);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Something went wrong");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [token]);

    // Autosave — debounced save on field blur
    const saveStep = useCallback(
        async (stepId: string) => {
            if (!values[stepId] || saving) return;

            setSaving(true);
            try {
                const responses = Object.entries(values[stepId]).map(([fieldId, value]) => ({
                    fieldId,
                    value,
                }));

                const res = await fetch(`/api/onboarding/${token}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ stepId, responses }),
                });

                if (res.ok) {
                    const d = await res.json();
                    setCompletionPercentage(d.completionPercentage);
                }
            } catch {
                // Silently fail — autosave shouldn't block UX
            } finally {
                setSaving(false);
            }
        },
        [values, saving, token]
    );

    // Validate current step
    const validateStep = (step: TemplateStep): boolean => {
        const stepValues = values[step.id] || {};
        const newErrors: Record<string, string> = {};

        for (const field of step.fields) {
            if (!field.required) continue;

            const val = stepValues[field.id];
            if (
                val === undefined ||
                val === null ||
                val === "" ||
                (Array.isArray(val) && val.length === 0)
            ) {
                newErrors[field.id] = `${field.label} is required`;
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Navigation
    const goNext = () => {
        if (!data) return;
        const step = data.steps[currentStep];
        if (!validateStep(step)) return;

        saveStep(step.id);

        if (currentStep < data.steps.length - 1) {
            setCurrentStep(currentStep + 1);
            setErrors({});
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const goPrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            setErrors({});
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // Submit
    const handleSubmit = async () => {
        if (!data) return;
        const step = data.steps[currentStep];
        if (!validateStep(step)) return;

        setSubmitting(true);
        try {
            // Save final step
            const responses = Object.entries(values[step.id] || {}).map(([fieldId, value]) => ({
                fieldId,
                value,
            }));

            const res = await fetch(`/api/onboarding/${token}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ stepId: step.id, responses, submit: true }),
            });

            if (res.ok) {
                setCompleted(true);
            } else {
                const d = await res.json();
                setError(d.error);
            }
        } catch {
            setError("Failed to submit. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    // ─── Render states ──────────────────────────────────

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                    <p className="text-gray-400">Loading your onboarding...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center">
                    <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
                        <AlertTriangle className="w-7 h-7 text-red-400" />
                    </div>
                    <h1 className="text-xl font-bold text-white mb-2">Unable to Load</h1>
                    <p className="text-gray-400">{error}</p>
                </div>
            </div>
        );
    }

    if (completed) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">All Done!</h1>
                    <p className="text-gray-400 mb-2">
                        Your onboarding has been submitted successfully.
                    </p>
                    <p className="text-sm text-gray-500">
                        Our team will review your responses and get back to you shortly.
                    </p>
                </div>
            </div>
        );
    }

    if (!data) return null;

    const step = data.steps[currentStep];
    const isLastStep = currentStep === data.steps.length - 1;
    const stepValues = values[step.id] || {};

    return (
        <div className="min-h-screen bg-gray-950">
            {/* Header */}
            <header className="border-b border-white/5 bg-gray-950/80 backdrop-blur-xl sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-lg font-semibold text-white">{data.templateName}</h1>
                        {saving && (
                            <span className="text-xs text-gray-500 flex items-center gap-1.5">
                                <Loader2 className="w-3 h-3 animate-spin" /> Saving...
                            </span>
                        )}
                    </div>
                    <ProgressBar
                        steps={data.steps.map((s) => ({ id: s.id, title: s.title }))}
                        currentStepIndex={currentStep}
                        completionPercentage={completionPercentage}
                    />
                </div>
            </header>

            {/* Form */}
            <main className="max-w-3xl mx-auto px-6 py-12">
                <StepRenderer
                    step={step}
                    values={stepValues}
                    errors={errors}
                    onChange={(fieldId, value) => {
                        setValues((prev) => ({
                            ...prev,
                            [step.id]: { ...prev[step.id], [fieldId]: value },
                        }));
                    }}
                    onBlur={(fieldId) => {
                        // Clear error on interaction
                        if (errors[fieldId]) {
                            setErrors((prev) => {
                                const next = { ...prev };
                                delete next[fieldId];
                                return next;
                            });
                        }
                        saveStep(step.id);
                    }}
                    uploadToken={token}
                />
            </main>

            {/* Navigation footer */}
            <footer className="fixed bottom-0 inset-x-0 border-t border-white/5 bg-gray-950/90 backdrop-blur-xl">
                <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button
                        type="button"
                        onClick={goPrev}
                        disabled={currentStep === 0}
                        className={`
                            flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
                            transition-all duration-200
                            ${currentStep === 0
                                ? "text-gray-600 cursor-not-allowed"
                                : "text-gray-300 hover:text-white hover:bg-white/5 border border-white/10"
                            }
                        `}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>

                    {isLastStep ? (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold
                                bg-blue-500 hover:bg-blue-400 text-white transition-all duration-200
                                disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Send className="w-4 h-4" />
                            )}
                            Submit
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={goNext}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold
                                bg-blue-500 hover:bg-blue-400 text-white transition-all duration-200"
                        >
                            Next
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </footer>
        </div>
    );
}
