import { notFound } from "next/navigation";
import { CategoryHero } from "@/ui/components/plp";
import { ProductsPageClient } from "./products-client";
import { getProductList } from "@/lib/sanity/queries/products";

export const metadata = {
	title: "Produits · Storefront",
	description: "Parcourez la collection complète de produits.",
};

export default async function Page() {
	const productCards = await getProductList({});

	if (!productCards.length) {
		notFound();
	}

	const breadcrumbs = [
		{ label: "Accueil", href: "/" },
		{ label: "Produits", href: "/products" },
	];

	return (
		<>
			<CategoryHero
				title="Tous les produits"
				description="Découvrez notre collection complète de produits de qualité."
				breadcrumbs={breadcrumbs}
			/>
			<ProductsPageClient
				products={productCards}
				pageInfo={{
					hasNextPage: false,
					hasPreviousPage: false,
					startCursor: null,
					endCursor: null,
				}}
				totalCount={productCards.length}
				resolvedCategories={[]}
			/>
		</>
	);
}
