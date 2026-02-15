import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
    interface User {
        role?: string;
    }
    interface Session {
        user: {
            id?: string;
            name?: string | null;
            email?: string | null;
            role?: string;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: string;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Admin credentials — change password before deploying to production
                if (
                    credentials?.email === "admin@kliqnet.com" &&
                    credentials?.password === "admin"
                ) {
                    return {
                        id: "1",
                        name: "Admin",
                        email: "admin@kliqnet.com",
                        role: "admin",
                    };
                }
                return null;
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role;
                session.user.id = token.sub;
            }
            return session;
        },
    },
    pages: {
        signIn: "/admin/login",
    },
};
