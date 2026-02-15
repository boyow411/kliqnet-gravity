"use client";

import { SessionProvider } from "next-auth/react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionProvider>
            <div className="min-h-screen bg-[#060609] text-white flex">
                <AdminSidebar />
                <main className="flex-1 min-h-screen overflow-y-auto">
                    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </SessionProvider>
    );
}
