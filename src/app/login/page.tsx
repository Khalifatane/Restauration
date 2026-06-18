export const metadata = {
	title: "Se connecter · Storefront",
	description: "L'accès au compte sera bientôt disponible.",
};

export default function Page() {
	return (
		<section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
			<h1 className="text-3xl font-semibold">Se connecter</h1>
			<p className="mt-4 text-muted-foreground">
				Les fonctionnalités de compte sont temporairement indisponibles pendant la finalisation de la migration. Veuillez revenir bientôt.
			</p>
		</section>
	);
}
