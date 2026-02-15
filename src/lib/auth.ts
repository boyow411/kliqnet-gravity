import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

declare module "next-auth" {
    interface User {
        role?: string;
        organizationId?: number | null;
    }
    interface Session {
        user: {
            id?: string;
            name?: string | null;
            email?: string | null;
            role?: string;
            organizationId?: number | null;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: string;
        organizationId?: number | null;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                // Look up user in DB
                const [user] = await db
                    .select()
                    .from(users)
                    .where(eq(users.email, credentials.email));

                if (user && user.passwordHash) {
                    // DB-backed auth with bcrypt
                    const valid = await bcrypt.compare(credentials.password, user.passwordHash);
                    if (valid) {
                        return {
                            id: String(user.id),
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            organizationId: user.organizationId,
                        };
                    }
                }

                // Fallback: hardcoded admin for initial setup
                // Remove this block once DB users are seeded
                if (
                    credentials.email === "admin@kliqnet.com" &&
                    credentials.password === "admin"
                ) {
                    return {
                        id: "1",
                        name: "Admin",
                        email: "admin@kliqnet.com",
                        role: "SUPER_ADMIN",
                        organizationId: null,
                    };
                }

                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.organizationId = user.organizationId;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role;
                session.user.id = token.sub;
                session.user.organizationId = token.organizationId;
            }
            return session;
        },
    },
    pages: {
        signIn: "/admin/login",
    },
};
