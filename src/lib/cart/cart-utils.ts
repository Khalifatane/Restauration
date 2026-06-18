import type { CartItem } from "./cart-types";

export function getCartTotal(items: CartItem[]): { subtotal: number; currency: string | null } {
	if (items.length === 0) {
		return { subtotal: 0, currency: null };
	}

	const currency = items.find((item) => item.currency)?.currency ?? null;
	const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
	return { subtotal, currency };
}
