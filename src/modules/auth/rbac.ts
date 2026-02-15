/* ═══════════════════════════════════════════════════════════════
   RBAC Middleware — Route protection with role + org checks
   ═══════════════════════════════════════════════════════════════ */

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { hasPermission, type Permission, type Role, isValidRole } from "./types";

export interface AuthContext {
    userId: string;
    role: Role;
    organizationId: number | null;
}

interface WithAuthOptions {
    /** Required permissions — user must have at least one */
    permissions?: Permission[];
    /** If true, validates that organizationId is present in session */
    orgScoped?: boolean;
}

type AuthenticatedHandler = (
    req: NextRequest,
    ctx: AuthContext,
    params?: Record<string, string>
) => Promise<NextResponse>;

/**
 * Wraps an API route handler with authentication and authorization.
 *
 * @example
 * export const GET = withAuth(
 *   async (req, ctx) => {
 *     // ctx.userId, ctx.role, ctx.organizationId available
 *     return NextResponse.json({ ok: true });
 *   },
 *   { permissions: ["manage:projects"], orgScoped: true }
 * );
 */
export function withAuth(handler: AuthenticatedHandler, options: WithAuthOptions = {}) {
    return async (req: NextRequest, routeCtx?: { params?: Promise<Record<string, string>> }) => {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const role = session.user.role;
        if (!role || !isValidRole(role)) {
            return NextResponse.json({ error: "Invalid role" }, { status: 403 });
        }

        // Permission check
        if (options.permissions && options.permissions.length > 0) {
            const allowed = options.permissions.some((p) => hasPermission(role, p));
            if (!allowed) {
                return NextResponse.json({ error: "Forbidden" }, { status: 403 });
            }
        }

        const organizationId = session.user.organizationId
            ? Number(session.user.organizationId)
            : null;

        // Org-scoped check
        if (options.orgScoped && !organizationId) {
            return NextResponse.json(
                { error: "Organization context required" },
                { status: 403 }
            );
        }

        const ctx: AuthContext = {
            userId: session.user.id || "",
            role,
            organizationId,
        };

        const params = routeCtx?.params ? await routeCtx.params : undefined;
        return handler(req, ctx, params);
    };
}
