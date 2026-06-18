/**
 * Locale settings for display formatting.
 */

export const localeConfig = {
	/** Locale for Intl APIs (number/date formatting) - BCP 47 format */
	default: "fr-SN",

	/** Language code for GraphQL APIs (if needed) */
	graphqlLanguageCode: "FR_SN" as const,

	/** HTML lang attribute */
	htmlLang: "fr",

	/** Open Graph locale */
	ogLocale: "fr_SN",

	/** Available locales (for future i18n) */
	available: ["fr-SN"] as const,

	/** Fallback currency - used when API data is missing. */
	fallbackCurrency: "XOF",
} as const;

/**
 * Format a price with the configured locale.
 */
export function formatPrice(amount: number, currency: string): string {
	return new Intl.NumberFormat(localeConfig.default, {
		style: "currency",
		currency: currency,
	}).format(amount);
}

/**
 * Format a date with the configured locale.
 */
export function formatDate(date: Date | number, options?: Intl.DateTimeFormatOptions): string {
	return new Intl.DateTimeFormat(localeConfig.default, {
		dateStyle: "medium",
		...options,
	}).format(date);
}

/**
 * Format a number with the configured locale.
 */
export function formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
	return new Intl.NumberFormat(localeConfig.default, options).format(value);
}
