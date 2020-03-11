let plugins = [
	"tailwindcss",
	"postcss-preset-env",
];

if (process.env.NODE_ENV === "production") {
	plugins.push([
		"@fullhuman/postcss-purgecss",
		{
			content: [
				"./src/pages/**/*.{js,jsx,ts,tsx}",
				"./src/components/**/*.{js,jsx,ts,tsx}",
			],
			defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
		},
	]);
}

module.exports = { plugins };
