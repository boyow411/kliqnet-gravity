import { permanentRedirect, notFound } from "next/navigation";
import { getPublicProject } from "@/lib/portfolio";
export default async function LegacyWork({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const aliases: Record<string, string> = {
    "esq-cocktail-bar": "esq",
    trackacct: "tracct",
  };
  if (slug === "agency-projects") permanentRedirect("/projects");
  const target = aliases[slug] || slug;
  if (!(await getPublicProject(target))) notFound();
  permanentRedirect("/projects/" + target);
}
