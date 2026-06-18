"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { searchProducts } from "@/lib/search";
import { SearchResults } from "@/ui/components/search-results";

export default function Page() {
	const searchParams = useSearchParams();
	const query = searchParams.get("query")?.trim() ?? "";

	const [isLoading, setIsLoading] = useState(false);
	const [products, setProducts] = useState<Array<Awaited<ReturnType<typeof searchProducts>>["products"][number]>>([]);
	const [totalCount, setTotalCount] = useState(0);

	const enabled = query.length > 0;

	useEffect(() => {
		let active = true;

		if (!enabled) {
			setProducts([]);
			setTotalCount(0);
			return;
		}

		setIsLoading(true);
		searchProducts({ query, limit: 20, offset: 0 })
			.then((result) => {
				if (!active) return;
				setProducts(result.products);
				setTotalCount(result.pagination.totalCount);
			})
			.finally(() => {
				if (!active) return;
				setIsLoading(false);
			});

		return () => {
			active = false;
		};
	}, [query, enabled]);

	const header = useMemo(() => {
		if (!enabled) return "Rechercher dans le catalogue";
		if (isLoading) return `Recherche de "${query}"...`;
		return `Résultats pour "${query}"`;
	}, [enabled, isLoading, query]);

	return (
		<section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			<div className="mb-8 flex flex-col gap-3">
				<h1 className="text-2xl font-semibold">{header}</h1>
				{enabled && !isLoading && (
					<p className="text-sm text-muted-foreground">
						{totalCount} {totalCount === 1 ? "produit trouvé" : "produits trouvés"}
					</p>
				)}
			</div>

			{!enabled && <EmptyState />}
			{enabled && isLoading && <SearchSkeleton />}
			{enabled && !isLoading && products.length === 0 && <EmptyResults query={query} />}
			{enabled && !isLoading && products.length > 0 && <SearchResults products={products} />}
		</section>
	);
}

function SearchSkeleton() {
	return (
		<div className="animate-pulse">
			<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{Array.from({ length: 6 }).map((_, i) => (
					<div key={i} className="overflow-hidden rounded-lg border border-border bg-card">
						<div className="aspect-square bg-muted" />
						<div className="p-4">
							<div className="mb-1 h-3 w-16 rounded bg-muted" />
							<div className="h-4 w-3/4 rounded bg-muted" />
							<div className="mt-2 h-4 w-20 rounded bg-muted" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

	function EmptyState() {
	return (
		<div className="flex flex-col items-center justify-center py-16 text-center">
			<div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
				<SearchIcon className="h-8 w-8 text-muted-foreground" />
			</div>
			<h2 className="text-xl font-semibold">Saisissez un terme de recherche</h2>
			<p className="mt-2 max-w-md text-muted-foreground">
				Commencez à taper ci-dessus pour rechercher des produits dans le catalogue.
			</p>
		</div>
	);
}

function EmptyResults({ query }: { query: string }) {
	return (
		<div className="flex flex-col items-center justify-center py-16 text-center">
			<div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
				<SearchIcon className="h-8 w-8 text-muted-foreground" />
			</div>
			<h2 className="text-xl font-semibold">Aucun résultat pour &quot;{query}&quot;</h2>
			<p className="mt-2 max-w-md text-muted-foreground">
				Nous n&apos;avons trouvé aucun produit correspondant à votre recherche. Essayez un autre terme ou parcourez le catalogue.
			</p>
			<div className="mt-8 flex flex-col gap-3 sm:flex-row">
				<Link
					href="/products"
					className="hover:bg-primary/90 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors"
				>
					Parcourir tous les produits
				</Link>
				<Link
					href="/"
					className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
				>
					Aller à l'accueil
				</Link>
			</div>
		</div>
	);
}
