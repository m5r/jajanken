import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

export const pageTitle = "Jajanken";
const defaultDescription = "Multilayer perceptron vs humanity (at rock paper scissors)";
const defaultOGURL = "https://www.jajanken.app/";
const defaultOGImage = "";

class NextDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		try {
			const FontFace = (window as any).FontFace;
			new FontFace("Munro Small", "url('/static/fonts/munro-small.woff2') format('woff2')", {}).load();
		} catch {

		}

		return (
			<Html lang="en" className="jjk-app-layout">
				<Head>
					<meta charSet="UTF-8" />
					<meta name="description" content={defaultDescription} />
					<link rel="manifest" href="/manifest.json" />
					<meta name="theme-color" content="#51096B" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />

					<link rel="apple-touch-icon" sizes="180x180" href="/static/icons/apple-icon-180.png" />
					<link rel="apple-touch-icon" sizes="167x167" href="/static/icons/apple-icon-167.png" />
					<link rel="apple-touch-icon" sizes="152x152" href="/static/icons/apple-icon-152.png" />
					<link rel="apple-touch-icon" sizes="120x120" href="/static/icons/apple-icon-120.png" />

					<meta name="apple-mobile-web-app-capable" content="yes" />

					<link
						rel="apple-touch-startup-image"
						href="/static/icons/apple-splash-2048-2732.png"
						media="(device-width: 1024px) and (device-height: 1366px) and (-
webkit-device-pixel-ratio: 2) and (orientation: portrait)"
					/>
					<link
						rel="apple-touch-startup-image"
						href="/static/icons/apple-splash-1668-2388.png"
						media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
					/>
					<link
						rel="apple-touch-startup-image"
						href="/static/icons/apple-splash-1668-2224.png"
						media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
					/>
					<link
						rel="apple-touch-startup-image"
						href="/static/icons/apple-splash-1536-2048.png"
						media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
					/>
					<link
						rel="apple-touch-startup-image"
						href="/static/icons/apple-splash-1242-2688.png"
						media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
					/>
					<link
						rel="apple-touch-startup-image"
						href="/static/icons/apple-splash-1125-2436.png"
						media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
					/>
					<link
						rel="apple-touch-startup-image"
						href="/static/icons/apple-splash-828-1792.png"
						media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
					/>
					<link
						rel="apple-touch-startup-image"
						href="/static/icons/apple-splash-1242-2208.png"
						media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
					/>
					<link
						rel="apple-touch-startup-image"
						href="/static/icons/apple-splash-750-1334.png"
						media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
					/>
					<link
						rel="apple-touch-startup-image"
						href="/static/icons/apple-splash-640-1136.png"
						media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
					/>


					<link rel="icon" type="image/png" sizes="32x32" href="/static/icons/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/static/icons/favicon-16x16.png" />
					<link rel="mask-icon" href="/static/icons/safari-pinned-tab.svg" color="#5bbad5" />
					<link rel="shortcut icon" href="/static/icons/favicon.ico" />

					<link
						rel="preload"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
						href="/static/fonts/munro-small.woff2"
					/>
					<link
						rel="preload"
						as="font"
						type="font/woff"
						crossOrigin="anonymous"
						href="/static/fonts/munro-small.woff"
					/>

					<meta property="og:url" content={defaultOGURL} />
					<meta property="og:title" content={pageTitle} />
					<meta property="og:description" content={defaultDescription} />

					<meta name="twitter:site" content={defaultOGURL} />
					<meta name="twitter:card" content="summary_large_image" />
					<meta name="twitter:image" content={defaultOGImage} />

					<meta property="og:image" content={defaultOGImage} />
					<meta property="og:image:width" content="1200" />
					<meta property="og:image:height" content="630" />
				</Head>
				<body className="jjk-app-layout text-white">
				<Main />
				<NextScript />
				</body>
			</Html>
		);
	}
}

export default NextDocument;