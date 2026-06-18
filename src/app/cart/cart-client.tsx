"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/cart/cart-service";
import { formatMoney } from "@/lib/utils";
import { localeConfig } from "@/config/locale";

export function CartClient() {
	const items = useCartStore((state) => state.items);
	const total = useCartStore((state) => state.total());
	const removeItem = useCartStore((state) => state.removeItem);
	const currency = items.find((item) => item.currency)?.currency ?? localeConfig.fallbackCurrency;

	if (items.length === 0) {
		return (
			<p className="p-4">
				Votre panier est vide.{" "}
				<Link href="/products" className="underline">
					Retour aux produits
				</Link>
			</p>
		);
	}

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Mon Panier</h1>
			<ul className="space-y-4">
				{items.map((item) => (
					<li
						key={`${item.productId}-${item.variantId ?? "base"}`}
						className="flex items-center justify-between gap-4 border p-2 rounded"
					>
						<div className="flex items-center gap-3">
							<div className="relative h-16 w-16 overflow-hidden rounded bg-muted">
								{item.image ? (
									<Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
								) : (
									<div className="h-full w-full bg-muted" aria-hidden="true" />
								)}
							</div>
							<div>
							<p>
								{item.name} (x{item.quantity})
							</p>
							<p className="text-green-700">{formatMoney(item.price * item.quantity, currency)}</p>
							</div>
						</div>
						<button
							type="button"
							onClick={() => {
								if (window.confirm("Supprimer cet article du panier ?")) {
									removeItem(item.productId, item.variantId);
								}
							}}
							className="text-red-500 font-bold"
						>
							Supprimer
						</button>
					</li>
				))}
			</ul>
			<p className="mt-4 font-bold text-lg">Total : {formatMoney(total, currency)}</p>
			<Link
				href="/checkout"
				aria-disabled={items.length === 0}
				className={`block mt-4 w-full text-center p-3 rounded ${
					items.length === 0 ? "cursor-not-allowed bg-gray-300 text-gray-600" : "bg-green-500 text-white"
				}`}
			>
				Passer à la commande
			</Link>
		</div>
	);
}
