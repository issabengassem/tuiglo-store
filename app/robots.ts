import type { MetadataRoute } from "next";

const BASE_URL = "https://tuiglo.store";

export default function robots(): MetadataRoute.Robots {
  return {
    // /cart and /checkout are personal, ever-changing session state —
    // standard ecommerce practice keeps them out of the index.
    rules: { userAgent: "*", allow: "/", disallow: ["/cart", "/checkout"] },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
