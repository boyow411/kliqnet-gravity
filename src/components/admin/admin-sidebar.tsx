"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
    LayoutDashboard,
    FileText,
    Briefcase,
    Inbox,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronRight,
    Users,
    FileCode,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/blog", label: "Blog Posts", icon: FileText },
    { href: "/admin/projects", label: "Projects", icon: Briefcase },
    { href: "/admin/onboarding", label: "Onboarding", icon: Users },
    { href: "/admin/templates", label: "Templates", icon: FileCode },
    { href: "/admin/submissions", label: "Submissions", icon: Inbox },
    { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (href: string) => {
        if (href === "/admin") return pathname === "/admin";
        return pathname.startsWith(href);
    };

    const sidebarContent = (
        <div className="flex flex-col h-full">
            {/* Brand */}
            <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-sm text-white">
                    K
                </div>
                {!collapsed && (
                    <span className="font-semibold text-white tracking-tight">
                        Kliqnet Admin
                    </span>
                )}
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                            isActive(item.href)
                                ? "bg-blue-600/15 text-blue-400 border border-blue-500/20"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <item.icon className="w-4.5 h-4.5 shrink-0" />
                        {!collapsed && <span>{item.label}</span>}
                        {!collapsed && isActive(item.href) && (
                            <ChevronRight className="w-3.5 h-3.5 ml-auto text-blue-400/60" />
                        )}
                    </Link>
                ))}
            </nav>

            {/* Footer */}
            <div className="px-3 py-4 border-t border-white/10">
                <button
                    onClick={() => signOut({ callbackUrl: "/admin/login" })}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all w-full"
                >
                    <LogOut className="w-4.5 h-4.5 shrink-0" />
                    {!collapsed && <span>Sign Out</span>}
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile toggle */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="fixed top-4 left-4 z-50 lg:hidden bg-white/10 backdrop-blur-sm text-white p-2 rounded-lg border border-white/10"
            >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 left-0 z-40 h-screen bg-[#0a0a0f] border-r border-white/8 transition-all duration-300",
                    collapsed ? "w-[68px]" : "w-[240px]",
                    mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                {sidebarContent}
            </aside>

            {/* Spacer */}
            <div
                className={cn(
                    "hidden lg:block shrink-0 transition-all duration-300",
                    collapsed ? "w-[68px]" : "w-[240px]"
                )}
            />
        </>
    );
}
