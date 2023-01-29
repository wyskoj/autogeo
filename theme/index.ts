import {extendTheme} from '@chakra-ui/react'
import fonts from "./fonts";

const overrides = {
    fonts,
    config: {
        initialColorMode: 'dark'
    }
}

const theme = extendTheme(overrides);
export default theme