import Image, { StaticImageData } from 'next/image';
import { Box, Center, SimpleGrid, Text, VStack } from '@chakra-ui/react';

type FeatureSectionProps = {
	emoji: string;
	title: string;
	description: string | JSX.Element | JSX.Element[];
	image: StaticImageData;
	direction: 'left' | 'right';
};

export default function FeatureSection(props: FeatureSectionProps) {
	return (
		<Box>
			<SimpleGrid
				columns={[1, 1, 2]}
				spacing={10}
			>
				{props.direction === 'left' ? (
					<>
						<SectionContent
							emoji={props.emoji}
							title={props.title}
							description={props.description}
						/>
						<SectionImage image={props.image} />
					</>
				) : (
					<>
						<SectionImage image={props.image} />
						<SectionContent
							emoji={props.emoji}
							title={props.title}
							description={props.description}
						/>
					</>
				)}
			</SimpleGrid>
		</Box>
	);
}

function SectionContent(props: {
	emoji: string;
	title: string;
	description: string | JSX.Element | JSX.Element[];
}) {
	return (
		<Center>
			<Box>
				<Text
					fontSize="4xl"
					fontWeight={'800'}
					fontFamily={'Sora'}
				>
					{props.emoji} {props.title}
				</Text>
				<VStack>
					{typeof props.description === 'string'
						? props.description.split('\n').map((value, index) => (
								<Text
									fontSize="xl"
									fontFamily={'Inter'}
									key={index}
								>
									{value}
								</Text>
						  ))
						: props.description}
				</VStack>
			</Box>
		</Center>
	);
}

function SectionImage(props: { image: StaticImageData }) {
	return (
		<Box>
			<Center h={'100%'}>
				<Image
					src={props.image}
					alt={'AutoGeo'}
					width={600}
					height={315}
					placeholder={'blur'}
				/>
			</Center>
		</Box>
	);
}
