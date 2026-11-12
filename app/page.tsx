import Link from "next/link";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";


export default function Home() {

  return (
	
		<>
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Cavli Wireless
          </p>
          <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Connect, manage and scale your IoT devices with Hubble
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-slate-600 sm:text-lg">
            Explore Cavli IoT modules, see them in 3D, and book a call with our team.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {/* <Link
              href="#products"
              className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
            >
              Explore products
            </Link> */}
            <Link
              href="#consult"
              className="w-full rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-600 hover:text-blue-600 sm:w-auto"
            >
              Consult now
            </Link>
          </div>
        </div>
      </section>

      <section id="products" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-slate-100">Our products</h2>
          <p className="mt-2 text-slate-500 ">
            Select a module to see its details and an interactive 3D view.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* <section id="consult" className="scroll-mt-28 border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-bold text-slate-900">Consult now</h2>
          <p className="mt-2 text-slate-600">Booking form coming next.</p>
        </div>
      </section> */}
    </>

  );
}
