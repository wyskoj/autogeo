import {
	Box,
	Card,
	CardBody,
	CardHeader,
	Center,
	Divider,
	Flex,
	Heading,
	Icon,
	List,
	Spacer,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import {
	OperationCategory,
	OperationCategoryInfo,
} from '../types/operation-category';
import { OperationInfo, operations } from '../types/operation';
import Link from 'next/link';

type OperationCategoryCardProps = {
	/** The category of operations to display. */
	category: OperationCategory;
	/** The category info. */
	info: OperationCategoryInfo;
};

/**
 * A card that displays a category of operations, and a list of operations in that category.
 */
export default function OperationCategoryCard(
	props: OperationCategoryCardProps
) {
	return (
		<Card>
			<CardHeader>
				<Flex>
					<Center>
						<Icon
							as={props.info.icon}
							fontSize={60}
						/>
					</Center>
					<Spacer />
					<Flex
						textAlign={'end'}
						align={'center'}
					>
						<Heading
							as="h4"
							size="md"
							noOfLines={2}
						>
							{props.info.name}
						</Heading>
					</Flex>
				</Flex>
			</CardHeader>
			<Divider />
			<CardBody
				px={0}
				pt={0}
			>
				<List>
					{operations[props.category].map((it, i) => (
						<OperationButton
							key={i}
							category={props.category}
							it={it}
						/>
					))}
				</List>
			</CardBody>
		</Card>
	);
}

function OperationButton(props: {
	it: OperationInfo;
	category: OperationCategory;
}) {
	return (
		<Link href={`/operations/${props.category}/${props.it.id}`}>
			<Box
				as={'button'}
				transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
				_hover={{ bg: useColorModeValue('gray.200', 'gray.600') }}
				width={'100%'}
				textAlign={'start'}
				pl={4}
				py={2}
				lineHeight={2}
			>
				<Flex align={'center'}>
					<Icon
						as={props.it.icon}
						fontSize={24}
						mr={4}
					/>
					<Text>{props.it.name}</Text>
				</Flex>
			</Box>
			<Divider />
		</Link>
	);
}
