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

		const isProduction = process.env.NODE_ENV === "production";

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

					<link rel="preconnect" crossOrigin="anonymous" href="https://analytics.mokhtar.dev" />
				</Head>
				<body className="jjk-app-layout text-white">
				<Main />
				<NextScript />
				<script
					dangerouslySetInnerHTML={{
						// Modernizr for touchevents and webp
						__html: `!function(e,n,t){function o(e,n){return typeof e===n}function A(){var e,n,t,A,a,i,s;for(var r in u)if(u.hasOwnProperty(r)){if(e=[],n=u[r],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(A=o(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],s=i.split("."),1===s.length?Modernizr[s[0]]=A:(!Modernizr[s[0]]||Modernizr[s[0]]instanceof Boolean||(Modernizr[s[0]]=new Boolean(Modernizr[s[0]])),Modernizr[s[0]][s[1]]=A),f.push((A?"":"no-")+s.join("-"))}}function a(e){var n=p.className,t=Modernizr._config.classPrefix||"";if(h&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\\\s)"+t+"no-js(\\\\s|$)");n=n.replace(o,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),h?p.className.baseVal=n:p.className=n)}function i(e,n){if("object"==typeof e)for(var t in e)d(e,t)&&i(t,e[t]);else{e=e.toLowerCase();var o=e.split("."),A=Modernizr[o[0]];if(2==o.length&&(A=A[o[1]]),"undefined"!=typeof A)return Modernizr;n="function"==typeof n?n():n,1==o.length?Modernizr[o[0]]=n:(!Modernizr[o[0]]||Modernizr[o[0]]instanceof Boolean||(Modernizr[o[0]]=new Boolean(Modernizr[o[0]])),Modernizr[o[0]][o[1]]=n),a([(n&&0!=n?"":"no-")+o.join("-")]),Modernizr._trigger(e,n)}return Modernizr}function s(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):h?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function r(){var e=n.body;return e||(e=s(h?"svg":"body"),e.fake=!0),e}function l(e,t,o,A){var a,i,l,f,u="modernizr",c=s("div"),d=r();if(parseInt(o,10))for(;o--;)l=s("div"),l.id=A?A[o]:u+(o+1),c.appendChild(l);return a=s("style"),a.type="text/css",a.id="s"+u,(d.fake?d:c).appendChild(a),d.appendChild(c),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(n.createTextNode(e)),c.id=u,d.fake&&(d.style.background="",d.style.overflow="hidden",f=p.style.overflow,p.style.overflow="hidden",p.appendChild(d)),i=t(c,e),d.fake?(d.parentNode.removeChild(d),p.style.overflow=f,p.offsetHeight):c.parentNode.removeChild(c),!!i}var f=[],u=[],c={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){u.push({name:e,fn:n,options:t})},addAsyncTest:function(e){u.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=c,Modernizr=new Modernizr;var d,p=n.documentElement,h="svg"===p.nodeName.toLowerCase();!function(){var e={}.hasOwnProperty;d=o(e,"undefined")||o(e.call,"undefined")?function(e,n){return n in e&&o(e.constructor.prototype[n],"undefined")}:function(n,t){return e.call(n,t)}}(),c._l={},c.on=function(e,n){this._l[e]||(this._l[e]=[]),this._l[e].push(n),Modernizr.hasOwnProperty(e)&&setTimeout(function(){Modernizr._trigger(e,Modernizr[e])},0)},c._trigger=function(e,n){if(this._l[e]){var t=this._l[e];setTimeout(function(){var e,o;for(e=0;e<t.length;e++)(o=t[e])(n)},0),delete this._l[e]}},Modernizr._q.push(function(){c.addTest=i}),Modernizr.addAsyncTest(function(){function e(e,n,t){function o(n){var o=n&&"load"===n.type?1==A.width:!1,a="webp"===e;i(e,a&&o?new Boolean(o):o),t&&t(n)}var A=new Image;A.onerror=o,A.onload=o,A.src=n}var n=[{uri:"data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=",name:"webp"},{uri:"data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==",name:"webp.alpha"},{uri:"data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",name:"webp.animation"},{uri:"data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=",name:"webp.lossless"}],t=n.shift();e(t.name,t.uri,function(t){if(t&&"load"===t.type)for(var o=0;o<n.length;o++)e(n[o].name,n[o].uri)})});var m=c._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];c._prefixes=m;var g=c.testStyles=l;Modernizr.addTest("touchevents",function(){var t;if("ontouchstart"in e||e.DocumentTouch&&n instanceof DocumentTouch)t=!0;else{var o=["@media (",m.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");g(o,function(e){t=9===e.offsetTop})}return t}),A(),a(f),delete c.addTest,delete c.addAsyncTest;for(var v=0;v<Modernizr._q.length;v++)Modernizr._q[v]();e.Modernizr=Modernizr}(window,document);`,
					}}
				/>
				{
					isProduction && (
						<>
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
							<script async defer src="https://sa.jajanken.app/app.js" />
							<noscript><img src="https://sa.jajanken.app/image.gif" alt="" /></noscript>
						</>
					)
				}
				</body>
			</Html>
		);
	}
}

export default NextDocument;