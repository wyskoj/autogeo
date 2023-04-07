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
					<Box h={'50vh'}>
						<Center h={'100%'}>
							<VStack align={'start'}>
								<Image
									src={'/logo.svg'}
									alt={'AutoGeo'}
									width={400}
									height={0}
								/>
								<Box pb={2}>
									<Text
										fontSize="4xl"
										fontWeight={'800'}
										color={'brand.700'}
										fontFamily={'Sora'}
									>
										The complete geospatial toolbox.
									</Text>
									<Text
										fontSize="xl"
										fontWeight={'600'}
										fontFamily={'Sora'}
									>
										Perform least-squares adjustments, coordinate geometry, and
										more.
									</Text>
								</Box>
								<Button
									colorScheme={'brand'}
									size={'lg'}
									fontFamily={'Sora'}
									fontWeight={'600'}
									px={6}
									rightIcon={<MdArrowForward fontSize={24} />}
									onClick={direct}
								>
									Get Started
								</Button>
							</VStack>
						</Center>
					</Box>
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
						viewport={{ amount: 0.75, once: true }}
					>
						<Box>
							<SimpleGrid
								columns={[1, 1, 2]}
								spacing={10}
							>
								<Center>
									<Box>
										<Text
											fontSize="4xl"
											fontWeight={'800'}
											fontFamily={'Sora'}
										>
											🔧 The tools you need&mdash;in one place.
										</Text>
										<VStack>
											<Text
												fontSize="xl"
												fontFamily={'Inter'}
											>
												AutoGeo is a web-based software package that provides a
												suite of geospatial and surveying computations.
											</Text>
											<Text
												fontSize="xl"
												fontFamily={'Inter'}
											>
												Powered by the latest web technologies, AutoGeo is
												available on any device with a modern web browser.
											</Text>
										</VStack>
									</Box>
								</Center>
								<Box>
									<Center h={'100%'}>
										<Image
											src={Hero1}
											alt={'AutoGeo'}
											width={600}
											height={315}
											placeholder={'blur'}
										/>
									</Center>
								</Box>
							</SimpleGrid>
						</Box>
					</motion.div>
					<Divider />
					<motion.div
						whileInView={{
							y: [50, 0],
							opacity: [0, 1],
						}}
						initial={{ opacity: 0 }}
						viewport={{ amount: 0.75, once: true }}
					>
						<SimpleGrid
							columns={[1, 1, 2]}
							spacing={10}
						>
							<Box>
								<Center h={'100%'}>
									<Image
										src={Hero4}
										alt={'AutoGeo'}
										width={600}
										height={315}
										placeholder={'blur'}
										style={{
											filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.5))',
										}}
									/>
								</Center>
							</Box>
							<Center>
								<Box>
									<Text
										fontSize="4xl"
										fontWeight={'800'}
										fontFamily={'Sora'}
									>
										📐 Least-squares has never been easier.
									</Text>
									<VStack>
										<Text
											fontSize="xl"
											fontFamily={'Inter'}
										>
											No more confusing spreadsheets or file formats. AutoGeo
											provides a simple, intuitive interface for performing
											least-squares adjustments.
										</Text>
										<Text
											fontSize="xl"
											fontFamily={'Inter'}
										>
											AutoGeo will support adjusting
											diffehttps://wysko.orgrential leveling, horizontal
											control, and 3D geodetic surveys.
										</Text>
									</VStack>
								</Box>
							</Center>
						</SimpleGrid>
					</motion.div>
					<Divider />
					<motion.div
						whileInView={{
							y: [50, 0],
							opacity: [0, 1],
						}}
						initial={{ opacity: 0 }}
						viewport={{ amount: 0.75, once: true }}
					>
						<SimpleGrid
							columns={[1, 1, 2]}
							spacing={10}
						>
							<Center>
								<Box>
									<Text
										fontSize="4xl"
										fontWeight={'800'}
										fontFamily={'Sora'}
									>
										💾 Open-source and free for everyone.
									</Text>
									<VStack>
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
									</VStack>
								</Box>
							</Center>
							<Box>
								<Center h={'100%'}>
									<Image
										src={Hero5}
										alt={'AutoGeo'}
										width={600}
										height={315}
										placeholder={'blur'}
									/>
								</Center>
							</Box>
						</SimpleGrid>
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
						>
							Sign up for free and start using AutoGeo today.
						</Text>
						<Button
							colorScheme={'brand'}
							size={'lg'}
							fontFamily={'Sora'}
							fontWeight={'600'}
							px={6}
							rightIcon={<MdArrowForward fontSize={24} />}
							onClick={direct}
						>
							Get Started
						</Button>
					</VStack>
				</Center>
			</Box>
			<Box
				bgColor={'gray.700'}
				color={'gray.200'}
				textAlign={'center'}
				py={4}
				px={4}
			>
				<Text
					maxW={'32rem'}
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
		</>
	);
}
