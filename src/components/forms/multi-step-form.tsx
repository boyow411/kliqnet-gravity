"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowLeft, Check, Globe, Smartphone, Layout, BarChart3, Zap, Lightbulb, Building2, TrendingUp } from "lucide-react";

const steps = [
    { id: 1, title: "Project Type" },
    { id: 2, title: "Business Stage" },
    { id: 3, title: "Budget & Timeline" },
    { id: 4, title: "Your Details" },
];

const projectTypes = [
    { id: "web", label: "Web Development", icon: Globe, description: "Marketing sites, web apps, e-commerce" },
    { id: "app", label: "App Development", icon: Smartphone, description: "Cross-platform mobile applications" },
    { id: "saas", label: "SaaS Platform", icon: Layout, description: "Software products and dashboards" },
    { id: "marketing", label: "Digital Marketing", icon: BarChart3, description: "SEO, paid ads, growth strategy" },
    { id: "automation", label: "Automation & CRM", icon: Zap, description: "Workflows, integrations, systems" },
];

const businessStages = [
    { id: "idea", label: "Idea Stage", icon: Lightbulb, description: "Validating concept, seeking MVP" },
    { id: "existing", label: "Existing Business", icon: Building2, description: "Upgrading or rebuilding systems" },
    { id: "scaling", label: "Scaling", icon: TrendingUp, description: "Growth-focused, optimising operations" },
];

const budgetRanges = ["$5k - $15k", "$15k - $30k", "$30k - $50k", "$50k - $100k", "$100k+"];
const timelines = ["ASAP (< 1 month)", "1-2 months", "2-3 months", "3-6 months", "Flexible"];

type FormData = {
    projectType: string;
    businessStage: string;
    budget: string;
    timeline: string;
    name: string;
    email: string;
    company: string;
    message: string;
};

export function MultiStepForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        projectType: "",
        businessStage: "",
        budget: "",
        timeline: "",
        name: "",
        email: "",
        company: "",
        message: "",
    });

    const updateField = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const canProceed = () => {
        switch (currentStep) {
            case 1: return formData.projectType !== "";
            case 2: return formData.businessStage !== "";
            case 3: return formData.budget !== "" && formData.timeline !== "";
            case 4: return formData.name !== "" && formData.email !== "";
            default: return false;
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    company: formData.company,
                    message: formData.message,
                    projectType: formData.projectType,
                    budget: formData.budget,
                    timeline: formData.timeline,
                    businessStage: formData.businessStage,
                }),
            });
            if (res.ok) {
                alert("Thank you! We'll be in touch within 24 hours.");
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch {
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-12">
                <div className="flex items-center justify-between mb-4">
                    {steps.map((step, index) => (
                        <div key={step.id} className="flex items-center">
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
                                    currentStep > step.id
                                        ? "bg-green-500 text-white"
                                        : currentStep === step.id
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-800 text-gray-400"
                                )}
                            >
                                {currentStep > step.id ? <Check size={18} /> : step.id}
                            </div>
                            {index < steps.length - 1 && (
                                <div
                                    className={cn(
                                        "w-16 md:w-24 h-1 mx-2 rounded transition-all",
                                        currentStep > step.id ? "bg-green-500" : "bg-gray-800"
                                    )}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <p className="text-center text-sm text-gray-400">{steps[currentStep - 1].title}</p>
            </div>

            {/* Form Steps */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="min-h-[320px]"
                >
                    {currentStep === 1 && (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-white mb-6">What type of project are you looking for?</h2>
                            <div className="grid gap-4">
                                {projectTypes.map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => updateField("projectType", type.id)}
                                        className={cn(
                                            "flex items-center gap-4 p-5 rounded-xl border text-left transition-all",
                                            formData.projectType === type.id
                                                ? "bg-blue-500/20 border-blue-500"
                                                : "bg-white/5 border-white/10 hover:border-white/30"
                                        )}
                                    >
                                        <type.icon className={cn("w-6 h-6", formData.projectType === type.id ? "text-blue-400" : "text-gray-400")} />
                                        <div>
                                            <p className="font-semibold text-white">{type.label}</p>
                                            <p className="text-sm text-gray-400">{type.description}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-white mb-6">Where is your business right now?</h2>
                            <div className="grid gap-4">
                                {businessStages.map((stage) => (
                                    <button
                                        key={stage.id}
                                        onClick={() => updateField("businessStage", stage.id)}
                                        className={cn(
                                            "flex items-center gap-4 p-5 rounded-xl border text-left transition-all",
                                            formData.businessStage === stage.id
                                                ? "bg-blue-500/20 border-blue-500"
                                                : "bg-white/5 border-white/10 hover:border-white/30"
                                        )}
                                    >
                                        <stage.icon className={cn("w-6 h-6", formData.businessStage === stage.id ? "text-blue-400" : "text-gray-400")} />
                                        <div>
                                            <p className="font-semibold text-white">{stage.label}</p>
                                            <p className="text-sm text-gray-400">{stage.description}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-4">What's your budget range?</h2>
                                <div className="flex flex-wrap gap-3">
                                    {budgetRanges.map((budget) => (
                                        <button
                                            key={budget}
                                            onClick={() => updateField("budget", budget)}
                                            className={cn(
                                                "px-4 py-2 rounded-full border text-sm font-medium transition-all",
                                                formData.budget === budget
                                                    ? "bg-blue-500 border-blue-500 text-white"
                                                    : "bg-transparent border-gray-700 text-gray-300 hover:border-gray-500"
                                            )}
                                        >
                                            {budget}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4">When do you need it?</h3>
                                <div className="flex flex-wrap gap-3">
                                    {timelines.map((timeline) => (
                                        <button
                                            key={timeline}
                                            onClick={() => updateField("timeline", timeline)}
                                            className={cn(
                                                "px-4 py-2 rounded-full border text-sm font-medium transition-all",
                                                formData.timeline === timeline
                                                    ? "bg-blue-500 border-blue-500 text-white"
                                                    : "bg-transparent border-gray-700 text-gray-300 hover:border-gray-500"
                                            )}
                                        >
                                            {timeline}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-white mb-6">Almost there! How can we reach you?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-gray-300">Name *</label>
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => updateField("name", e.target.value)}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-300">Email *</label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => updateField("email", e.target.value)}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="john@company.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="company" className="text-sm font-medium text-gray-300">Company</label>
                                <input
                                    id="company"
                                    type="text"
                                    value={formData.company}
                                    onChange={(e) => updateField("company", e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="Acme Inc."
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-gray-300">Tell us more about your project</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => updateField("message", e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                    placeholder="Share any details about your goals, requirements, or questions..."
                                />
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
                {currentStep > 1 ? (
                    <Button variant="ghost" onClick={() => setCurrentStep((s) => s - 1)}>
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                ) : (
                    <div />
                )}

                {currentStep < 4 ? (
                    <Button onClick={() => setCurrentStep((s) => s + 1)} disabled={!canProceed()}>
                        Next <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                ) : (
                    <Button onClick={handleSubmit} disabled={!canProceed()} isLoading={isSubmitting}>
                        Submit Enquiry <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                )}
            </div>
        </div>
    );
}
