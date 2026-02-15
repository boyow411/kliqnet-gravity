"use client";

import { Settings as SettingsIcon } from "lucide-react";

export default function AdminSettingsPage() {
    return (
        <div className="space-y-6">
            <div className="pt-8 lg:pt-4">
                <h1 className="text-2xl font-bold text-white tracking-tight">Settings</h1>
                <p className="text-sm text-gray-500 mt-1">Manage your site configuration</p>
            </div>

            <div className="bg-white/[0.03] border border-white/8 rounded-xl p-8 flex flex-col items-center justify-center min-h-[300px]">
                <SettingsIcon className="w-10 h-10 text-gray-600 mb-4" />
                <h2 className="text-lg font-semibold text-gray-300 mb-2">Coming Soon</h2>
                <p className="text-sm text-gray-500 text-center max-w-sm">
                    Site settings management including SEO defaults, contact info, social links, and feature toggles will be available here.
                </p>
            </div>
        </div>
    );
}
