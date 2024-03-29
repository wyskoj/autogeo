import '../styles/globals.css';
import 'katex/dist/katex.min.css';
import type { AppProps } from 'next/app';
import { ChakraProvider, Heading } from '@chakra-ui/react';
import theme from '../theme';
import '@fontsource/roboto-mono/400.css';
import '@fontsource/inter/200.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/800.css';
import '@fontsource/sora/200.css';
import '@fontsource/sora/400.css';
import '@fontsource/sora/600.css';
import '@fontsource/sora/800.css';
import { AnimatePresence } from 'framer-motion';
import Header from '../components/header';
import React from 'react';
import { Transition } from '../components/transition';
import { Router, useRouter } from 'next/router';
import NProgress from 'nprogress';
import Scrollbars from 'react-custom-scrollbars-2';
import 'nprogress/nprogress.css';
import { initializeFirebase } from '../utils/firebase';
import { useDefaultAuthState } from '../hooks/firebase';
import { MDXProvider } from '@mdx-js/react';
import { MDXComponents } from 'mdx/types';
import Head from 'next/head';

NProgress.configure({
	minimum: 0.3,
	easing: 'ease',
	speed: 200,
	showSpinner: true,
	trickleSpeed: 1000,
	parent: '#__main_container',
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

initializeFirebase();

const markdownComponents: MDXComponents = {
	h1: props => (
		<Heading
			as="h1"
			size="2xl"
			{...props}
		/>
	),
	h2: props => (
		<Heading
			as="h2"
			size="xl"
			{...props}
		/>
	),
	h3: props => (
		<Heading
			as="h3"
			size="lg"
			{...props}
		/>
	),
	h4: props => (
		<Heading
			as="h4"
			size="md"
			{...props}
		/>
	),
	h5: props => (
		<Heading
			as="h5"
			size="sm"
			{...props}
		/>
	),
	h6: props => (
		<Heading
			as="h6"
			size="xs"
			{...props}
		/>
	),
};

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const { user, loading } = useDefaultAuthState();

	// USE AUTHENTICATED ROUTE
	if (
		(router.pathname === '/dashboard' ||
			router.pathname.includes('operations')) &&
		!user &&
		!loading
	) {
		router.push('/login');
	}

	return (
		<ChakraProvider theme={theme}>
			<MDXProvider components={markdownComponents}>
				<Scrollbars
					style={{ width: '100%', height: '100%' }}
					universal={true}
					autoHide={true}
				>
					<Header pathname={router.pathname} />
					<div id={'__main_container'}>
						<AnimatePresence onExitComplete={() => window.scrollTo(0, 0)}>
							<Transition>
								<>
									<Head>
										<title>AutoGeo</title>
									</Head>
									<Component {...pageProps} />
								</>
							</Transition>
						</AnimatePresence>
					</div>
				</Scrollbars>
			</MDXProvider>
		</ChakraProvider>
	);
}

export default MyApp;
