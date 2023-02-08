import {
	Box,
	Container,
	Divider,
	Flex,
	Heading,
	Hide,
	Show,
	Spacer,
	Text,
	VStack,
} from '@chakra-ui/react';
import React from 'react';

export default function CommonPage(props: {
	title: string | JSX.Element;
	description: string;
	action?: JSX.Element;
	children?: JSX.Element;
	containerWidth?: string;
}) {
	return (
		<Container
			maxWidth={props.containerWidth ?? 'container.lg'}
			mt={4}
			mb={16}
		>
			<VStack
				align={'st'}
				spacing={4}
			>
				<Show above={'sm'}>
					<Flex>
						<Box>
							<Heading>{props.title}</Heading>
							<Text>{props.description}</Text>
						</Box>
						<Spacer />
						<Flex align={'end'}>{props.action}</Flex>
					</Flex>
				</Show>
				<Show below={'sm'}>
					<Box>
						<Heading>{props.title}</Heading>
						<Text>{props.description}</Text>
					</Box>
					{props.action}
				</Show>
				<Divider />
				<Box>{props.children}</Box>
			</VStack>
		</Container>
	);
}
