import Link from "next/link";
import { CopyrightText } from "./copyright-text";
import { Logo } from "./shared/logo";

const footerLinks = {
	support: [
		{ label: "Contactez-nous", href: "/contact" },
		{ label: "FAQ", href: "/faq" },
		{ label: "Livraison", href: "/shipping" },
		{ label: "Retours", href: "/returns" },
	],
	company: [
		{ label: "À propos", href: "/about" },
	],
};

export async function Footer() {
	return (
		<footer className="bg-foreground text-background">
			<div className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 sm:pb-12 lg:px-8 lg:py-16">
				<div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
					<div className="col-span-2 md:col-span-1">
						<Link href="/" className="mb-4 inline-block">
							<Logo className="h-7 w-auto" inverted />
						</Link>
						<p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-400">
							Design minimal, impact maximal. Essentiels conçus avec soin pour le confort quotidien.
						</p>
					</div>

					<div>
						<h4 className="mb-4 text-sm font-medium text-neutral-300">Assistance</h4>
						<ul className="space-y-3">
							{footerLinks.support.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-sm text-neutral-400 transition-colors hover:text-neutral-200"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h4 className="mb-4 text-sm font-medium text-neutral-300">Entreprise</h4>
						<ul className="space-y-3">
							{footerLinks.company.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-sm text-neutral-400 transition-colors hover:text-neutral-200"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-8 sm:flex-row">
					<p className="text-xs text-neutral-500">
						<CopyrightText />
					</p>
					<div className="flex items-center gap-6">
						<Link href="/privacy" className="text-xs text-neutral-500 transition-colors hover:text-neutral-300">
							Politique de confidentialité
						</Link>
						<Link href="/terms" className="text-xs text-neutral-500 transition-colors hover:text-neutral-300">
							Conditions d'utilisation
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
