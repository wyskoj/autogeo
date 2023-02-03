import {
	Button,
	Flex,
	Heading,
	HStack,
	IconButton,
	Spacer,
	useColorMode,
} from '@chakra-ui/react';
import Link from 'next/link';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function Header() {
	const { colorMode, toggleColorMode } = useColorMode();

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
				<Heading
					as="h1"
					size="1xl"
					noOfLines={1}
					py={2}
				>
					SurveyTexpert
				</Heading>
				<Link
					href={'/dashboard'}
					passHref
				>
					<Button>Dashboard</Button>
				</Link>
				<Spacer />
				<IconButton
					aria-label={'Toggle color mode'}
					icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
					onClick={toggleColorMode}
				/>
			</HStack>
		</Flex>
	);
}
