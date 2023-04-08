import { Box, Link, Text } from '@chakra-ui/react';

export default function Footer() {
	return (
		<Box
			bgColor={'gray.700'}
			color={'gray.200'}
			textAlign={'center'}
			py={4}
			px={4}
		>
			<Text
				maxW={'30rem'}
				mx={'auto'}
			>
				Copyright &copy; MMXXIII{' '}
				<Link
					href={'https://wysko.org'}
					isExternal={true}
					color="teal.500"
				>
					Jacob Wysko
				</Link>
				.
				<br />
				AutoGeo is released under the{' '}
				<Link
					href={'https://www.gnu.org/licenses/gpl.html'}
					isExternal={true}
					color="teal.500"
				>
					GNU General Public License 3
				</Link>
				. The software comes with absolutely no warranty.
			</Text>
		</Box>
	);
}
