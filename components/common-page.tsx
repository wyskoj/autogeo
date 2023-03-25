import {
	Box,
	Container,
	Divider,
	Flex,
	Heading,
	Show,
	Spacer,
	Text,
	VStack,
} from '@chakra-ui/react';
import React from 'react';

export default function CommonPage(props: {
	title: string | JSX.Element;
	description: string | JSX.Element;
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
				<Show above={'md'}>
					<Flex>
						<Box>
							<Heading>{props.title}</Heading>
							{/* use a text block if description is a string */}
							<Text>
								{typeof props.description === 'string' && props.description}
							</Text>
							{/* otherwise just render the element */}
							{typeof props.description !== 'string' && props.description}
						</Box>
						<Spacer />
						<Flex align={'end'}>{props.action}</Flex>
					</Flex>
				</Show>
				<Show below={'md'}>
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
