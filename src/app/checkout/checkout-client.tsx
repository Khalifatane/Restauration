"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { useCartStore } from "@/lib/cart/cart-service";
import { handleWhatsAppRedirect } from "@/services/whatsappService";
import { localeConfig } from "@/config/locale";
import { formatMoney } from "@/lib/utils";

type CheckoutFormData = {
	name: string;
	phone: string;
	email?: string;
	city: string;
	address: string;
	deliveryMethod: "home" | "pickup";
	paymentMethod: "delivery";
};

export function CheckoutClient() {
	const cartItems = useCartStore((state) => state.items);
	const total = useCartStore((state) => state.total());
	const currency = cartItems.find((item) => item.currency)?.currency ?? localeConfig.fallbackCurrency;

	const [formData, setFormData] = useState<CheckoutFormData>({
		name: "",
		phone: "",
		email: "",
		city: "",
		address: "",
		deliveryMethod: "home",
		paymentMethod: "delivery",
	});

	const isFormValid = Boolean(
		formData.name.trim() &&
		formData.phone.trim() &&
		formData.city.trim() &&
		formData.address.trim(),
	);

	// Paystack removed: keep checkout for delivery-only orders

	const onCheckout = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = Object.fromEntries(new FormData(event.currentTarget));
		const data = {
			name: String(formData.name || ""),
			phone: String(formData.phone || ""),
			email: String(formData.email || ""),
			city: String(formData.city || ""),
			address: String(formData.address || ""),
			deliveryMethod: (formData.deliveryMethod === "pickup" ? "pickup" : "home") as CheckoutFormData["deliveryMethod"],
			paymentMethod: "delivery" as CheckoutFormData["paymentMethod"],
		};
		// For delivery-only checkout, redirect to WhatsApp without payment
		handleWhatsAppRedirect({ ...data, paid: false }, cartItems);
	};

	if (cartItems.length === 0) {
		return (
			<div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="rounded-lg border border-border bg-card p-6 text-center">
					<h1 className="mb-2 text-2xl font-semibold">Paiement</h1>
					<p className="text-sm text-muted-foreground">Votre panier est vide.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-secondary">
			<main className="mx-auto max-w-7xl px-4 py-6 pb-16 sm:px-6 md:py-8 lg:px-8">
				<div className="flex flex-col gap-8 md:flex-row">
					<section className="min-w-0 flex-1">
						<div className="mb-4 overflow-hidden rounded-lg border border-border bg-card md:hidden">
							<OrderSummary items={cartItems} total={total} currency={currency} />
						</div>
						<div className="rounded-lg border border-border bg-card p-6 md:p-8">
							<div className="mb-6 flex items-center justify-between">
								<div>
									<h1 className="text-2xl font-semibold">Paiement</h1>
									<p className="text-sm text-muted-foreground">Finalisez votre commande</p>
								</div>
								<div className="flex items-center gap-1.5 text-muted-foreground">
									<Lock className="h-4 w-4" />
									<span className="text-xs">Paiement sécurisé</span>
								</div>
							</div>

							<form onSubmit={onCheckout} className="space-y-4">
								<div>
									<label className="mb-1 block text-sm font-medium">Nom complet</label>
									<input
										name="name"
										value={formData.name}
										onChange={(event) => setFormData({ ...formData, name: event.target.value })}
										placeholder="Nom complet"
										required
										className="block w-full rounded-md border border-border bg-background p-2"
									/>
								</div>
								<div>
									<label className="mb-1 block text-sm font-medium">Numéro de téléphone</label>
									<input
										name="phone"
										value={formData.phone}
										onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
										placeholder="Numéro de téléphone"
										required
										className="block w-full rounded-md border border-border bg-background p-2"
									/>
								</div>
								<div>
									<label className="mb-1 block text-sm font-medium">Email (optionnel)</label>
									<input
										name="email"
										type="email"
										value={formData.email}
										onChange={(event) => setFormData({ ...formData, email: event.target.value })}
										placeholder="Email"
										className="block w-full rounded-md border border-border bg-background p-2"
									/>
								</div>
								<div>
									<label className="mb-1 block text-sm font-medium">Ville</label>
									<input
										name="city"
										value={formData.city}
										onChange={(event) => setFormData({ ...formData, city: event.target.value })}
										placeholder="Ville"
										required
										className="block w-full rounded-md border border-border bg-background p-2"
									/>
								</div>
								<div>
									<label className="mb-1 block text-sm font-medium">Adresse de livraison</label>
									<input
										name="address"
										value={formData.address}
										onChange={(event) => setFormData({ ...formData, address: event.target.value })}
										placeholder="Adresse"
										required
										className="block w-full rounded-md border border-border bg-background p-2"
									/>
								</div>
								<div>
									<label className="mb-1 block text-sm font-medium">Méthode de livraison</label>
									<select
										name="deliveryMethod"
										value={formData.deliveryMethod}
										onChange={(event) =>
											setFormData({
												...formData,
												deliveryMethod: event.target.value as CheckoutFormData["deliveryMethod"],
											})
										}
										className="block w-full rounded-md border border-border bg-background p-2"
									>
										<option value="home">Livraison à domicile</option>
										<option value="pickup">Retrait</option>
									</select>
								</div>
								<div>
									<label className="mb-1 block text-sm font-medium">Méthode de paiement</label>
									<select
										name="paymentMethod"
										value={formData.paymentMethod}
										onChange={(event) =>
											setFormData({
												...formData,
												paymentMethod: event.target.value as CheckoutFormData["paymentMethod"],
											})
										}
										className="block w-full rounded-md border border-border bg-background p-2"
									>
										<option value="delivery">Payer après livraison</option>
										<option value="paystack">Payer par Carte / Mobile Money</option>
									</select>
								</div>
								<button
									type="submit"
									disabled={!isFormValid}
									className="h-12 w-full rounded-md bg-green-500 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
								>
									Commander
								</button>
							</form>
						</div>
					</section>

					<aside className="hidden md:block md:shrink-0 md:basis-[30%]">
						<div className="overflow-hidden rounded-lg border border-border bg-card md:sticky md:top-8">
							<OrderSummary items={cartItems} total={total} currency={currency} />
						</div>
					</aside>
				</div>
			</main>
		</div>
	);
}

