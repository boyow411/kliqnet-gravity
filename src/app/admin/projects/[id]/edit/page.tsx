import { PortfolioEditor } from "@/components/admin/portfolio-editor";
export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PortfolioEditor id={id} />;
}
