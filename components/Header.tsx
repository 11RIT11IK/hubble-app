import { getExhibitorStats } from "@/lib/scraper/getExhibitorStats";
import Link from "next/link";
import { formatDates } from "@/lib/format";



export default async function Header() {
const { exhibitorCount, shows } = await getExhibitorStats();

return (
   
	 <header className="sticky top-0 z-50 w-full">

<div className="bg-slate-900 text-slate-200">
  <div className="mx-auto flex max-w-6xl flex-col items-center gap-1 px-4 py-2 text-xs sm:flex-row sm:justify-between sm:text-sm">
    <p className="flex items-center gap-2">
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span className="font-semibold text-white">{exhibitorCount} exhibitors</span>
      <span className="text-slate-400">in the live directory</span>
    </p>

    <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
      {shows.map((s) => (
        <li key={s.id} className="flex items-center gap-1.5">
          <span className="font-medium text-white">{s.name}</span>
          <span className="text-slate-400">{formatDates(s.startDate, s.endDate)}</span>
        </li>
      ))}
    </ul>
  </div>
</div>

      {/* Main bar */}
      <div className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-lg font-bold text-white">
              H
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-bold text-slate-900">Hubble</span>
              <span className="block text-[11px] text-slate-500">by Cavli Wireless</span>
            </span>
          </Link>

					<Link
						href="/"
						className="relative inline-flex items-center px-1 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-indigo-600 after:transition-all after:duration-200 hover:after:w-full"
					>
						Home
					</Link>


          <Link
            href="/consult"
            className="hidden rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 md:inline-block"
          >
            Consult Now
          </Link>

          <details className="relative md:hidden">
            <summary
              aria-label="Open menu"
              className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg border border-slate-200 text-slate-700 [&::-webkit-details-marker]:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </summary>

            <div className="absolute right-0 top-12 w-60 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
    
              <Link
                href="/#consult"
                className="mt-2 block rounded-lg bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white"
              >
                Consult Now
              </Link>
            </div>
          </details>
        </div>
      </div>
    </header>


	)
	
}