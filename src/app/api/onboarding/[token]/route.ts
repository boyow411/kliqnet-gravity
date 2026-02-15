/* ═══════════════════════════════════════════════════════════════
   Public API: Onboarding by Token — Client-facing session access
   ═══════════════════════════════════════════════════════════════ */

import { NextRequest, NextResponse } from "next/server";
import { getSessionByToken, recalculateCompletion, updateSessionStatus } from "@/modules/onboarding/service";
import { getSessionResponses, saveStepResponses } from "@/modules/onboarding/response-service";
import { logAuditEvent } from "@/modules/audit/service";
import { eventBus } from "@/modules/automation/event-bus";
import { initializeAutomation } from "@/modules/automation";

initializeAutomation();

/**
 * GET — Load onboarding session data for the wizard.
 * Public route — validates via token, not session auth.
 */
export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ token: string }> }
) {
    const { token } = await params;
    const session = await getSessionByToken(token);

    if (!session) {
        return NextResponse.json({ error: "Invalid onboarding link" }, { status: 404 });
    }

    if (session.expired) {
        return NextResponse.json({ error: "This onboarding link has expired" }, { status: 410 });
    }

    if (session.status === "COMPLETED" || session.status === "APPROVED") {
        return NextResponse.json({
            error: "This onboarding has already been completed",
            status: session.status,
        }, { status: 403 });
    }

    // Load existing responses
    const responses = await getSessionResponses(session.id);

    return NextResponse.json({
        sessionId: session.id,
        templateName: session.templateName,
        steps: session.templateSteps,
        status: session.status,
        completionPercentage: session.completionPercentage,
        responses: responses.map((r) => ({
            stepId: r.stepId,
            fieldId: r.fieldId,
            value: r.value,
        })),
    });
}

/**
 * PUT — Save responses and optionally submit.
 * Body: { stepId, responses: [{ fieldId, value }], submit?: boolean }
 */
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ token: string }> }
) {
    const { token } = await params;
    const session = await getSessionByToken(token);

    if (!session) {
        return NextResponse.json({ error: "Invalid onboarding link" }, { status: 404 });
    }

    if (session.expired) {
        return NextResponse.json({ error: "This onboarding link has expired" }, { status: 410 });
    }

    if (session.status === "COMPLETED" || session.status === "APPROVED") {
        return NextResponse.json({ error: "Session is locked" }, { status: 403 });
    }

    const body = await req.json();

    // Save responses
    if (body.stepId && body.responses) {
        await saveStepResponses(session.id, body.stepId, body.responses);
    }

    // Update status to IN_PROGRESS if still DRAFT
    if (session.status === "DRAFT") {
        await updateSessionStatus(session.id, "IN_PROGRESS");
        await eventBus.emit("SESSION_STARTED", {
            sessionId: session.id,
            organizationId: session.organizationId,
        });
    }

    // Recalculate completion
    const completionPercentage = await recalculateCompletion(session.id);

    // Submit if requested
    if (body.submit) {
        await updateSessionStatus(session.id, "COMPLETED");

        await eventBus.emit("SESSION_COMPLETED", {
            sessionId: session.id,
            organizationId: session.organizationId,
            projectId: session.projectId,
        });

        await logAuditEvent({
            organizationId: session.organizationId,
            action: "session:completed",
            entity: "session",
            entityId: String(session.id),
            details: `Onboarding completed by client (${completionPercentage}% filled)`,
        });

        return NextResponse.json({
            status: "COMPLETED",
            completionPercentage,
            message: "Thank you! Your onboarding has been submitted.",
        });
    }

    return NextResponse.json({
        status: "IN_PROGRESS",
        completionPercentage,
    });
}
