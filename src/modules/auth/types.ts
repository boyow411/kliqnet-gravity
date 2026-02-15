/* ═══════════════════════════════════════════════════════════════
   Auth Types — Role definitions and permission map
   ═══════════════════════════════════════════════════════════════ */

export const ROLES = ["SUPER_ADMIN", "ADMIN", "TEAM_MEMBER", "CLIENT"] as const;
export type Role = (typeof ROLES)[number];

export type Permission =
    | "manage:organizations"
    | "manage:users"
    | "manage:clients"
    | "manage:projects"
    | "manage:templates"
    | "manage:sessions"
    | "view:sessions"
    | "manage:milestones"
    | "manage:tasks"
    | "manage:audit"
    | "view:dashboard"
    | "manage:settings"
    | "manage:blog"
    | "manage:submissions";

/**
 * Permission matrix — which roles can do what.
 * SUPER_ADMIN inherits everything.
 */
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
    SUPER_ADMIN: [
        "manage:organizations",
        "manage:users",
        "manage:clients",
        "manage:projects",
        "manage:templates",
        "manage:sessions",
        "view:sessions",
        "manage:milestones",
        "manage:tasks",
        "manage:audit",
        "view:dashboard",
        "manage:settings",
        "manage:blog",
        "manage:submissions",
    ],
    ADMIN: [
        "manage:users",
        "manage:clients",
        "manage:projects",
        "manage:templates",
        "manage:sessions",
        "view:sessions",
        "manage:milestones",
        "manage:tasks",
        "manage:audit",
        "view:dashboard",
        "manage:settings",
        "manage:blog",
        "manage:submissions",
    ],
    TEAM_MEMBER: [
        "manage:clients",
        "manage:projects",
        "manage:sessions",
        "view:sessions",
        "manage:milestones",
        "manage:tasks",
        "view:dashboard",
    ],
    CLIENT: [
        "view:sessions",
    ],
};

export function hasPermission(role: Role, permission: Permission): boolean {
    return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function isValidRole(role: string): role is Role {
    return ROLES.includes(role as Role);
}
