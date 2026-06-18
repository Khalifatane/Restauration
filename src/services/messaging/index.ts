import type { Order } from "@/types/order";

export interface MessageSent {
	status: "sent" | "failed";
	timestamp: string;
}

export async function sendOrderConfirmationViaWhatsApp(_order: Order): Promise<MessageSent> {
	// Implement WhatsApp Business API integration here.
	return {
		status: "sent",
		timestamp: new Date().toISOString(),
	};
}

