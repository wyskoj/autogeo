import {
	Button,
	Flex,
	Heading,
	HStack,
	IconButton,
	Show,
	Spacer,
	useColorMode,
} from '@chakra-ui/react';
import Link from 'next/link';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { MdHome, MdInfo } from 'react-icons/md';
import SurveyTexpert from './surveytexpert';

export default function Header() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<>
			<Show above="sm">
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
								icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
								onClick={toggleColorMode}
							/>
						</HStack>
					</HStack>
				</Flex>
			</Show>
			<Show below="sm">
				<Flex
					justify={'center'}
					align={'baseline'}
					py={4}
					mx={4}
				>
					<SurveyTexpert size={'2xl'} />
					<Spacer />
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
								icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
								onClick={toggleColorMode}
							/>
						</Link>
					</HStack>
				</Flex>
			</Show>
		</>
	);
}
