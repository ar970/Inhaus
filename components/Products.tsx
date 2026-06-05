import Bottle from "@/components/Bottle";
import Button from "@/components/ui/Button";
import Sticker from "@/components/Sticker";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { Steam } from "@/components/Doodles";
import { products, type Product } from "@/lib/data";

function ProductCard({ product, delay }: { product: Product; delay: number }) {
  return (
    <Reveal delay={delay} className="card group flex flex-col overflow-hidden">
      {/* illustrated product image */}
      <div className="relative flex h-64 items-center justify-center overflow-hidden bg-[radial-gradient(120%_120%_at_50%_10%,#FBF7EF_0%,#EFE2CC_70%,#E3D2B8_100%)]">
        <Steam className="absolute left-1/2 top-6 h-10 w-8 -translate-x-1/2 text-clay/60" />
        <Bottle className="w-[120px] transition-transform duration-300 group-hover:-translate-y-1" accent={product.accent} variant={product.variantLabel} />
        <Sticker className="absolute right-4 top-4" rotate={6} tone="espresso">{product.tag}</Sticker>
      </div>

      {/* details */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-[28px] italic leading-none">{product.name}</h3>
          <span className="label text-espresso/50">{product.altName}</span>
        </div>
        <p className="mt-3 flex-1 text-sm text-espresso/75">{product.blurb}</p>

        <div className="mt-5 flex items-center gap-2">
          <span className="font-serif text-2xl">₹{product.price}</span>
          <span className="text-sm text-espresso/45 line-through">₹{product.compareAt}</span>
          <Sticker className="ml-auto" rotate={-4} tone="sage">Save ₹{product.compareAt - product.price}</Sticker>
        </div>

        <Button href="#" className="mt-5 w-full">Add to cart</Button>
      </div>
    </Reveal>
  );
}

export default function Products() {
  return (
    <section id="products" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our products"
          title="Two pours. Pick yours."
          subtitle="One clean and bright, one bold and creamy. Both are 20 cups of café in a single little bottle."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
