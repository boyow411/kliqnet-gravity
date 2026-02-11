import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, Clock, Users, Target, MessageSquare, Calendar } from "lucide-react";

export const metadata = {
    title: "Book a Strategy Call | Kliqnet Digital",
    description: "Schedule a free 30-minute strategy call to discuss your digital project. No sales pressure, just clarity.",
};

const whatWeDiscuss = [
    { icon: Target, text: "Your business goals and challenges" },
    { icon: Users, text: "Who your customers are and what they need" },
    { icon: MessageSquare, text: "The scope and complexity of your project" },
    { icon: Clock, text: "Realistic timelines and budget expectations" },
];

const whoItsFor = [
    "Founders building their first digital product",
    "SMEs scaling with better systems",
    "Agencies needing a reliable dev partner",
    "Teams upgrading legacy platforms",
];

const whoItsNotFor = [
    "Quick logo or one-off graphic requests",
    "Projects under $5k budget",
    "Immediate same-day turnarounds",
];

export default function BookACallPage() {
    return (
        <div className="pt-32 pb-20 min-h-screen bg-black text-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Hero */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                            Book a Free Strategy Call
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            30 minutes. No pressure. Just clarity on how to move your project forward.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                        {/* Left: What to Expect */}
                        <div className="space-y-10">
                            <div>
                                <h2 className="text-2xl font-bold mb-6">What We'll Cover</h2>
                                <ul className="space-y-4">
                                    {whatWeDiscuss.map((item, index) => (
                                        <li key={index} className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                                <item.icon className="w-5 h-5 text-blue-400" />
                                            </div>
                                            <span className="text-gray-300 pt-2">{item.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-green-400">This call is for you if...</h3>
                                <ul className="space-y-3">
                                    {whoItsFor.map((item, index) => (
                                        <li key={index} className="flex items-center gap-3 text-gray-300">
                                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-red-400">This call is not for...</h3>
                                <ul className="space-y-3">
                                    {whoItsNotFor.map((item, index) => (
                                        <li key={index} className="flex items-center gap-3 text-gray-400">
                                            <span className="w-5 h-5 text-red-500 flex-shrink-0">✕</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right: Calendar Placeholder */}
                        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                            <Calendar className="w-16 h-16 text-blue-500 mb-6" />
                            <h3 className="text-2xl font-bold mb-4">Schedule Your Call</h3>
                            <p className="text-gray-400 mb-8 max-w-sm">
                                Pick a time that works for you. We'll send a confirmation with a Zoom link.
                            </p>

                            {/* Placeholder for Calendly / Cal.com embed */}
                            <div className="w-full h-64 bg-black/50 border border-dashed border-gray-700 rounded-xl flex items-center justify-center mb-6">
                                <span className="text-gray-500 font-mono text-sm">[Calendly / Cal.com Embed]</span>
                            </div>

                            <p className="text-sm text-gray-500">
                                Or email us at <a href="mailto:hello@kliqnetdigital.com" className="text-blue-400 hover:underline">hello@kliqnetdigital.com</a>
                            </p>
                        </div>
                    </div>

                    {/* Trust Signals */}
                    <div className="border-t border-white/10 pt-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div>
                                <p className="text-3xl font-bold text-white">50+</p>
                                <p className="text-sm text-gray-400">Projects Delivered</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-white">5+</p>
                                <p className="text-sm text-gray-400">Years Experience</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-white">100%</p>
                                <p className="text-sm text-gray-400">Project Completion</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-white">24hr</p>
                                <p className="text-sm text-gray-400">Response Time</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
