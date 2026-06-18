export interface SanityProductPrice {
	amount: number;
	currency: string;
}

export interface SanityImage {
	url: string;
	alt?: string;
}

export interface SanityCategoryRef {
	_id: string;
	name: string;
	slug: string;
}

export interface SanityProductVariant {
	_id: string;
	name: string;
	sku?: string;
	price?: SanityProductPrice;
	attributes?: Record<string, unknown>;
}

export interface SanityProductListItem {
	_id: string;
	name: string;
	slug: string;
	brand?: string | null;
	priceAmount: number;
	priceCurrency: string;
	thumbnailUrl?: string;
	thumbnailAlt?: string;
	category?: SanityCategoryRef | null;
	createdAt?: string;
}

export interface SanityProductDetails {
	_id: string;
	name: string;
	slug: string;
	description?: string;
	price?: SanityProductPrice;
	images?: SanityImage[];
	category?: SanityCategoryRef | null;
	variants?: SanityProductVariant[];
}

