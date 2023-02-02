import '../styles/globals.css';
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

TimeAgo.addDefaultLocale(en);
export const timeAgo = new TimeAgo('en-US');

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<DevSupport
				ComponentPreviews={ComponentPreviews}
				useInitialHook={useInitial}
			>
				<>
					<Component {...pageProps} />
				</>
			</DevSupport>
		</ChakraProvider>
	);
}

export default MyApp;
