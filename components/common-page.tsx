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

type CommonPageProps = {
	/** The title of the page */
	title: string | JSX.Element;
	/** The description of the page. Can be a string or a JSX element */
	description: string | JSX.Element;
	/** The action to be displayed on the right side of the page */
	action?: JSX.Element;
	/** The content of the page */
	children?: JSX.Element;
	/** The width of the container. Defaults to 'container.lg' */
	containerWidth?: string;
};

/**
 * A common page layout for all pages. This is a wrapper component that
 * provides a consistent layout for all pages.
 */
export default function CommonPage(props: CommonPageProps) {
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
