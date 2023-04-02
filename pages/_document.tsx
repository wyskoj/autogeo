import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';
import theme from '../theme';

export default class Document extends NextDocument {
	render() {
		return (
			<Html lang="en">
				<Head>
					<title>AutoGeo</title>
					<meta
						name={'description'}
						content={'The complete geospatial toolbox.'}
					/>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/apple-touch-icon.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/favicon-16x16.png"
					/>
					<link
						rel="manifest"
						href="/site.webmanifest"
					/>
					<link
						rel="mask-icon"
						href="/safari-pinned-tab.svg"
						color="#008038"
					/>
					<meta
						name="apple-mobile-web-app-title"
						content="AutoGeo"
					/>
					<meta
						name="application-name"
						content="AutoGeo"
					/>
					<meta
						name="theme-color"
						content="#ffffff"
					/>
				</Head>
				<body
					style={{
						overflow: 'auto !important',
						marginRight: '0 !important',
					}}
				>
					<ColorModeScript initialColorMode={theme.config.initialColorMode} />
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
