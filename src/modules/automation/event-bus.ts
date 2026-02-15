/* ═══════════════════════════════════════════════════════════════
   Event Bus — Typed pub/sub for automation triggers
   ═══════════════════════════════════════════════════════════════ */

import type { OnboardingEvent } from "@/modules/onboarding/types";

interface EventPayload {
    SESSION_CREATED: { sessionId: number; organizationId: number; projectId: number | null };
    SESSION_STARTED: { sessionId: number; organizationId: number };
    SESSION_COMPLETED: { sessionId: number; organizationId: number; projectId: number | null };
    SESSION_APPROVED: { sessionId: number; organizationId: number; projectId: number | null };
    RESPONSE_SAVED: { sessionId: number; stepId: string; fieldId: string };
    FILE_UPLOADED: { sessionId: number; fileId: number; organizationId: number };
}

type EventHandler<T extends OnboardingEvent> = (payload: EventPayload[T]) => Promise<void>;

type HandlerMap = {
    [K in OnboardingEvent]?: EventHandler<K>[];
};

class EventBus {
    private handlers: HandlerMap = {};

    /**
     * Register a handler for a specific event type.
     */
    on<T extends OnboardingEvent>(event: T, handler: EventHandler<T>) {
        if (!this.handlers[event]) {
            this.handlers[event] = [];
        }
        (this.handlers[event] as EventHandler<T>[]).push(handler);
    }

    /**
     * Emit an event — all registered handlers run in parallel.
     * Errors are caught and logged so one handler can't break others.
     */
    async emit<T extends OnboardingEvent>(event: T, payload: EventPayload[T]) {
        const handlers = (this.handlers[event] || []) as EventHandler<T>[];

        if (handlers.length === 0) return;

        const results = await Promise.allSettled(
            handlers.map((handler) => handler(payload))
        );

        for (const result of results) {
            if (result.status === "rejected") {
                console.error(`[EventBus] Handler failed for ${event}:`, result.reason);
            }
        }
    }
}

// Singleton instance
export const eventBus = new EventBus();