function OrderSummary({
	items,
	total,
	currency,
}: {
	items: Array<{ productId: string; variantId?: string | null; name: string; quantity: number; price: number }>;
	total: number;
	currency: string;
}) {
	return (
		<div className="p-6">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-base font-semibold">Résumé de la commande</h2>
				<span className="text-xs text-muted-foreground">
					{items.length} article{items.length > 1 ? "s" : ""}
				</span>
			</div>
			<ul className="space-y-3">
				{items.map((item) => (
					<li
						key={`${item.productId}-${item.variantId ?? "base"}`}
						className="flex items-center justify-between text-sm"
					>
						<span className="text-muted-foreground">
							{item.name} x{item.quantity}
						</span>
						<span className="font-medium">{formatMoney(item.price * item.quantity, currency)}</span>
					</li>
				))}
			</ul>
			<div className="mt-4 border-t border-border pt-4 text-sm">
				<div className="flex items-center justify-between text-muted-foreground">
					<span>Sous-total</span>
					<span>{formatMoney(total, currency)}</span>
				</div>
				<div className="mt-2 flex items-center justify-between text-muted-foreground">
					<span>Livraison</span>
					<span>Calculé à la commande</span>
				</div>
				<div className="mt-3 flex items-center justify-between text-base font-semibold text-foreground">
					<span>Total</span>
					<span>{formatMoney(total, currency)}</span>
				</div>
			</div>
		</div>
	);
}
