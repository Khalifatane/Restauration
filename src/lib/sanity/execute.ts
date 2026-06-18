import { sanityClient } from "./client";
import type { SanityResult } from "./result";

export async function executeSanityQuery<T>(
	query: string,
	params?: Record<string, unknown>,
): Promise<SanityResult<T>> {
	try {
		const data = params
			? await sanityClient.fetch<T>(query, params)
			: await sanityClient.fetch<T>(query);
		return { ok: true, data };
	} catch (error) {
		const message = error instanceof Error ? error.message : "Sanity query failed";

		return {
			ok: false,
			error: {
				type: "sanity",
				message,
				isRetryable: false,
				cause: error,
			},
		};
	}
}
