import { withAuth } from "next-auth/middleware";

const ADMIN_ROLES = new Set(["SUPER_ADMIN", "ADMIN"]);

function hasAdminRole(token: unknown) {
    return (
        !!token &&
        typeof token === "object" &&
        "role" in token &&
        typeof token.role === "string" &&
        ADMIN_ROLES.has(token.role)
    );
}

export default withAuth({
    callbacks: {
        authorized: ({ token, req }) => {
            const pathname = req.nextUrl.pathname;

            // Allow the admin sign-in page so unauthenticated users can log in.
            if (pathname.startsWith("/admin/login")) {
                return true;
            }

            // Admin pages and admin APIs require an authenticated admin-capable role.
            if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
                return hasAdminRole(token);
            }

            return true;
        },
    },
});

export const config = {
    matcher: ["/admin/:path*", "/api/admin/:path*"],
};
