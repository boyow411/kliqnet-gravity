import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";

export default function BrandPage() {
    return (
        <div className="min-h-screen bg-black text-white p-24 font-sans">
            <div className="max-w-4xl mx-auto space-y-16">
                <div>
                    <h1 className="text-4xl font-bold mb-4">Brand Assets</h1>
                    <p className="text-gray-400">Right-click images to save.</p>
                </div>

                {/* Icon Only */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-200">Icon Symbol</h2>
                    <div className="p-12 border border-white/10 rounded-xl bg-black/50 inline-block">
                        <Logo variant="icon" className="w-[128px] h-[128px]" />
                    </div>
                    <div className="p-12 border border-white/10 rounded-xl bg-white inline-block ml-4">
                        <div className="relative w-[128px] h-[128px]">
                            {/* We need to render the image directly here to show it on light bg if the component has white text */}
                            <img src="/kliqnet-logo-transparent.png" alt="Icon" className="w-full h-full object-contain" />
                        </div>
                    </div>
                </section>

                {/* Full Lockup */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-200">Primary Lockup</h2>
                    <div className="p-12 border border-white/10 rounded-xl bg-black/50 inline-block">
                        <Logo className="text-4xl" />
                    </div>
                </section>

                {/* Typography */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-200">Typography</h2>
                    <div className="p-8 border border-white/10 rounded-xl bg-zinc-900">
                        <p className="text-6xl font-bold tracking-tighter mb-4">Inter</p>
                        <p className="text-xl text-gray-400">The primary typeface is Inter (Google Fonts).</p>
                        <div className="mt-8 grid grid-cols-2 gap-8">
                            <div>
                                <span className="block text-sm text-gray-500 mb-2">Regular 400</span>
                                <p className="font-normal text-2xl">The quick brown fox jumps over the lazy dog.</p>
                            </div>
                            <div>
                                <span className="block text-sm text-gray-500 mb-2">Bold 700</span>
                                <p className="font-bold text-2xl">The quick brown fox jumps over the lazy dog.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
