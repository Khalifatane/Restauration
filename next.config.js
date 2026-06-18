/** @type {import('next').NextConfig} */
const forbiddenPublicEnvKeys = ["NEXT_PUBLIC_STRIPE_SECRET_KEY", "NEXT_PUBLIC_SANITY_TOKEN"];
const configuredForbiddenPublicKeys = forbiddenPublicEnvKeys.filter((key) => {
	const value = process.env[key];
	return typeof value === "string" && value.trim().length > 0;
});

if (configuredForbiddenPublicKeys.length > 0) {
	throw new Error(
		`Refusing to start: move secret env vars out of NEXT_PUBLIC_. Invalid keys: ${configuredForbiddenPublicKeys.join(", ")}`,
	);
}

const config = {
	// Cache Components (Partial Prerendering) are not compatible with static export.
	cacheComponents: false,

	// Optimize barrel file imports for better bundle size and cold start performance
	// See: https://vercel.com/blog/how-we-optimized-package-imports-in-next-js
	experimental: {
		optimizePackageImports: ["lucide-react", "lodash-es"],
	},
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				// Sanity CDN
				hostname: "cdn.sanity.io",
			},
			{
				// Allow all hostnames in development (restrict in production)
				hostname: "*",
			},
		],
	},
	typedRoutes: false,

	// Used in the Dockerfile
	output: "export",
	distDir: "dist",

	// Logging configuration
	logging: {
		fetches: {
			fullUrl: process.env.NODE_ENV === "development",
		},
	},
};

export default config;
