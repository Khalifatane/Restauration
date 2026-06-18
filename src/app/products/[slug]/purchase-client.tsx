"use client";

import { Button } from "@/ui/components/ui/button";
import { useCartService } from "@/lib/cart/cart-service";
import { useCart } from "@/ui/components/cart/cart-context";
import { formatMoney } from "@/lib/utils";

interface PurchaseClientProps {
	productId: string;
	name: string;
	slug: string;
	image: string;
	price: number;
	currency: string;
}

export function PurchaseClient({ productId, name, slug, image, price, currency }: PurchaseClientProps) {
	const { addItem } = useCartService();
	const { openCart } = useCart();

	const handleAdd = () => {
		addItem({
			productId,
			name,
			slug,
			image,
			price,
			currency,
			quantity: 1,
		});
		openCart();
	};

	return (
		<div className="mt-6 space-y-4">
			<div className="text-2xl font-semibold">{formatMoney(price, currency)}</div>
			<Button onClick={handleAdd} size="lg" className="w-full">
				Ajouter au panier
			</Button>
		</div>
	);
}
