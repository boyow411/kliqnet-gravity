"use client";

/* ═══════════════════════════════════════════════════════════════
   Step Renderer — Renders all fields for a single step
   ═══════════════════════════════════════════════════════════════ */

import type { TemplateStep, FieldCondition } from "@/modules/onboarding/types";
import { FieldRenderer } from "./field-renderer";

interface StepRendererProps {
    step: TemplateStep;
    values: Record<string, unknown>;
    errors: Record<string, string>;
    onChange: (fieldId: string, value: unknown) => void;
    onBlur: (fieldId: string) => void;
    uploadToken: string;
}

/**
 * Evaluate whether a conditional field should be visible.
 */
function isFieldVisible(condition: FieldCondition | undefined, values: Record<string, unknown>): boolean {
    if (!condition) return true;

    const depValue = values[condition.dependsOn];

    switch (condition.operator) {
        case "equals":
            return depValue === condition.value;
        case "not_equals":
            return depValue !== condition.value;
        case "includes":
            if (Array.isArray(depValue) && typeof condition.value === "string") {
                return depValue.includes(condition.value);
            }
            return false;
        case "not_includes":
            if (Array.isArray(depValue) && typeof condition.value === "string") {
                return !depValue.includes(condition.value);
            }
            return true;
        default:
            return true;
    }
}

export function StepRenderer({ step, values, errors, onChange, onBlur, uploadToken }: StepRendererProps) {
    return (
        <div className="space-y-6">
            {/* Step header */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white">{step.title}</h2>
                {step.description && (
                    <p className="text-gray-400 mt-2">{step.description}</p>
                )}
            </div>

            {/* Fields */}
            {step.fields.map((field) => {
                if (!isFieldVisible(field.condition, values)) return null;

                return (
                    <FieldRenderer
                        key={field.id}
                        field={field}
                        value={values[field.id]}
                        onChange={(val) => onChange(field.id, val)}
                        onBlur={() => onBlur(field.id)}
                        error={errors[field.id]}
                        uploadToken={uploadToken}
                    />
                );
            })}
        </div>
    );
}
