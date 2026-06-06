const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const TOKEN  = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;
const API_URL = `https://${DOMAIN}/api/2024-01/graphql.json`;

async function storefrontFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Shopify fetch failed: ${res.status}`);
  const { data, errors } = await res.json();
  if (errors?.length) throw new Error(errors[0].message);
  return data;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  featuredImage: { url: string; altText: string | null } | null;
  variants: { edges: { node: { id: string; title: string; availableForSale: boolean } }[] };
}

export async function getProducts(): Promise<ShopifyProduct[]> {
  const data = await storefrontFetch<{ products: { edges: { node: ShopifyProduct }[] } }>(`
    query {
      products(first: 20) {
        edges {
          node {
            id title handle description
            priceRange { minVariantPrice { amount currencyCode } }
            featuredImage { url altText }
            variants(first: 5) { edges { node { id title availableForSale } } }
          }
        }
      }
    }
  `);
  return data.products.edges.map(e => e.node);
}

export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  const data = await storefrontFetch<{ product: ShopifyProduct | null }>(`
    query($handle: String!) {
      product(handle: $handle) {
        id title handle description
        priceRange { minVariantPrice { amount currencyCode } }
        featuredImage { url altText }
        variants(first: 10) { edges { node { id title availableForSale } } }
      }
    }
  `, { handle });
  return data.product;
}

export async function createCart(): Promise<string> {
  const data = await storefrontFetch<{ cartCreate: { cart: { id: string; checkoutUrl: string } } }>(`
    mutation { cartCreate { cart { id checkoutUrl } } }
  `);
  return data.cartCreate.cart.id;
}

export async function addToCart(cartId: string, variantId: string, quantity = 1): Promise<string> {
  const data = await storefrontFetch<{ cartLinesAdd: { cart: { checkoutUrl: string } } }>(`
    mutation($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { checkoutUrl }
      }
    }
  `, { cartId, lines: [{ merchandiseId: variantId, quantity }] });
  return data.cartLinesAdd.cart.checkoutUrl;
}
