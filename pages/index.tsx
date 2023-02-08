import {
	Box,
	Button,
	Center,
	Container,
	DarkMode,
	Divider,
	Flex,
	Heading,
	Icon,
	SimpleGrid,
	Text,
	VStack,
} from '@chakra-ui/react';
import { GiGlobe } from 'react-icons/gi';
import Link from 'next/link';
import Image from 'next/image';
import Tilt from 'react-parallax-tilt';
import SurveyTexpert from '../components/surveytexpert';

export default function Home() {
	return (
		<VStack>
			<Box
				py={4}
				bgColor={'gray.900'}
				w={'100%'}
				h={'100vh'}
			>
				<Flex justify={'center'}>
					<Heading
						as={'h4'}
						size={'xl'}
						noOfLines={1}
						py={4}
					>
						Survey
					</Heading>
					<Heading
						as={'h4'}
						size={'xl'}
						noOfLines={1}
						py={4}
						color={'blue.500'}
					>
						T
					</Heading>
					<Heading
						as={'h4'}
						size={'xl'}
						noOfLines={1}
						py={4}
						mr={4}
					>
						expert
					</Heading>
					<GiGlobe size={60} />
				</Flex>
				<Center h={'80vh'}>
					<VStack
						align={'center'}
						spacing={8}
					>
						<Box textAlign={'center'}>
							<Text
								fontSize="6xl"
								fontWeight={'800'}
							>
								The complete geospatial toolbox.
							</Text>
							<Text fontSize="xl">
								Perform least-squares operations, coordinate geometry
								computations, and more.
							</Text>
						</Box>
						<Link href={'/dashboard'}>
							<Button
								colorScheme={'blue'}
								size={'lg'}
								fontSize={'xl'}
							>
								Get Started
							</Button>
						</Link>
						<Tilt
							tiltMaxAngleX={3}
							tiltMaxAngleY={3}
							scale={1.05}
						>
							<Image
								src={'/img_1.png'}
								alt={'Screenshot'}
								width={1200}
								height={500}
								style={{
									borderRadius: '1rem',
								}}
							/>
						</Tilt>
					</VStack>
				</Center>
			</Box>
			{/*<VStack*/}
			{/*	width={'container.xl'}*/}
			{/*	py={4}*/}
			{/*>*/}
			{/*	<SimpleGrid columns={{ sm: 1, md: 2 }}>*/}
			{/*		<VStack align={'start'}>*/}
			{/*			<Heading>The complete geospatial toolbox.</Heading>*/}
			{/*			<Text>*/}
			{/*				<SurveyTexpert /> is a web application that allows you to perform*/}
			{/*				geospatial calculations and operations. It is a free and*/}
			{/*				open-source tool that is available to everyone.*/}
			{/*			</Text>*/}
			{/*		</VStack>*/}
			{/*		<Box></Box>*/}
			{/*	</SimpleGrid>*/}
			{/*</VStack>*/}
		</VStack>
	);
}
