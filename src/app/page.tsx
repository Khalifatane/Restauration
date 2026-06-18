import { Suspense } from "react";
import { getProductList } from "@/lib/sanity/queries/products";
import { ProductGrid } from "@/ui/components/plp";

export const metadata = {
	title: "Storefront",
	description: "Découvrez nos derniers produits.",
};

async function FeaturedProducts() {
	const products = await getProductList({ limit: 12 });

	if (!products.length) {
		return (
			<div className="py-12 text-center text-sm text-muted-foreground">
				Aucun produit disponible pour le moment. Veuillez revenir bientôt.
			</div>
		);
	}

	return <ProductGrid products={products} />;
}

export default function Page() {
	return (
		<section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
			<div className="mb-8">
				<h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">Nouveautés</h1>
				<p className="mt-2 text-muted-foreground">
					Sélections soignées, prêtes à être expédiées. Découvrez les dernières nouveautés de la collection.
				</p>
			</div>
			<Suspense fallback={<HomeGridSkeleton />}>
				<FeaturedProducts />
			</Suspense>
		</section>
	);
}

function HomeGridSkeleton() {
	return (
		<div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
			{Array.from({ length: 6 }).map((_, i) => (
				<div key={i} className="animate-pulse">
					<div className="mb-4 aspect-[3/4] rounded-xl bg-muted" />
					<div className="space-y-1.5">
						<div className="h-4 w-3/4 rounded bg-muted" />
						<div className="h-4 w-1/2 rounded bg-muted" />
					</div>
				</div>
			))}
		</div>
	);
}
