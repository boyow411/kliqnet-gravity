/* ═══════════════════════════════════════════════════════════════
   Automation Bootstrap — Register all event handlers
   ═══════════════════════════════════════════════════════════════ */

import { eventBus } from "./event-bus";
import { handleOnboardingCompleted } from "./handlers/onboarding-completed";

let initialized = false;

/**
 * Register all automation handlers.
 * Call once at app startup (e.g., in a layout or middleware).
 * Idempotent — safe to call multiple times.
 */
export function initializeAutomation() {
    if (initialized) return;

    eventBus.on("SESSION_COMPLETED", handleOnboardingCompleted);

    // Future handlers can be registered here:
    // eventBus.on("SESSION_APPROVED", handleSessionApproved);
    // eventBus.on("FILE_UPLOADED", handleFileUploaded);

    initialized = true;
    console.log("[Automation] Event handlers registered");
}
