import Link from "next/link";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: {product: Product}){

	return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex h-40 items-center justify-center bg-slate-100">
        <svg
          width="72"
          height="72"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          className="text-blue-600 transition group-hover:scale-110"
          aria-hidden="true"
        >
          <rect x="6" y="6" width="12" height="12" rx="2" />
          <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
          <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
        </svg>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
          {product.category}
        </p>
        <h3 className="mt-1 text-xl font-bold text-slate-900">{product.name}</h3>
        <p className="mt-2 text-sm text-slate-600">{product.tagline}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {product.features.map((f) => (
            <li key={f} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700">
              {f}
            </li>
          ))}
        </ul>

        <span className="mt-auto pt-5 text-sm font-semibold text-blue-600">
          View details <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
	)

}