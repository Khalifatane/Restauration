import { localeConfig } from "@/config/locale";
import type { ProductCardData } from "@/ui/components/plp";
import { executeSanityQuery } from "../execute";
import type { SanityProductDetails, SanityProductListItem } from "@/sanity/queries/types";
import { productDetailsQuery } from "@/sanity/queries/productDetails";
import { productListQuery } from "@/sanity/queries/productList";

type ProductListOptions = {
	limit?: number;
	offset?: number;
};

export async function getProductBySlug(slug: string): Promise<SanityProductDetails | null> {
	if (!slug) return null;
	const result = await executeSanityQuery<SanityProductDetails | null>(productDetailsQuery, { slug });

	if (!result.ok) {
		// eslint-disable-next-line no-console
		console.error("[Sanity] getProductBySlug failed:", result.error.message);
		return null;
	}

	return result.data;
}

export async function getProductList(options: ProductListOptions): Promise<ProductCardData[]> {
	const { limit = 24, offset = 0 } = options;

	const result = await executeSanityQuery<SanityProductListItem[]>(productListQuery, {
		offset,
		limit,
	});

	if (!result.ok || !Array.isArray(result.data)) {
		// eslint-disable-next-line no-console
		console.error("[Sanity] getProductList failed:", result.ok ? "No data" : result.error.message);
		return [];
	}

	return result.data.map((product) => sanityProductToProductCard(product));
}

function sanityProductToProductCard(product: SanityProductListItem): ProductCardData {
 	// DEBUG: Log raw Sanity product data
 	if (typeof window !== "undefined") {
 		console.log("[sanityProductToProductCard]", { raw: product });
 	}
	return {
		id: product._id,
		name: product.name,
		slug: product.slug,
		brand: product.brand ?? product.category?.name ?? null,
		price: product.priceAmount,
		compareAtPrice: null,
		currency: product.priceCurrency || localeConfig.fallbackCurrency,
		image: product.thumbnailUrl || "/placeholder.svg",
		imageAlt: product.thumbnailAlt || product.name,
		hoverImage: null,
		href: `/products/${product.slug}`,
		badge: null,
		colors: undefined,
		sizes: undefined,
		category: product.category
			? {
					id: product.category._id,
					name: product.category.name,
					slug: product.category.slug,
				}
			: null,
		createdAt: product.createdAt ?? null,
		hasVariants: false,
	};
}
