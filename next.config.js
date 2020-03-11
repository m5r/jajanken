const withOffline = require("next-offline");
const withWorkers = require('@zeit/next-workers');
const BundleAnalyzerPlugin = require("@bundle-analyzer/webpack-plugin");
require("dotenv").config();

module.exports = withWorkers(withOffline({
	experimental: {
		modern: true,
	},
	webpack(config) {
		if (process.env.BUNDLE_ANALYZER_TOKEN) {
			config.plugins.push(
				new BundleAnalyzerPlugin({ token: process.env.BUNDLE_ANALYZER_TOKEN }),
			);
		}

		const splitChunks = config.optimization && config.optimization.splitChunks;
		if (splitChunks) {
			const cacheGroups = splitChunks.cacheGroups;
			const preactModules = /[\\/]node_modules[\\/](preact|preact-render-to-string|preact-context-provider)[\\/]/;
			if (cacheGroups.framework) {
				cacheGroups.preact = Object.assign({}, cacheGroups.framework, {
					test: preactModules,
				});
				cacheGroups.commons.name = "framework";
			} else {
				cacheGroups.preact = {
					name: "commons",
					chunks: "all",
					test: preactModules,
				};
			}
		}

		config.module.rules.push({
			test: /\.b64$/i,
			use: [
				{
					loader: "raw-loader",
					options: {
						esModule: false,
					},
				},
			],
		});

		return config;
	},
	transformManifest: manifest => ["/"].concat(manifest), // add the homepage to the cache
	workboxOpts: {
		swDest: "static/service-worker.js",
	},
}));
