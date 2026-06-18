import type { PaymentIntent } from "@/types/payment";

export interface PayTechConfig {
	apiBaseUrl: string;
	apiKey: string;
}

export function getPayTechConfig(): PayTechConfig {
	return {
		apiBaseUrl: process.env.NEXT_PUBLIC_PAYTECH_API_BASE_URL || "",
		apiKey: process.env.PAYTECH_API_KEY || "",
	};
}

export async function initiatePayment(orderId: string, amount: number, currency: string): Promise<PaymentIntent> {
	const token = `paytech_${orderId}`;
	return {
		token,
		redirectUrl: `${process.env.NEXT_PUBLIC_STOREFRONT_URL || ""}/checkout/confirm?order=${orderId}`,
		amount,
		currency,
	};
}

export async function handleIpnWebhook(_payload: unknown): Promise<void> {
	// Implement PayTech IPN verification here when integrating the real API.
}

