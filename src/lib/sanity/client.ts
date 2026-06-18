import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

function getClient() {
	if (!projectId || !dataset) {
		const missing = [
			!projectId && "NEXT_PUBLIC_SANITY_PROJECT_ID",
			!dataset && "NEXT_PUBLIC_SANITY_DATASET",
		].filter(Boolean);
		throw new Error(
			`Missing required environment variable(s): ${missing.join(", ")}. ` +
			`Set them in your environment (Vercel dashboard or .env).`,
		);
	}
	return createClient({
		projectId,
		dataset,
		apiVersion: "2024-03-19",
		useCdn: process.env.NODE_ENV === "production",
	});
}

// Proxy that validates env vars lazily on first fetch instead of at module load
export const sanityClient = new Proxy({} as ReturnType<typeof getClient>, {
	get(_, prop: string | symbol) {
		const client = getClient();
		const value = client[prop as keyof typeof client];
		if (typeof value === "function") {
			return value.bind(client);
		}
		return value;
	},
});

