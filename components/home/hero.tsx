import { Box, Button, Center, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import { MdArrowForward } from 'react-icons/md';

export default function Hero(props: { direct: () => void }) {
	return (
		<Box h={'40rem'}>
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
							Perform least-squares adjustments, coordinate geometry, and more.
						</Text>
					</Box>
					<GetStartedButton onClick={props.direct} />
				</VStack>
			</Center>
		</Box>
	);
}

export function GetStartedButton(props: { onClick: () => void }) {
	return (
		<Button
			colorScheme={'brand'}
			size={'lg'}
			fontFamily={'Sora'}
			fontWeight={'600'}
			px={6}
			rightIcon={<MdArrowForward fontSize={24} />}
			onClick={props.onClick}
		>
			Get Started
		</Button>
	);
}
