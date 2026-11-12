import Link from "next/link";
import { getExhibitorStats, getFooterExhibitors } from "@/lib/scraper/getExhibitorStats";
import { formatDates } from "@/lib/format";

const links = [
  { href: "/#products", label: "Products" },
];

export default async function Footer() {
  const [{ exhibitorCount, shows }, exhibitors] = await Promise.all([
    getExhibitorStats(),
    getFooterExhibitors(8),
  ]);

  return (
    <footer className="mt-16 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-lg font-bold text-white">
                H
              </span>
              <span className="leading-tight">
                <span className="block text-lg font-bold text-white">Hubble</span>
                <span className="block text-[11px] text-slate-400">by Cavli Wireless</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-slate-400">
              Explore Hubble products and book a consultation with the Cavli Wireless team.
            </p>
            <Link
              href="/#consult"
              className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Consult Now
            </Link>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Shows</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {shows.map((s) => (
                <li key={s.id}>
                  <p className="text-slate-200">{s.name}</p>
                  <p className="text-xs text-slate-400">{formatDates(s.startDate, s.endDate)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <div className="mb-4 flex items-end justify-between gap-4">
            <h3 className="text-sm font-semibold text-white">Featured exhibitors</h3>
            <p className="text-xs text-slate-400">
              Showing {exhibitors.length} of {exhibitorCount}
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {exhibitors.map((e) => (
              <li key={e.id} className="rounded-lg border border-slate-700 bg-slate-800/60 p-3">
                <p className="truncate text-sm font-medium text-white">{e.companyName}</p>
                <p className="mt-1 truncate text-xs text-slate-400">
                  {e.country?.name ?? "Country not listed"}
                  {e.boothNo ? ` · Booth ${e.boothNo}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Hubble by Cavli Wireless. All rights reserved.</p>
          <p>Exhibitor data sourced from MMI Connect</p>
        </div>
      </div>
    </footer>
  );
}