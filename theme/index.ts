import { extendTheme } from '@chakra-ui/react';
import fonts from './fonts';
import components from './components';
import colors from './colors';
import config from './config';
import styles from './styles';

const overrides = {
	colors,
	fonts,
	config,
	components,
	styles,
};

const theme = extendTheme(overrides);
export default theme;
