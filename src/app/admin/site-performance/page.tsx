import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { neon } from "@neondatabase/serverless";
import { authOptions } from "@/lib/auth";
import { hasPermission, isValidRole } from "@/modules/auth/types";
export const dynamic = "force-dynamic";
export default async function Performance() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!role || !isValidRole(role) || !hasPermission(role, "manage:projects"))
    redirect("/admin");
  const sql = neon(process.env.DATABASE_URL!);
  const rows =
    await sql`SELECT path,event,sum(count)::int AS total FROM site_event_counts WHERE day>=current_date-29 GROUP BY path,event ORDER BY total DESC`;
  return (
    <div className="py-8 space-y-6">
      <h1 className="text-3xl">Website performance</h1>
      <p className="text-gray-400 max-w-2xl">
        Public page views and enquiry actions in the last 30 days (UTC). These
        are aggregate event totals, not unique visitors or confirmed sales. No
        cookies or personal form contents are recorded here.
      </p>
      {rows.length === 0 ? (
        <p>No events recorded yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                {["Page", "Action", "Total"].map((t) => (
                  <th key={t} className="p-3 border-b border-white/20">
                    {t}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.path + r.event}>
                  <td className="p-3">{r.path}</td>
                  <td className="p-3">{r.event.replaceAll("_", " ")}</td>
                  <td className="p-3">{r.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
