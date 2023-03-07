import { extendTheme } from '@chakra-ui/react';
import fonts from './fonts';

const overrides = {
	colors: {
		brand: {
			50: '#dcffee',
			100: '#afffd3',
			200: '#7effb7',
			300: '#4dff9c',
			400: '#21ff81',
			500: '#0de667',
			600: '#00b34f',
			700: '#008038',
			800: '#004d20',
			900: '#001c06',
		},
	},
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
