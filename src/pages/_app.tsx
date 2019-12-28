import App from "next/app";
import Head from "next/head";

import { pageTitle } from "./_document";

import "../tailwind.css";

class NextApp extends App {
	public render() {
		const { Component, pageProps } = this.props;
		const isProduction = process.env.NODE_ENV === "production";

		return (
			<>
				<Head>
					<title>{pageTitle}</title>
					{
						isProduction && (
							<script dangerouslySetInnerHTML={{
								__html: `(function(f, a, t, h, o, m){
									a[h]=a[h]||function(){
										(a[h].q=a[h].q||[]).push(arguments)
									};
									o=f.createElement('script'),
									m=f.getElementsByTagName('script')[0];
									o.async=1; o.src=t; o.id='fathom-script';
									m.parentNode.insertBefore(o,m)
								})(document, window, '//analytics.mokhtar.dev/tracker.js', 'fathom');
								fathom('set', 'siteId', 'VSFVE');
								fathom('trackPageview');`,
							}} />
						)
					}
				</Head>
				<Component {...pageProps} />
			</>
		);
	}
}

export default NextApp;
