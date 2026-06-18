import { sanityClient } from "@/lib/sanity/client";
import { localeConfig } from "@/config/locale";
import type { SearchProduct, SearchResult } from "./types";

interface SanitySearchOptions {
	query: string;
	limit?: number;
	offset?: number;
}

export async function searchProducts(options: SanitySearchOptions): Promise<SearchResult> {
	const { query, limit = 20, offset = 0 } = options;

	const searchQuery = `*[_type == "product" && name match $q][$offset...$end]{
  _id,
  name,
  "slug": slug.current,
  "thumbnailUrl": coalesce(images[0].asset->url, image[0].asset->url),
  "thumbnailAlt": coalesce(images[0].alt, image[0].alt, name),
  "priceAmount": coalesce(price.amount, price, 0),
  "priceCurrency": coalesce(price.currency, "XOF"),
  "category": coalesce(category, categories[0])->{
    name
  }
}`;

	const start = offset;
	const end = offset + limit;

	const startedAt = Date.now();
	const docs = await sanityClient.fetch<
		Array<{
			_id: string;
			name: string;
			slug: string;
			thumbnailUrl?: string;
			thumbnailAlt?: string;
			priceAmount?: number;
			priceCurrency?: string;
			category?: { name?: string | null } | null;
		}>
	>(searchQuery, {
		q: `*${query}*`,
		offset: start,
		end,
	});
	const queryTimeMs = Date.now() - startedAt;

	const products: SearchProduct[] = docs.map((doc) => ({
		id: doc._id,
		name: doc.name,
		slug: doc.slug,
		thumbnailUrl: doc.thumbnailUrl,
		thumbnailAlt: doc.thumbnailAlt,
		price: doc.priceAmount ?? 0,
		currency: doc.priceCurrency ?? localeConfig.fallbackCurrency,
		categoryName: doc.category?.name ?? null,
		_raw: doc,
	}));

	return {
		products,
		pagination: {
			totalCount: products.length,
		},
		queryTimeMs,
	};
}
