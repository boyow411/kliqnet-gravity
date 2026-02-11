import { MultiStepForm } from "@/components/forms/multi-step-form";

export const metadata = {
    title: "Start a Project | Kliqnet Digital",
    description: "Tell us about your project. Get a tailored strategy call and proposal within 24 hours.",
};

export default function ContactPage() {
    return (
        <div className="pt-32 pb-20 min-h-screen bg-black text-white">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                        Let's Build Something Great
                    </h1>
                    <p className="text-lg text-gray-400">
                        Answer a few quick questions so we can understand your needs and prepare a tailored proposal.
                    </p>
                </div>

                <MultiStepForm />
            </div>
        </div>
    );
}
