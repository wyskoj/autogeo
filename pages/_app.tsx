import '../styles/globals.css';
import '../styles/transition.css';
import 'katex/dist/katex.min.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import '@fontsource/inter/200.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/800.css';
import { DevSupport } from '@react-buddy/ide-toolbox';
import { ComponentPreviews, useInitial } from '../dev';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import { AnimatePresence } from 'framer-motion';
import Header from '../components/header';
import React from 'react';
import { Transition } from '../components/transition';
import { Router, useRouter } from 'next/router';
import NProgress from 'nprogress';

TimeAgo.addDefaultLocale(en);
export const timeAgo = new TimeAgo('en-US');

NProgress.configure({
	minimum: 0.3,
	easing: 'ease',
	speed: 200,
	showSpinner: true,
	trickleSpeed: 1000,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();

	return (
		<ChakraProvider theme={theme}>
			<DevSupport
				ComponentPreviews={ComponentPreviews}
				useInitialHook={useInitial}
			>
				<>
					{router.pathname !== '/' && <Header />}
					<AnimatePresence
						initial={false}
						onExitComplete={() => window.scrollTo(0, 0)}
					>
						<Transition>
							<Component {...pageProps} />
						</Transition>
					</AnimatePresence>
				</>
			</DevSupport>
		</ChakraProvider>
	);
}

export default MyApp;
