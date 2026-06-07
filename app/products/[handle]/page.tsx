import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";
import ProductPageClient from "./ProductPageClient";

export async function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ handle: string }> }
): Promise<Metadata> {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) return {};

  const activeVariant = product.variants.find((v) => !v.comingSoon);
  const price = activeVariant?.price ?? 449;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: "INHAUS Coffee" },
    image: [`https://inhauscoffee.com${product.images[0]}`],
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "INHAUS Coffee" },
    },
  };

  return {
    title: `${product.name} — INHAUS Speciality Coffee Concentrate`,
    description: product.description,
    openGraph: {
      title: `${product.name} — INHAUS Speciality Coffee Concentrate`,
      description: product.description,
      type: "website",
      locale: "en_IN",
      siteName: "INHAUS Coffee",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — INHAUS Coffee`,
      description: product.description,
    },
    other: {
      "product:price:amount": String(price),
      "product:price:currency": "INR",
    },
    // Inject Product JSON-LD via alternates hack — real injection in client component
    alternates: { canonical: `https://inhauscoffee.com/products/${handle}` },
    // Store schema for client-side injection
    ...(({ _schema: JSON.stringify(productSchema) }) as object),
  };
}

export default async function ProductPage(
  { params }: { params: Promise<{ handle: string }> }
) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) notFound();

  const activeVariant = product.variants.find((v) => !v.comingSoon);
  const price = activeVariant?.price ?? 449;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product!.name,
    description: product!.description,
    brand: { "@type": "Brand", name: "INHAUS Coffee" },
    image: product!.images.map((img) => `https://inhauscoffee.com${img}`),
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "INHAUS Coffee" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductPageClient handle={handle} />
    </>
  );
}
