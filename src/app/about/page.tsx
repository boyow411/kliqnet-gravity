export default function AboutPage() {
    return (
        <div className="pt-20 min-h-screen bg-black text-white">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto space-y-24">

                    <section className="text-center space-y-8">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Operator-Led Digital Excellence.</h1>
                        <p className="text-2xl text-gray-400 leading-relaxed">
                            We are not just a creative agency. We are product builders and system architects obsessed with scalability.
                        </p>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-white">Our Mission</h2>
                            <p className="text-gray-400 leading-relaxed">
                                To bridge the gap between stunning design and robust engineering. Too many agencies deliver pretty sites that don't convert, or complex systems that are unusable. We solve both equation sides.
                            </p>
                        </div>
                        <div className="bg-zinc-900 p-8 rounded-2xl border border-white/5 h-64 flex items-center justify-center">
                            <span className="text-gray-600 font-mono">[Image: Office / Team Work]</span>
                        </div>
                    </section>

                    <section className="space-y-8">
                        <h2 className="text-3xl font-bold text-white text-center">Why We Are Different</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-6 bg-white/5 rounded-xl">
                                <h3 className="text-xl font-semibold mb-3">No Buzzwords</h3>
                                <p className="text-gray-400 text-sm">We speak plain English and focus on metrics that actually matter to your bottom line.</p>
                            </div>
                            <div className="p-6 bg-white/5 rounded-xl">
                                <h3 className="text-xl font-semibold mb-3">Full-Stack Expertise</h3>
                                <p className="text-gray-400 text-sm">From Figma to Postgres, we understand the entire lifecycle of a digital product.</p>
                            </div>
                            <div className="p-6 bg-white/5 rounded-xl">
                                <h3 className="text-xl font-semibold mb-3">Partners, Not Vendors</h3>
                                <p className="text-gray-400 text-sm">We work as an extension of your team, caring about the product as much as you do.</p>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
