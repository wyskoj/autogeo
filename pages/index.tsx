import {
	Box,
	Button,
	Center,
	Flex,
	LightMode,
	Text,
	VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import { MdArrowForward } from 'react-icons/md';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
	return (
		<LightMode>
			<Box>
				<Center h={'100vh'}>
					<Flex>
						<motion.div
							animate={{
								y: [50, 0],
								opacity: [0, 1],
							}}
							transition={{
								duration: 1,
							}}
						>
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
										color={'brand.800 '}
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
								<Link href={'/dashboard'}>
									<Button
										colorScheme={'brand'}
										size={'lg'}
										fontFamily={'Sora'}
										fontWeight={'600'}
										px={6}
										rightIcon={<MdArrowForward fontSize={24} />}
									>
										Get Started
									</Button>
								</Link>
							</VStack>
						</motion.div>
					</Flex>
				</Center>
			</Box>
		</LightMode>
	);
}
