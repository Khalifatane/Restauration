import { CartClient } from "./cart-client";

export const metadata = {
	title: "Panier - Storefront",
	description: "Vérifiez les articles dans votre panier.",
};

export default function Page() {
	return <CartClient />;
}
