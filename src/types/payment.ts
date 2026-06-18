export interface PaymentIntent {
	token: string;
	redirectUrl?: string;
	amount: number;
	currency: string;
}

