"use client";

import { CartButton } from "@/ui/components/cart";
import { useCartService } from "@/lib/cart/cart-service";

export function CartNavItem() {
	const { state } = useCartService();
	const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

	return <CartButton itemCount={itemCount} />;
}
