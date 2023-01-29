import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider, Container } from '@chakra-ui/react';
import theme from '../theme';
import '@fontsource/inter/200.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/800.css';
import { DevSupport } from '@react-buddy/ide-toolbox';
import { ComponentPreviews, useInitial } from '../dev';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<Container
				maxWidth={'container.lg'}
				mt={4}
			>
				<DevSupport
					ComponentPreviews={ComponentPreviews}
					useInitialHook={useInitial}
				>
					<Component {...pageProps} />
				</DevSupport>
			</Container>
		</ChakraProvider>
	);
}

export default MyApp;
