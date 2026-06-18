export interface CartItem {
	productId: string;
	variantId?: string | null;
	name: string;
	price: number;
	quantity: number;
	slug?: string;
	image?: string;
	imageUrl?: string;
	currency?: string;
}

export interface CartState {
	items: CartItem[];
}
