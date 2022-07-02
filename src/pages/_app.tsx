import { useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import * as Fathom from "fathom-client";

import { pageTitle } from "./_document";

import "../tailwind.css";

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();

	useEffect(() => {
		Fathom.load("BKQESIFT", {
			url: "https://laugh-piano.jajanken.app/script.js",
			includedDomains: ["www.jajanken.app"],
		});

		function onRouteChangeComplete() {
			Fathom.trackPageview();
		}
		router.events.on("routeChangeComplete", onRouteChangeComplete);

		return () => {
			router.events.off("routeChangeComplete", onRouteChangeComplete);
		};
	}, []);

	return (
		<>
			<Head>
				<title>{pageTitle}</title>
			</Head>
			<Component {...pageProps} />
		</>
	);
};
