import {
	Box,
	Divider,
	Flex,
	Heading,
	Spacer,
	Text,
	VStack,
} from '@chakra-ui/react';

export default function CommonPage(props: {
	title: string;
	description: string;
	action?: JSX.Element;
	children?: JSX.Element;
}) {
	return (
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
	);
}
