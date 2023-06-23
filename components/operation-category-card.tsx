import {
	Badge,
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
import Link from 'next/link';
import {
	NewOperations,
	Operation,
	OperationCategory,
	OperationCategoryInfo,
	OperationIcon,
	OperationName,
} from '../operation/operation';

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
							ml={2}
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
					{props.info.operations.map((operation, i) => (
						<OperationButton
							key={i}
							category={props.category}
							operation={operation}
						/>
					))}
				</List>
			</CardBody>
		</Card>
	);
}

function OperationButton(props: {
	operation: Operation;
	category: OperationCategory;
}) {
	return (
		<Link href={`/operations/${props.category}/${props.operation}`}>
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
						as={OperationIcon[props.operation]}
						fontSize={24}
					/>
					<Text ml={4}>
						{OperationName[props.operation]}{' '}
						{NewOperations.indexOf(props.operation) !== -1 && (
							<Badge
								ml={1}
								colorScheme={'teal'}
							>
								NEW
							</Badge>
						)}
					</Text>
				</Flex>
			</Box>

			<Divider />
		</Link>
	);
}
