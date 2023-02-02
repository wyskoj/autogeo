import { Button, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { GiGlobe } from 'react-icons/gi';

export default function Home() {
	return (
		<div
			style={{ width: '100%', height: '100vh', backgroundColor: 'red' }}
			className={'cool-background'}
		>
			<Flex
				align={'center'}
				justify={'center'}
				height={'80%'}
			>
				<VStack align={'start'}>
					<Flex align={'center'}>
						<Heading
							as="h1"
							size="4xl"
							noOfLines={1}
							py={4}
						>
							Survey
						</Heading>
						<Heading
							as="h1"
							size="4xl"
							noOfLines={1}
							py={4}
							color={'blue.500'}
						>
							T
						</Heading>
						<Heading
							as="h1"
							size="4xl"
							noOfLines={1}
							py={4}
							mr={4}
						>
							expert
						</Heading>
						<GiGlobe size={60} />
					</Flex>
					<Heading
						as="h1"
						size="2xl"
						fontWeight={'800'}
						noOfLines={1}
						py={2}
					>
						The complete geospatial toolbox.
					</Heading>
					<Text fontSize="xl">
						Perform least-squares operations, coordinate geometry computations,
						and more.
					</Text>
					<Link
						href={'/dashboard'}
						passHref
					>
						<Button>Get started</Button>
					</Link>
				</VStack>
			</Flex>
		</div>
	);
}
