import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Suspense, type ReactNode } from "react";
import { rootMetadata } from "@/lib/seo";
import { localeConfig } from "@/config/locale";
import { Providers } from "@/ui/components/providers";
import { Header } from "@/ui/components/header";
import { Footer } from "@/ui/components/footer";
import { CartDrawerWrapper } from "@/ui/components/cart";

/**
 * Root metadata for the entire site.
 * Configuration is in src/lib/seo/config.ts
 */
export const metadata = rootMetadata;

export default function RootLayout(props: { children: ReactNode }) {
	const { children } = props;

	return (
		<html lang={localeConfig.htmlLang} className={`${GeistSans.variable} ${GeistMono.variable} min-h-dvh`}>
			<body className="min-h-dvh font-sans">
				<Suspense fallback={<div className="min-h-dvh" />}>
					<Providers>
						<Header />
						{children}
						<Footer />
						<CartDrawerWrapper />
					</Providers>
				</Suspense>
			</body>
		</html>
	);
}
