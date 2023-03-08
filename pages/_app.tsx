import '../styles/globals.css';
import '../styles/transition.css';
import 'katex/dist/katex.min.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
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
import Scrollbars from 'react-custom-scrollbars-2';
import 'nprogress/nprogress.css';

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
					<Scrollbars
						style={{ width: '100vw', height: '100vh' }}
						universal={true}
						autoHide={true}
					>
						<Header pathname={router.pathname} />
						<AnimatePresence onExitComplete={() => window.scrollTo(0, 0)}>
							<Transition>
								<Component {...pageProps} />
							</Transition>
						</AnimatePresence>
					</Scrollbars>
				</>
			</DevSupport>
		</ChakraProvider>
	);
}

export default MyApp;
