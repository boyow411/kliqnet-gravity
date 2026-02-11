import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-white/[0.06] bg-black">
            {/* Responsive footer styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .footer-status { padding: 20px 16px; }
                .footer-main { padding: 48px 16px 40px 16px; }
                .footer-copyright { padding: 20px 16px; }
                @media (min-width: 640px) {
                    .footer-status { padding: 24px 24px; }
                    .footer-main { padding: 64px 24px 56px 24px; }
                    .footer-copyright { padding: 24px 24px; }
                }
                @media (min-width: 1024px) {
                    .footer-status { padding: 32px 32px; }
                    .footer-main { padding: 96px 32px 80px 32px; }
                    .footer-copyright { padding: 32px 32px; }
                }
            `}} />

            {/* Status bar */}
            <div className="container mx-auto border-b border-white/[0.06] footer-status">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5 text-sm text-gray-400">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                        </span>
                        Currently accepting new projects
                    </div>
                    <Link
                        href="/book-a-call"
                        className="text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium"
                    >
                        Start a project →
                    </Link>
                </div>
            </div>

            {/* Main footer */}
            <div className="container mx-auto footer-main">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Brand */}
                    <div className="col-span-2 lg:col-span-2" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <Link href="/" className="inline-block text-2xl font-bold tracking-tighter text-white">
                            Kliqnet<span className="text-blue-500">.</span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                            We build web apps, mobile apps, SaaS platforms, and automation systems for businesses serious about growth. Operator-led, product-minded, results-driven.
                        </p>
                        <div className="text-sm text-gray-600">
                            London, UK · Remote-first
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-semibold text-white text-sm mb-4 lg:mb-6">Company</h4>
                        <ul className="flex flex-col gap-3 lg:gap-4 text-sm text-gray-500">
                            <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                            <li><Link href="/projects" className="hover:text-white transition-colors">Projects</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/blog" className="hover:text-white transition-colors">Insights</Link></li>
                            <li><Link href="/book-a-call" className="hover:text-white transition-colors">Book a Call</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-semibold text-white text-sm mb-4 lg:mb-6">Services</h4>
                        <ul className="flex flex-col gap-3 lg:gap-4 text-sm text-gray-500">
                            <li><Link href="/web-development" className="hover:text-white transition-colors">Web Development</Link></li>
                            <li><Link href="/app-development" className="hover:text-white transition-colors">Mobile Apps</Link></li>
                            <li><Link href="/saas-development" className="hover:text-white transition-colors">SaaS Platforms</Link></li>
                            <li><Link href="/automation" className="hover:text-white transition-colors">Automation</Link></li>
                            <li><Link href="/ai-integration" className="hover:text-white transition-colors">AI Integration</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold text-white text-sm mb-4 lg:mb-6">Legal</h4>
                        <ul className="flex flex-col gap-3 lg:gap-4 text-sm text-gray-500">
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright bar */}
            <div className="border-t border-white/[0.06]">
                <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 footer-copyright">
                    <div className="text-xs text-gray-600">
                        &copy; {new Date().getFullYear()} Kliqnet Digital. All rights reserved.
                    </div>
                    <div className="flex items-center gap-6 text-xs text-gray-600">
                        <span>hello@kliqnet.com</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

