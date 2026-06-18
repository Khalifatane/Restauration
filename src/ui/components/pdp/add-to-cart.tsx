"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/ui/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartService } from "@/lib/cart/cart-service";
import { useCart } from "@/ui/components/cart";

interface AddToCartProps {
	price: string;
	priceAmount: number;
	currency: string;
	productId: string;
	name: string;
	slug: string;
	image: string;
	compareAtPrice?: string | null;
	discountPercent?: number | null;
	disabled?: boolean;
	disabledReason?: "no-selection" | "out-of-stock";
}

function AddToCartButton({
	disabled,
	disabledReason,
	onAdd,
}: {
	disabled?: boolean;
	disabledReason?: "no-selection" | "out-of-stock";
	onAdd: () => void;
}) {
	const [isAdding, setIsAdding] = useState(false);

	const getButtonText = () => {
		if (isAdding) return "Ajout en cours...";
		if (!disabled) return "Ajouter au panier";
		if (disabledReason === "out-of-stock") return "Rupture de stock";
		return "Sélectionner les options";
	};

	// Simple, clean - no success state needed
	// The cart badge/drawer updating IS the feedback (like Apple)
	return (
		<Button
			type="button"
			size="lg"
			disabled={disabled || isAdding}
			onClick={async () => {
				if (disabled || isAdding) return;
				setIsAdding(true);
				onAdd();
				setIsAdding(false);
			}}
			className={cn("h-14 w-full text-base font-medium transition-all duration-200", isAdding && "opacity-80")}
		>
			<ShoppingBag className={cn("mr-2 h-5 w-5 transition-transform", isAdding && "scale-90")} />
			{getButtonText()}
		</Button>
	);
}

export function AddToCart({
	price,
	priceAmount,
	currency,
	productId,
	name,
	slug,
	image,
	compareAtPrice,
	discountPercent,
	disabled = false,
	disabledReason,
}: AddToCartProps) {
	const { addItem } = useCartService();
	const { openCart } = useCart();

	const handleAdd = () => {
		addItem({
			productId,
			name,
			slug,
			image,
			price: priceAmount,
			currency,
			quantity: 1,
		});
		openCart();
	};

	return (
		<div className="space-y-4">
			{/* Price Display */}
			<div className="flex items-baseline gap-3">
				<span className="text-2xl font-semibold tracking-tight">{price}</span>
				{compareAtPrice && (
					<>
						<span className="text-lg text-muted-foreground line-through">{compareAtPrice}</span>
						{discountPercent && (
							<span className="text-sm font-medium text-destructive">-{discountPercent}%</span>
						)}
					</>
				)}
			</div>

			{/* Add to Cart Button */}
			<AddToCartButton disabled={disabled} disabledReason={disabledReason} onAdd={handleAdd} />

			{/* Trust Signals */}
			<div className="flex items-center justify-center gap-6 pt-2 text-xs text-muted-foreground">
				<span className="flex items-center gap-1.5">
					<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
						<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
					</svg>
					Paiement sécurisé
				</span>
				<span className="flex items-center gap-1.5">
					<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
						<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
						<path d="M9 22V12h6v10" />
					</svg>
					Livraison gratuite à partir de 40 000 F CFA
				</span>
			</div>
		</div>
	);
}
