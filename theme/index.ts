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
		Radio: {
			baseStyle: {
				transitionProperty: 'all',
				transitionDuration: '0.2s',
				transitionTimingFunction: 'ease-in-out',
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
