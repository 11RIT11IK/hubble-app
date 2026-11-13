import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ModelViewer from "@/components/ModelViewer";
import { MODEL_URL, getProduct, products } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found | Hubble" };

  return {
    title: `${product.name} | Hubble`,
    description: product.tagline,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();


  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/#products" className="text-sm font-medium text-white-600 hover:underline">
        ← All products
      </Link>

      <div className="mt-6 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <ModelViewer src={MODEL_URL} alt={`3D model of the ${product.name} module`} />

        <div>
          <p className="text-4xl font-bold uppercase tracking-wide text-white-600">
            {product.category}
          </p>
          <h1 className="mt-2 text-1xl font-semibold tracking-tight text-grey-600">{product.name}</h1>
          <p className="mt-4 text-lg text-slate-600">{product.tagline}</p>

          <h2 className="mt-8 text-sm font-semibold text-white-900">Highlights</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {product.features.map((f) => (
              <li key={f} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/consult"
              className="rounded-lg bg-blue-600 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Consult now
            </Link>
            <Link
              href="/#products"
              className="rounded-lg border border-slate-300 px-6 py-3 text-center text-sm font-semibold text-slate-800 transition hover:border-blue-600 hover:text-blue-600"
            >
              Browse all products
            </Link>
          </div>
        </div>
      </div>

      {/* <section className="mt-16">
        <h2 className="text-xl font-bold text-slate-900">Other products</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {others.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/products/${p.slug}`}
                className="inline-block rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
              >
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </section> */}
    </div>
  );
}