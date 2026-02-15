/* ═══════════════════════════════════════════════════════════════
   Onboarding Types — Template, Step, and Field definitions
   ═══════════════════════════════════════════════════════════════ */

/** Supported field types for the template engine */
export type FieldType =
    | "text"
    | "textarea"
    | "select"
    | "multi-select"
    | "number"
    | "date"
    | "file"
    | "boolean";

/** Conditional visibility rule for a field */
export interface FieldCondition {
    /** The field ID this condition depends on */
    dependsOn: string;
    /** The value the dependent field must have */
    value: string | string[] | boolean;
    /** Comparison operator */
    operator: "equals" | "not_equals" | "includes" | "not_includes";
}

/** A single field within a template step */
export interface TemplateField {
    id: string;
    label: string;
    type: FieldType;
    required: boolean;
    placeholder?: string;
    helpText?: string;
    /** Options for select/multi-select */
    options?: { label: string; value: string }[];
    /** Conditional visibility */
    condition?: FieldCondition;
    /** Validation constraints */
    validation?: {
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
        pattern?: string;
        fileTypes?: string[];
        maxFileSize?: number; // bytes
    };
}

/** A step (page) within an onboarding template */
export interface TemplateStep {
    id: string;
    title: string;
    description?: string;
    fields: TemplateField[];
}

/** Full template structure stored in the `steps` JSONB column */
export type TemplateSteps = TemplateStep[];

/** Session statuses */
export type SessionStatus = "DRAFT" | "IN_PROGRESS" | "COMPLETED" | "APPROVED";

/** Risk levels */
export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export interface RiskScore {
    score: number;
    level: RiskLevel;
    factors: string[];
}

/** Onboarding event types for the automation layer */
export type OnboardingEvent =
    | "SESSION_CREATED"
    | "SESSION_STARTED"
    | "SESSION_COMPLETED"
    | "SESSION_APPROVED"
    | "RESPONSE_SAVED"
    | "FILE_UPLOADED";
