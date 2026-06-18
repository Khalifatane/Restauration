export interface ProductImage {
	url: string;
	alt?: string | null;
}

export interface ProductCategory {
	id: string;
	name: string;
	slug: string;
}

export interface Product {
	id: string;
	name: string;
	slug: string;
	price: number;
	currency: string;
	images: ProductImage[];
	category?: ProductCategory | null;
}

