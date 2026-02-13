"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
            <div className="max-w-5xl mx-auto rounded-2xl border border-white/[0.08] bg-black/60 backdrop-blur-xl">
                <div className="relative flex items-center justify-between h-14 px-6">
                    {/* Logo */}
                    <Link href="/" className="text-xl font-bold tracking-tighter text-white">
                        Kliqnet<span className="text-blue-500">.</span>
                    </Link>

                    {/* Desktop Nav — centered absolutely */}
                    <div className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Book a Call — right side */}
                    <div className="hidden md:block">
                        <Button variant="primary" size="sm" asChild>
                            <Link href="/book-a-call">Book a Call</Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-gray-400 hover:text-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                {/* Mobile Nav */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden border-t border-white/[0.08] overflow-hidden"
                        >
                            <div className="flex flex-col gap-4 p-6">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-lg font-medium text-gray-300 hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <Button asChild className="w-full mt-4">
                                    <Link href="/book-a-call" onClick={() => setIsOpen(false)}>
                                        Book a Call
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
