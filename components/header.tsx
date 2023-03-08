import {
	Avatar,
	Box,
	Button,
	DarkMode,
	HStack,
	IconButton,
	Show,
	Spacer,
	useBreakpointValue,
	useColorMode,
	VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { MdHome, MdInfo } from 'react-icons/md';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface HeaderProps {
	pathname: string;
}

/**
 * The header of the website. It displays the logo and the navigation links.
 */
export default function Header({ pathname }: HeaderProps) {
	const { colorMode, toggleColorMode } = useColorMode();
	const height = useBreakpointValue({ base: '6rem', sm: '8rem', md: '4rem' });
	let content = (
		<motion.div
			animate={{
				x: [50, 0],
				opacity: [0, 1],
			}}
			initial={{ opacity: 0 }}
		>
			<Show above="md">
				<WideHeader
					colorMode={colorMode}
					onClick={toggleColorMode}
					pathname={pathname}
				/>
			</Show>
			<Show below="md">
				<NarrowHeader
					colorMode={colorMode}
					onClick={toggleColorMode}
				/>
			</Show>
		</motion.div>
	);
	return (
		<DarkMode>
			<Box
				h={height}
				mb={4}
				bgColor={'brand.700'}
			>
				{pathname !== '/' && content}
			</Box>
		</DarkMode>
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
	pathname: string;
}) {
	return (
		<Box
			py={2}
			maxW={'container.lg'}
			m={'auto'}
			px={4}
		>
			<HStack
				width={'100%'}
				spacing={4}
			>
				<Box
					pr={4}
					pt={0.25}
				>
					<Image
						src={'/logo_white.svg'}
						alt={'AutoGeo'}
						width={150}
						height={47}
					/>
				</Box>
				<Link
					href={'/dashboard'}
					passHref
				>
					<Button
						variant={props.pathname === '/dashboard' ? 'solid' : 'ghost'}
						color={'white'}
					>
						Dashboard
					</Button>
				</Link>
				<Link
					href={'/about'}
					passHref
				>
					<Button
						variant={props.pathname === '/about' ? 'solid' : 'ghost'}
						color={'white'}
					>
						About
					</Button>
				</Link>
				<Spacer />
				<IconButton
					aria-label={'Toggle color mode'}
					icon={props.colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
					onClick={props.onClick}
					variant={'ghost'}
				/>
				<Avatar size="sm"></Avatar>
			</HStack>
		</Box>
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
			<Image
				src={'/logo.svg'}
				alt={'AutoGeo'}
				width={150}
				height={0}
			/>
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
