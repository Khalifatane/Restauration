"use client";

import type { CartItem } from "@/types/cart";

type WhatsAppCustomer = {
	name: string;
	phone: string;
	email?: string;
	city: string;
	address: string;
	deliveryMethod: "home" | "pickup";
	paymentMethod: "delivery";
	paid: boolean;
	paymentReference?: string;
};

const FALLBACK_BUSINESS_NUMBER = "221XXXXXXXXX";

export const handleWhatsAppRedirect = (customer: WhatsAppCustomer, cart: CartItem[]) => {
	const businessNumber = process.env.NEXT_PUBLIC_WHATSAPP_BUSINESS_NUMBER || FALLBACK_BUSINESS_NUMBER;
	const currency = cart.find((item) => item.currency)?.currency ?? "CFA";
	const itemsList = cart
		.map((item) => `• ${item.name} (x${item.quantity}) - ${item.price} ${currency}`)
		.join("\n");
	const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

	const message = [
		"*NOUVELLE COMMANDE*",
		"----------------",
		`*Nom:* ${customer.name}`,
		`*Tel:* ${customer.phone}`,
		customer.email ? `*Email:* ${customer.email}` : null,
		`*Ville:* ${customer.city}`,
		`*Adresse:* ${customer.address}`,
		`*Livraison:* ${customer.deliveryMethod === "pickup" ? "Retrait" : "Livraison a domicile"}`,
		`*Paiement:* ${customer.paymentMethod === "delivery" ? "Paiement à la livraison" : customer.paymentMethod}`,
		customer.paid ? "*Statut:* payé" : "*Statut:* paiement à la livraison",
		customer.paymentReference ? `*Reference:* ${customer.paymentReference}` : null,
		"",
		"*Articles:*",
		itemsList,
		"",
		`*TOTAL: ${total} ${currency}*`,
	]
		.filter(Boolean)
		.join("\n");

	const url = `https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`;
	window.open(url, "_blank");
};
