import { extendTheme } from '@chakra-ui/react';
import fonts from './fonts';

const overrides = {
	fonts,
	config: {
		initialColorMode: 'dark'
	},
	components: {
		FormLabel: {
			baseStyle: {
				fontSize: 18,
				fontWeight: 600
			}
		}
	}
};

const theme = extendTheme(overrides);
export default theme;