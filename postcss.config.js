module.exports = {
	plugins: [
		require("tailwindcss"),
		...(process.env.NODE_ENV === `production`
			? [
				require("@fullhuman/postcss-purgecss")({
					content: ["./src/pages/**/*.tsx", "./src/components/**/*.tsx"],
					defaultExtractor: content =>
						content.match(/[A-Za-z0-9-_:/]+/g) || []
				}),
				require("autoprefixer"),
				require("cssnano")
			]
			: [])
	]
};
