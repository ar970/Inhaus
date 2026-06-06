import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const client = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
  apiVersion: "2024-01",
  privateAccessToken: process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN,
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN,
});

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
  const { data, errors } = await client.request(`
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
  if (errors) throw new Error(errors.message);
  return data!.products.edges.map((e: { node: ShopifyProduct }) => e.node);
}

export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  const { data, errors } = await client.request(`
    query($handle: String!) {
      product(handle: $handle) {
        id title handle description
        priceRange { minVariantPrice { amount currencyCode } }
        featuredImage { url altText }
        variants(first: 10) { edges { node { id title availableForSale } } }
      }
    }
  `, { variables: { handle } });
  if (errors) throw new Error(errors.message);
  return data!.product;
}

export async function createCart(): Promise<{ id: string; checkoutUrl: string }> {
  const { data, errors } = await client.request(`
    mutation { cartCreate { cart { id checkoutUrl } } }
  `);
  if (errors) throw new Error(errors.message);
  return data!.cartCreate.cart;
}

export async function addToCart(cartId: string, variantId: string, quantity = 1): Promise<string> {
  const { data, errors } = await client.request(`
    mutation($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { checkoutUrl }
      }
    }
  `, { variables: { cartId, lines: [{ merchandiseId: variantId, quantity }] } });
  if (errors) throw new Error(errors.message);
  return data!.cartLinesAdd.cart.checkoutUrl;
}
