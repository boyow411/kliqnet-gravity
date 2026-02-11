import { redirect } from "next/navigation";
import { getServiceLandingData, serviceLandingPages } from "@/lib/service-landing-data";

// This route exists under /services/[slug] — redirect to /{slug} for service landing pages
// or show a 404 if the slug doesn't exist

export async function generateStaticParams() {
    return serviceLandingPages.map((page) => ({ slug: page.slug }));
}

export default async function ServiceSlugRedirect({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = getServiceLandingData(slug);

    if (data) {
        redirect(`/${slug}`);
    }

    // If not found in landing data, redirect to services page
    redirect("/services");
}
