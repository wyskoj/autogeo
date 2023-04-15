import {
	Avatar,
	Box,
	Button,
	DarkMode,
	Divider,
	Heading,
	HStack,
	IconButton,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Show,
	Spacer,
	useBreakpointValue,
	useColorMode,
} from '@chakra-ui/react';
import Link from 'next/link';
import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { MdHome, MdInfo, MdLogout, MdSettings } from 'react-icons/md';
import { motion } from 'framer-motion';
import Image from 'next/image';
import router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDefaultAuthState } from '../hooks/firebase';
import { getAuth } from 'firebase/auth';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';

interface HeaderProps {
	/** The current pathname. */
	pathname: string;
}

/**
 * The header of the website. It displays the logo and the navigation links.
 */
export default function Header({ pathname }: HeaderProps) {
	const { colorMode, toggleColorMode } = useColorMode();
	const router = useRouter();
	const breakpointHeight = useBreakpointValue({
		base: '4rem',
		xs: '4rem',
		sm: '4rem',
		md: '4rem',
	});
	const [height, setHeight] = useState(breakpointHeight);
	useEffect(() => {
		if (router.pathname === '/') {
			setHeight('0rem');
		} else {
			setHeight(breakpointHeight);
		}
	}, [router.pathname, breakpointHeight]);

	let content = (
		<>
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
		</>
	);

	return (
		<motion.div
			animate={{
				height: height,
			}}
			initial={{
				height: '0rem',
			}}
		>
			<Box
				h={'100%'}
				mb={4}
				bgColor={'brand.700'}
			>
				{pathname !== '/' && content}
			</Box>
		</motion.div>
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
	const { user } = useDefaultAuthState();

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
				<DarkMode>
					<Box
						pr={4}
						pt={0.25}
					>
						<Link href={'/'}>
							<Image
								src={'/logo_white.svg'}
								alt={'AutoGeo'}
								width={150}
								height={47}
							/>
						</Link>
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
				</DarkMode>
				{user ? (
					<Menu>
						<MenuButton>
							<Avatar
								size="sm"
								name={user.displayName ?? ''}
								src={user.photoURL ?? ''}
							/>
						</MenuButton>
						<MenuList>
							<Heading
								size={'md'}
								pb={'0.5rem'}
								textAlign={'center'}
							>
								{user?.displayName}
							</Heading>
							<Divider />
							<MenuItem
								icon={<MdSettings fontSize={'1.25rem'} />}
								onClick={() => {
									router.push('/settings');
								}}
							>
								Settings
							</MenuItem>
							<MenuItem
								icon={<MdLogout fontSize={'1.25rem'} />}
								onClick={() => {
									getAuth().signOut();
								}}
							>
								Logout
							</MenuItem>
						</MenuList>
					</Menu>
				) : (
					<Avatar size="sm" />
				)}
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
	const { colorMode, toggleColorMode } = useColorMode();
	const { user } = useDefaultAuthState();

	return (
		<>
			<HStack
				py={2}
				mx={4}
			>
				<Link href={'/'}>
					<Image
						src={'/logo_white.svg'}
						alt={'AutoGeo'}
						width={150}
						height={47}
					/>
				</Link>
				<Spacer />
				<Menu>
					<MenuButton
						as={IconButton}
						aria-label="Options"
						icon={<HamburgerIcon />}
					/>
					<MenuList>
						<MenuItem
							icon={<MdHome size={24} />}
							onClick={() => {
								router.push('/dashboard');
							}}
						>
							Dashboard
						</MenuItem>
						<MenuItem
							icon={<MdInfo size={24} />}
							onClick={() => {
								router.push('/about');
							}}
						>
							Info
						</MenuItem>
						<MenuItem
							icon={
								colorMode === 'light' ? (
									<IoMdMoon fontSize={24} />
								) : (
									<IoMdSunny fontSize={24} />
								)
							}
							onClick={toggleColorMode}
						>
							Toggle theme
						</MenuItem>
						<MenuDivider />
						<MenuItem
							icon={
								<Avatar
									size="sm"
									name={user?.displayName ?? ''}
									src={user?.photoURL ?? ''}
								/>
							}
							onClick={() => {
								if (user) {
									getAuth().signOut();
								}
								router.push('/login');
							}}
						>
							{user ? 'Logout' : 'Login'}
						</MenuItem>
					</MenuList>
				</Menu>
			</HStack>
		</>
	);
}
