import {
	Box,
	Button,
	Center,
	Divider,
	Link,
	SimpleGrid,
	Text,
	VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import { MdArrowForward } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useDefaultAuthState } from '../hooks/firebase';
import router from 'next/router';
import Hero1 from '../public/hero-1.webp';
import Hero4 from '../public/hero-4.webp';
import Hero5 from '../public/hero-5.webp';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import Hero, { GetStartedButton } from '../components/home/hero';
import FeatureSection from '../components/home/feature-section';
import Footer from '../components/home/footer';

export default function Home() {
	const { user, loading } = useDefaultAuthState();

	function direct() {
		if (user) {
			router.push('/dashboard');
		} else {
			router.push('/login');
		}
	}

	return (
		<>
			<Box
				px={8}
				mb={16}
			>
				<motion.div
					animate={{
						y: [50, 0],
						opacity: [0, 1],
					}}
					initial={{ opacity: 0 }}
				>
					<Hero direct={direct} />
				</motion.div>
				<VStack
					maxW={'100rem'}
					mx={'auto'}
					spacing={16}
				>
					<Divider />
					<motion.div
						whileInView={{
							y: [50, 0],
							opacity: [0, 1],
						}}
						initial={{ opacity: 0 }}
						viewport={{ amount: 0.5, once: true }}
					>
						<FeatureSection
							emoji={'🛠️'}
							title={'The tools you need—in one place.'}
							description={
								'AutoGeo is a web-based software package that provides a suite of geospatial and surveying computations.' +
								'\nPowered by the latest web technologies, AutoGeo is available on any device with a modern web browser.'
							}
							image={Hero1}
							direction={'left'}
						/>
					</motion.div>
					<Divider />
					<motion.div
						whileInView={{
							y: [50, 0],
							opacity: [0, 1],
						}}
						initial={{ opacity: 0 }}
						viewport={{ amount: 0.5, once: true }}
					>
						<FeatureSection
							emoji={'📐'}
							title={'Least-squares has never been easier.'}
							description={
								'No more confusing spreadsheets or file formats. AutoGeo provides a simple, intuitive interface for performing least-squares adjustments.' +
								'\nAutoGeo will support adjusting differential leveling, horizontal control, and 3D geodetic surveys.'
							}
							image={Hero4}
							direction={'right'}
						/>
					</motion.div>
					<Divider />
					<motion.div
						whileInView={{
							y: [50, 0],
							opacity: [0, 1],
						}}
						initial={{ opacity: 0 }}
						viewport={{ amount: 0.5, once: true }}
					>
						<FeatureSection
							emoji={'💾'}
							title={'Open-source and free for everyone.'}
							description={
								<>
									<Text
										fontSize="xl"
										fontFamily={'Inter'}
									>
										AutoGeo is open-source and free to use. We believe that
										geospatial software should be accessible to everyone.
									</Text>
									<Text
										fontSize="xl"
										fontFamily={'Inter'}
									>
										Use AutoGeo for any purpose, including commercial use. You
										can read the source code on{' '}
										<Link
											href={'https://github.com/wyskoj/autogeo'}
											isExternal={true}
											color="teal.500"
										>
											GitHub <ExternalLinkIcon mx="2px" />
										</Link>
										.
									</Text>
								</>
							}
							image={Hero5}
							direction={'left'}
						/>
					</motion.div>
					<Divider />
				</VStack>
				<Center mt={8}>
					<VStack spacing={4}>
						<Text
							fontSize="4xl"
							fontWeight={'800'}
							fontFamily={'Sora'}
						>
							Ready to get started?
						</Text>
						<Text
							fontSize="xl"
							fontFamily={'Inter'}
							textAlign={'center'}
						>
							Sign up for free and start using AutoGeo today.
						</Text>
						<GetStartedButton onClick={direct} />
					</VStack>
				</Center>
			</Box>
			<Footer />
		</>
	);
}
