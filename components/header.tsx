import {
	Button,
	Flex,
	HStack,
	IconButton,
	Show,
	useColorMode,
	VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { MdHome, MdInfo } from 'react-icons/md';
import SurveyTexpert from './surveytexpert';

/**
 * The header of the website. It displays the logo and the navigation links.
 */
export default function Header() {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<>
			<Show above="md">
				<WideHeader
					colorMode={colorMode}
					onClick={toggleColorMode}
				/>
			</Show>
			<Show below="md">
				<NarrowHeader
					colorMode={colorMode}
					onClick={toggleColorMode}
				/>
			</Show>
		</>
	);
}

/**
 * A header for large screens. It displays the logo and the navigation links.
 *
 * @param props.colorMode The current color mode.
 * @param props.onClick A function to call when the color mode button is pressed.
 */
function WideHeader(props: {
	colorMode: 'light' | 'dark';
	onClick: () => void;
}) {
	return (
		<Flex
			justify={'center'}
			py={4}
		>
			<HStack
				width={'100%'}
				align={'center'}
				px={4}
				spacing={8}
			>
				<SurveyTexpert size={'2xl'} />
				<HStack>
					<Link
						href={'/dashboard'}
						passHref
					>
						<Button>Dashboard</Button>
					</Link>
					<Link
						href={'/about'}
						passHref
					>
						<Button>About</Button>
					</Link>
					<IconButton
						aria-label={'Toggle color mode'}
						icon={props.colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
						onClick={props.onClick}
					/>
				</HStack>
			</HStack>
		</Flex>
	);
}

/**
 * A header for small screens. It displays the logo and the navigation links.
 *
 * @param props.colorMode The current color mode.
 * @param props.onClick A function to call when the color mode button is pressed.
 */
function NarrowHeader(props: {
	colorMode: 'light' | 'dark';
	onClick: () => void;
}) {
	return (
		<VStack py={4}>
			<SurveyTexpert size={'2xl'} />
			<HStack>
				<Link
					href={'/dashboard'}
					passHref
				>
					<IconButton
						aria-label={'Dashboard'}
						size="lg"
						fontSize="1.5em"
						icon={<MdHome />}
					/>
				</Link>
				<Link
					href={'/about'}
					passHref
				>
					<IconButton
						aria-label={'About'}
						fontSize="1.5em"
						size="lg"
						icon={<MdInfo />}
					/>
				</Link>
				<Link
					href={'/dashboard'}
					passHref
				>
					<IconButton
						aria-label={'Toggle color mode'}
						fontSize="1.5em"
						size="lg"
						icon={props.colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
						onClick={props.onClick}
					/>
				</Link>
			</HStack>
		</VStack>
	);
}
