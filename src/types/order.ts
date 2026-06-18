import type { CartItem } from "./cart";

export interface Order {
	id: string;
	items: CartItem[];
	total: number;
	currency: string;
}

