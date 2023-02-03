import {
	Box,
	Container,
	Divider,
	Flex,
	Heading,
	Spacer,
	Text,
	VStack,
} from '@chakra-ui/react';
import React from 'react';

export default function CommonPage(props: {
	title: string;
	description: string;
	action?: JSX.Element;
	children?: JSX.Element;
}) {
	return (
		<Container
			maxWidth={'container.lg'}
			mt={4}
			mb={16}
		>
			<VStack
				align={'st'}
				spacing={4}
			>
				<Flex>
					<Box>
						<Heading noOfLines={1}>{props.title}</Heading>
						<Text>{props.description}</Text>
					</Box>
					<Spacer />
					<Flex align={'end'}>{props.action}</Flex>
				</Flex>
				<Divider />
				<Box>{props.children}</Box>
			</VStack>
		</Container>
	);
}
