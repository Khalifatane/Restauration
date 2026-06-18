/**
 * Brand Configuration
 *
 * Centralized branding settings for the storefront.
 */

export const brandConfig = {
	/** Site name used in titles, metadata, and headers */
	siteName: "Storefront",

	/** Legal entity name for copyright notices */
	copyrightHolder: "Storefront",

	/** Organization name for structured data (JSON-LD) */
	organizationName: "Storefront",

	/** Default brand name for products without a brand */
	defaultBrand: "Storefront",

	/** Tagline/description for the store */
	tagline: "Produits de qualité supérieure. Découvrez notre sélection soignée.",

	/** Homepage meta description */
	description: "Une vitrine moderne propulsée par Sanity.",

	/** Logo aria-label for accessibility */
	logoAriaLabel: "Storefront",

	/** Title template - %s will be replaced with page title */
	titleTemplate: "%s | Storefront",

	/** Social media handles */
	social: {
		/** Twitter/X handle (without @) - set to null to disable */
		twitter: null as string | null,
		/** Instagram handle (without @) - set to null to disable */
		instagram: null as string | null,
		/** Facebook page URL - set to null to disable */
		facebook: null as string | null,
	},
} as const;

/**
 * Helper to format page title using brand template.
 */
export function formatPageTitle(title: string): string {
	return brandConfig.titleTemplate.replace("%s", title);
}

/**
 * Get copyright text with specified year.
 * Use CopyrightText component for dynamic year in Server Components.
 */
const DEFAULT_COPYRIGHT_YEAR = Number(process.env.COPYRIGHT_YEAR) || 2026;

export function getCopyrightText(year: number = DEFAULT_COPYRIGHT_YEAR): string {
	return `(c) ${year} ${brandConfig.copyrightHolder}. Tous droits réservés.`;
}
