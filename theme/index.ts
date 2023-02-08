import { extendTheme } from '@chakra-ui/react';
import fonts from './fonts';

const overrides = {
	fonts,
	config: {
		initialColorMode: 'dark',
		disableTransitionOnChange: false,
	},
	components: {
		FormLabel: {
			baseStyle: {
				fontSize: 18,
				fontWeight: 600,
			},
		},
		Code: {
			baseStyle: {
				fontSize: 14,
				fontFamily: '"Roboto Mono", monospace',
			},
		},
	},
	styles: {
		global: {
			body: {
				transitionProperty: 'all',
				transitionDuration: 'normal',
			},
		},
	},
};

const theme = extendTheme(overrides);
export default theme;
