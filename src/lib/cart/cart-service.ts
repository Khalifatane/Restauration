"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, CartState } from "@/types/cart";
import { getCartTotal } from "@/lib/cart/cart-utils";

export type { CartItem, CartState };

type CartStore = CartState & {
	addItem: (item: CartItem) => void;
	removeItem: (productId: string, variantId?: string | null) => void;
	clearCart: () => void;
	updateQuantity: (productId: string, variantId: string | null | undefined, qty: number) => void;
	total: () => number;
};

export const useCartStore = create<CartStore>()(
	persist(
		(set, get) => ({
			items: [],
			addItem: (item) => {
				const normalized: CartItem = {
					...item,
					image: item.image ?? item.imageUrl,
				};
				const existingIndex = get().items.findIndex(
					(i) => i.productId === normalized.productId && i.variantId === normalized.variantId,
				);
				if (existingIndex > -1) {
					const items = [...get().items];
					items[existingIndex] = {
						...items[existingIndex],
						quantity: items[existingIndex].quantity + normalized.quantity,
					};
					set({ items });
				} else {
					set({ items: [...get().items, normalized] });
				}
			},
			removeItem: (productId, variantId) => {
				set({
					items: get().items.filter(
						(i) => !(i.productId === productId && i.variantId === variantId),
					),
				});
			},
			clearCart: () => set({ items: [] }),
			updateQuantity: (productId, variantId, qty) => {
				const items = get().items.map((i) => {
					if (i.productId === productId && i.variantId === variantId) {
						return { ...i, quantity: Math.max(1, qty) };
					}
					return i;
				});
				set({ items });
			},
			total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
		}),
		{
			name: "cart-storage",
			partialize: (state) => ({ items: state.items }),
		},
	),
);

export function useCartService() {
	const items = useCartStore((state) => state.items);
	const addItem = useCartStore((state) => state.addItem);
	const removeItem = useCartStore((state) => state.removeItem);
	const updateQuantity = useCartStore((state) => state.updateQuantity);
	const clear = useCartStore((state) => state.clearCart);
	const totals = getCartTotal(items);

	return {
		state: { items },
		totals,
		addItem,
		removeItem,
		updateQuantity,
		clear,
	};
}
